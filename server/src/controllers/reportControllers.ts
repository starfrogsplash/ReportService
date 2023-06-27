import db from '../../knexConfig'
import { NotFoundError } from '../types'

interface Metric {
  metricId: string;
  description: string;
  type: string;
  value: string;
}

interface Report {
  title: string,
  description: string,
  created: Date,
  updated: Date,
  data: Metric[],
  userId: string
}


const createReport = async (report: Report): Promise<{ uuid: string, report: Report }> => {
  const { title, description, created, updated, data: metrics, userId } = report

  try {
    const { report: newReport, metricRes } = await db.transaction(async trx => {
      // Insert the report record
      const [report] = await trx('Report')
        .insert({
          title,
          description,
          created,
          updated,
          userId
        })
        .returning('*')

      // Insert the metrics and reportMetric records
      const metricRows = metrics.map((metric) => ({
        metricId: metric.metricId,
        description: metric.description,
        type: metric.type,
        value: metric.value,
      }));

      const metricRes = await trx
        .batchInsert<Record<string, any>>('Metric', metricRows, 100)
        .returning('*');

      const reportMetricRows = metricRes.map(({ id: metricId }) => ({
        reportId: report.uuid,
        metricId,
      }));

      await trx.batchInsert('ReportMetric', reportMetricRows, 100);

      return { report, metricRes }
    })

    const { uuid, ...reportData } = newReport;

    return {
      uuid,
      report: { ...reportData, data: metricRes },
    }
  } catch (err) {
    console.error('err', err)
    throw new Error('Failed to create report')
  }
}

const getReport = async (uuid: string) => {
  try {
    const report = await db('Report').where({ uuid }).first()

    if (!report) throw new NotFoundError('The specified resource was not found', 404)
    const { title, description, created, updated, userId } = report

    const reportMetricIds = await db('ReportMetric').where({ reportId: uuid }).pluck('metricId')
    const metrics = await db('Metric').whereIn('id', reportMetricIds);

    return {
      uuid,
      report: {
        createdBy: userId,
        title,
        description,
        created,
        updated,
        data: metrics
      }
    }

  } catch (err) {
    console.error('err', err)
    throw err instanceof NotFoundError ? err : new Error('Failed to get report')
  }
}

const getAllReportsByUser = async (userId: string) => {
  try {
    const reports = await db('Report').where({ userId })

    const reportMetricMap = await db('ReportMetric')
      .select('reportId', 'Metric.id', 'Metric.metricId', 'description', 'type', 'value')
      .join('Metric', 'ReportMetric.metricId', '=', 'Metric.id')
      .whereIn('reportId', reports.map(r => r.uuid))
      .groupBy('reportId', 'Metric.id', 'Metric.metricId', 'description', 'type', 'value')

    const reportData = reports.map(report => {
      const metrics = reportMetricMap
        .filter(m => m.reportId === report.uuid)
        .map(m => ({ metricId: m.metricId, description: m.description, type: m.type, value: m.value }))
      return { uuid: report.uuid, title: report.title, description: report.description, created: report.created, updated: report.updated, data: metrics }
    })

    return reportData
  } catch (err) {
    console.error('err', err)
    throw err instanceof NotFoundError ? err : new Error('Failed to get report')
  }
}

export {
  createReport,
  getReport,
  getAllReportsByUser
}