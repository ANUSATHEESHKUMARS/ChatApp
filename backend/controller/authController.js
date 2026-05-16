import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        console.log('this is for checking', username, email, password)
        const useralredy = await User.findOne({ email })

        if (useralredy) {
            return res.status(400).json({
                message: "User alredy exists"
            })
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashpassword
        })

        res.status(201).json(user)
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({
                message: "password not matched"
            })
        }
        const token = jwt.sign({
            id: user._id
        },
            process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie("jwt", token, { httpOnly: true, secure: false, sameSite: "lax" })

        res.status(200).json({
            succes: true,
            token,
            user

        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "server side error"
        })
    }
}


export const userProfile = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.findById(id).select('-password')
        if (!user) {
            return res.status(400).json({
                message: "userid not exists"
            })
        }

        return res.status(200).json({
            message: "wellcome to profile",
            user

        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "server side error"
        })
    }
}


export const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(400).json({
                message: "no user exists"
            })
        }
        return res.status(200).json({
            message: "user are",
            users
        })
    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
}

export const logoutUser = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
}