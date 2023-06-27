require('dotenv').config()
import express, { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findExistingUser, addNewUser } from '../controllers/userControllers';
import { validateUserSignUp, validateLogIn } from '../utils/schemaValidation'

const JWT_SECRET: string | undefined = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined')
}

const userRouter = express.Router()

userRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = validateUserSignUp(req.body)
        //Check if user exists with given email address
        const existingUser = await findExistingUser(email)

        if (existingUser) {
            return res.status(409).json({ code: 409, message: 'User with that email already exists' })
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Create new user
        const newUser = { username, email, password: hashedPassword }
        const userId = await addNewUser(newUser)

        // Generate JWT token
        const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret)

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 3600 // 1 hr
        })

        res.status(201).json({ message: 'User created successfully' })

    } catch (err) {
        if (err instanceof Error && err.message.includes('Missing field')) {
            return res.status(400).json({code: 400, message: err.message });
          }
        res.status(500).json({ code: 500, message: 'Internal server error' })
    }
})

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = validateLogIn(req.body)

        //Check if user exists with given email address
        const existingUser = await findExistingUser(email)

        if (!existingUser) {
            return res.status(401).json({ code: 401, message: 'Invalid email or password' })
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, existingUser.password)

        if (!passwordMatch) {
            return res.status(401).json({ code: 401,  message: 'Invalid password' })
        }

        // Generate JWT token
        const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET as Secret)

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 3600 // 1 hr
        })
    
        res.status(200).json({ message: 'User logged in successfully', token: token })
    } catch (err) {
        if (err instanceof Error && err.message.includes('Missing field')) {
            return res.status(400).json({code: 400, message: err.message });
          }
        res.status(500).json({ code: 401,  message: 'Internal server error' });
    }
})

// Logout route
userRouter.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token'); // clear the token cookie
    res.status(200).json({ message: 'User logged out successfully' });
  });


export {
    userRouter
}