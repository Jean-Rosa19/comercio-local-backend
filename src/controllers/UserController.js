const User = require('../models/User')
const bcrypt = require('bcrypt')

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword

    } catch (error) {
        return error
    }
}



module.exports = {
    async create(req, res) {
        const { name, whatsapp, email, password, latitude, longitude } = req.body

        const location = {
            type: 'Point',
            coordinates: [latitude, longitude]
        }

        console.log(location)

        try {

            const userAlredyExists = await User.findOne({ email })
            if (userAlredyExists) return res.status(400).send({ message: 'User Alredy exist' })

            const hashedPassword = await hashPassword(password)

            ///////

            const createdUser = await User.create({
                name,
                whatsapp,
                email,
                password: hashedPassword,
                location,

            })

            return res.status(201).send(createdUser)

        } catch (error) {
            res.status(400).send(error)
        }
    },

    async delete(req, res) {
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({message: 'Unauthorized'})

        try {
            const deletedUser = await User.findByIdAndDelete({ _id: user_id })
            return res.status(200).send({ status: 'deleted', user: deletedUser })

        } catch (error) {
            return res.status(400).send(error)
        }
    },

    async getUser(req, res) {
        try {
            const usuarios = await User.find();
            res.status(200).send({ status: 'ok', users: usuarios })
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
        }
    }
}
