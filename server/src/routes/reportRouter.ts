require('dotenv').config()
import express, { Request, Response } from 'express'
import { ZodError } from 'zod';
import { createReport, getReport, getAllReportsByUser } from '../controllers/reportControllers';
import { authenticateToken } from '../middleware/authentication'
import { NotFoundError } from '../types'
import { validateCreateReport, validateGetReportUUID } from '../utils/schemaValidation'

const JWT_SECRET: string | undefined = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined')
}

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

const reportRouter = express.Router()

reportRouter.post('/report', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, created, updated, data } = validateCreateReport(req.body);
    const { user } = req;

    if (!user) {
      return res.status(401).json({
        code: 401,
        message: 'The client must authenticate itself to get the requested response',
      });
    }

    const report = await createReport({
      title,
      description,
      created,
      updated,
      data,
      userId: user.userId,
    });

    return res.status(201).json(report);
  } catch (err) {
    if (err instanceof Error && err.message.includes('Missing field')) {
      return res.status(400).json({code: 400, message: err.message });
    }
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
});

reportRouter.get('/report/:uuid', authenticateToken, async (req: Request, res: Response) => {
  try {
    const uuid = validateGetReportUUID(req.params.uuid);
    const report = await getReport(uuid)
    res.status(200).json(report)
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({code: 404, message: err.message })
    }  else if (err instanceof ZodError) {
      const message = err.errors[0].message;
      res.status(400).json({code: 400, message });
    } else {
      console.error('err', err)
      res.status(500).json({code: 500, message: 'Internal server error' })
    }
  }
})

reportRouter.get('/reports/user', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: 'The client must authenticate itself to get the requested response',
      });
    }

    // Fetch all reports submitted by the authenticated user
    const reports = await getAllReportsByUser(user.userId);

    res.status(200).json(reports);
  } catch (err) {
    console.error('err', err);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
});

export {
  reportRouter
}