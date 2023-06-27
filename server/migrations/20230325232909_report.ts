import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(
        `
        -- Create User Table
        CREATE TABLE IF NOT EXISTS "User" (
            "id" SERIAL PRIMARY KEY,
            "username" TEXT NOT NULL,
            "email" TEXT UNIQUE NOT NULL,
            "password" TEXT NOT NULL
        );
        
        -- Create Metric Table
        CREATE TABLE IF NOT EXISTS "Metric" (
            "id" SERIAL PRIMARY KEY,
            "metricId" TEXT NOT NULL,
            "description" TEXT NOT NULL,
            "type" TEXT NOT NULL,
            "value" TEXT NOT NULL
        );
                
        -- Create Report Table
        CREATE TABLE IF NOT EXISTS "Report" (
            "uuid" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            "title"  TEXT NOT NULL,
            "description" TEXT NOT NULL,
            "created" TIMESTAMP WITH TIME ZONE NOT NULL,
            "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
            "userId" INTEGER REFERENCES "User" ("id") NOT NULL
        );
        
        -- Create ReportMetric Table
        CREATE TABLE IF NOT EXISTS "ReportMetric" (
            "id" SERIAL PRIMARY KEY,
            "reportId" UUID REFERENCES "Report" ("uuid") NOT NULL,
            "metricId" INTEGER REFERENCES "Metric" ("id") NOT NULL
        );

        -- Add Indexes
        CREATE INDEX user_email_idx ON "User" ("email");
        CREATE INDEX metric_metricId_idx ON "Metric" ("id");
        CREATE INDEX report_userId_idx ON "Report" ("userId");
        CREATE INDEX report_uuid_idx ON "Report" ("uuid");
        `
    )
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('User').dropTable('Metric').dropTable('Report').dropTable('ReportMetric')
}