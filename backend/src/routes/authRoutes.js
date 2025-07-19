import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', (req, res) => {
    // destructing the body into two variables {username and password}
    const {username, password} = req.body

    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    // saving the new user
    try {
        
    } catch (error) {
        console.log(log)
        res.sendStatus(503)
    }
})

router.post('/login', (req, res) => {
    // destructing the body into two variables {username and password}
    const {username, password} = req.body
    
    // verifing database here
    try {
        
    } catch (error) {
        console.log(log)
        res.sendStatus(503)
    }
})

export default router
