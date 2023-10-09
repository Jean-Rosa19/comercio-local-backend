const {Router} = require('express')

const routes = Router()

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')
const ProductController = require('../controllers/ProductController')

routes.post('/user', UserController.create)

routes.post('/session', SessionController.create)

routes.get('/user', UserController.getUser)

routes.delete('/user/:user_id', UserController.delete)

//////  Products
routes.post('/:user_id/products',ProductController.create)
routes.delete('/products/:product_id', ProductController.delete)
routes.get('/products', ProductController.indexAll)
routes.get('/products/:user_id', ProductController.indexByUser)


module.exports = routes 