// require('dotenv').config()
// const { JWT_SECRET } = process.env
// const jwt = require('jsonwebtoken')
const { getTemplate, sendEmail } = require('../config/mail.config.js')
const getToken = require('../config/jwt.config.js').getToken
const getTokenData = require('../config/jwt.config.js').getTokenData
const User = require('../models/user/userSchema.js')



module.exports = {
    
    registerUser : async (req, res, next) => {
        let { email, password, firstName, lastName, isAdmin } = req.body
        try {
            const user = await User.findOne({ email })
            if (user) {
                return res.status(404).json({ message: 'El e-mail ya ha sido tomado' })
            }
            isAdmin === undefined ?
            isAdmin = false :
            isAdmin = true
            const newUser = {
                email,
                password,
                firstName,
                lastName,
                isAdmin
            }
            const userCreated = await User.create(newUser)
            if(userCreated.isAdmin === true) {
                userCreated.isVerified = true
                await userCreated.save()
                return res.status(200).json({ userCreated })
            }
            const token = getToken(userCreated._id)
            const template = getTemplate(userCreated.firstName, token)
            await sendEmail(userCreated.email, 'Confirmar cuenta', template)
            return res.status(200).json({ userCreated, token })
        } catch (error) {
            next(error)
        }
    },


    confirmUser : async (req, res, next) => {
        const { token } = req.params
        try {
            const data = await getTokenData(token)
            const user = await User.findById(data.id)
            if (!user) {
                return res.status(404).json({ message: 'El usuario no existe' })
            }
            if(data === null){
                return res.status(404).json({ message: 'El token no existe' })
            }
            if(user.isConfirmed){
                return res.status(404).json({ message: 'El usuario ya ha sido confirmado' })
            }
            user.isConfirmed = true
            await user.save()
            return res.status(200).json({ message: 'El usuario ha sido confirmado' })
        } catch (error) {
            next(error)
        }
    },

    loginUser : async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            let validate = user === null ?
            false 
            : await user.isValidPassword(password)
            if(!(validate && user)){
                return res.status(401).json({ message: 'La contraseña o el e-mail son incorrectos' })
            }
            if(!user.isConfirmed){
                return res.status(401).json({ message: 'El usuario no ha confirmado su cuenta' })
            }
            const token = getToken(user._id)
            return res.json({ token })
        } catch (error) {
            next(error)
        }
    },

    loginAdmin : async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            let validate = user === null ?
            false
            : await user.isValidPassword(password)
            if(!(validate && user)){    
                return res.status(401).json({ message: 'La contraseña o el e-mail son incorrectos' })
            }
            if(!user.isAdmin){
                return res.status(401).json({ message: 'No tienes permisos para hacer esto' })
            }
            const token = getToken(user._id)
            return res.json({ token })
        } catch (error) {
            next(error)
        }
    },

    getAllUsers : (req, res, next) => {
        User.find({}).populate('bought', {
            items: 1,
            quantity: 1,
            date: 1 
        })
            .then((users) => {
                return res.json(users)
            }
            ).catch((error) => {
                next(error)
            }
        )
    }
}