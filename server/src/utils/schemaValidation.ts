import * as z from 'zod'

// Create a schema for the request body of the createReport endpoint
const createReportSchema = z.object({
  title: z.string(),
  description: z.string(),
  created: z.string().transform((val) => new Date(val)),
  updated: z.string().transform((val) => new Date(val)),
  data: z.array(
    z.object({
      metricId: z.string(),
      description: z.string(),
      type: z.string(),
      value: z.string(),
    })
  ),
})

// Create a user sign up schema
const userSignupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

// Create a user log in  schema
const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
})


// Create a schema for the report UUID parameter
const uuidSchema = z.string().uuid();

const validateSchema = <T>(data: unknown, schema: z.ZodType<T>) => {
  try {
    return schema.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) {
      const message = err.errors.map((e) => `Missing field: ${e.path.join('.')}`).join('\n')
      throw new Error(message)
    }
    throw err
  }
}

const validateUserSignUp = (data: unknown) => validateSchema(data, userSignupSchema)
const validateLogIn = (data: unknown) => validateSchema(data, userLoginSchema)

const validateCreateReport = (data: unknown) => {
    try {
      return createReportSchema.parse(data)
    } catch (err) {
      if (err instanceof z.ZodError) {
        const message = err.errors.map((e) => `Missing field: ${e.path.join('.')}`).join('\n')
        throw new Error(message)
      }
      throw err
    }
  }

  // Validate the UUID parameter of the getReport endpoint
  const validateGetReportUUID = (uuid: unknown): string => uuidSchema.parse(uuid)

export {
    validateCreateReport,
    validateGetReportUUID,
    validateUserSignUp,
    validateLogIn
}