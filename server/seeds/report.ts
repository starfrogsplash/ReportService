import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("ReportMetric").del();
    await knex("Report").del();
    await knex("User").del();
    await knex("Metric").del();


    // Inserts seed entries
    // Seed User Table
    const users = [
       { username: "John Doe", email: "john.doe@example.com", password: "password123" },
       { username: "Dr No", email: "dr.no@example.com", password: "password456" },
     ];
     const [john, drNo] = await knex("User").insert(users).returning("id");
   
     // Seed Metric Table
     const metrics = [
       {
         metricId: "e1.2.3",
         description: "Metric 1 Description",
         type: "Metric 1 Type",
         value: "1234.567",
       },
       {
         metricId: "f4.5.6",
         description: "Metric 2 Description",
         type: "Metric 2 Type",
         value: "5678.901",
       },
     ];
     const [metric1Id, metric2Id] = await knex("Metric")
       .insert(metrics)
       .returning("id");

     // Seed Report Table
     const reports = [
       {
         uuid: "3ba3e81d-8a04-4edf-aeb3-5b5d9be5f729",
         title: "Report 1",
         description: "This is the description of Report 1",
         created: knex.fn.now(),
         updated: knex.fn.now(),
         userId: john.id,
       },
       {
         uuid: "86f3001e-d62d-4382-b7eb-0f173c201cf5",
         title: "Report 2",
         description: "This is the description of Report 2",
         created: knex.fn.now(),
         updated: knex.fn.now(),
         userId: drNo.id,
       },
     ];
     const [report1Id, report2Id] = await knex("Report")
       .insert(reports)
       .returning("uuid");
   
     // Seed ReportMetric Table
     const reportMetrics = [
       { reportId: report1Id.uuid, metricId: metric1Id.id },
       { reportId: report1Id.uuid, metricId: metric2Id.id },
       { reportId: report2Id.uuid, metricId: metric2Id.id },
       { reportId: report2Id.uuid, metricId: metric1Id.id },
     ];
     await knex("ReportMetric").insert(reportMetrics);
};
