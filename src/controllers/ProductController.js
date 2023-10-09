
const Product = require('../models/Product')
const User = require('../models/User')


module.exports = {
    async create(req, res) {
        const { name, price } = req.body
        const { user_id } = req.params

        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({message: 'Unauthorized'})

        const randomNumberOrder = Math.floor((Math.random() * 1000) + 1)

        try {
            const userInfo = await User.findById(user_id)
            const { location } = userInfo

            const latitude = location.coordinates[0]
            const longitude = location.coordinates[1]


            const setLocation = {
                type: 'Point',
                coordinates: [latitude, longitude]
                
            }


            const createdProduct = await Product.create({
                name,
                price,
                user: user_id,
                location: setLocation,
                order: randomNumberOrder
            })

            await createdProduct.populate('user')


            return res.status(201).send(createdProduct)
        } catch (error) {

        }
    },

    async delete(req, res) {

        const { product_id, user_id } = req.params  
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({message: 'Unauthorized'})

        try {

            const deletedProduct = await Product.findByIdAndDelete(product_id)

            return res.status(200).send({ status: "deleted", user: deletedProduct })
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    async indexByUser(req, res) {
        const { user_id } = req.params

        try {
            const allProductsOfAUser = await Product.find({
                user: user_id
            }).populate('user')

            return res.status(200).send(allProductsOfAUser)

        } catch (error) {
            return res.status(400).send(error)
        }

    },

    async indexAll(req, res) {
        const { latitude, longitude } = req.query
        const maxDistance = 20000

        try {
            const allProducts = await Product.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [latitude, longitude]
                        },
                        $maxDistance: maxDistance
                    }
                }

            }).populate('user').limit(20).sort('order')

            return res.status(200).send(allProducts)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}