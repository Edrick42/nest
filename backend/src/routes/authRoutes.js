import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', async (req, res) => {
    // destructing the body into two variables {username and password}
    const {username, password} = req.body

    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    // saving the new user
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        res.status(201).json(newUser)
    } catch (error) {
        console.log(log)
        res.sendStatus(503)
    }
})

router.post('/login', async (req, res) => {
    // destructing the body into two variables {username and password}
    const {username, password} = req.body
    
    // verifing database here
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        // if user not found
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        // check password
        const isPasswordValid = bcrypt.compareSync(password, user.password)

        // if password is invalid
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid password'})
        }

        // create a token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.status(200).json({token})
    } catch (error) {
        console.log(log)
        res.sendStatus(503)
    }
})

export default router
