const { Router } = require('express')
//importar los componentes donde tienen todas las rutas
const { getAllProducts, getProductById, updateProduct, uploadProduct, deleteProduct } = require('../controllers/products')
const { getAllUsers, registerUser, loginUser, loginAdmin, confirmUser, profile, updateProfile } = require('../controllers/user')
const postPromo = require('../controllers/promos')
const { paymentCard } = require('../controllers/payment')
const { statusPayment } = require('../controllers/statusPayments')
const { soldProducts } = require('../controllers/soldInfo')
const { newFavourite, getFavourites, deleteFavoutite } = require('../controllers/favourites')

const routes = Router()

//hacer todas las rutas a esos componentes con el router.use('/algo', algo)

// PRODUCTS ROUTES
routes.post('/products', uploadProduct)

routes.get('/products', getAllProducts)

routes.get('/products/:id', getProductById)

routes.delete('/products/:id', deleteProduct)

routes.put('/products/:id', updateProduct)
// PRODUCTS ROUTES

// USER ROUTES

    //login & signup

routes.post('/login', loginUser)

routes.post('/signup', registerUser)

routes.post('/loginAdmin', loginAdmin)

routes.get('/user/confirm/:token', confirmUser)

    //user info

routes.get('/profile', profile)

routes.put('/profile', updateProfile)

routes.get('/users', getAllUsers)

     //favs

routes.post('/profile/favs', newFavourite)

routes.get('/profile/favs', getFavourites)

routes.delete('/profile/favs', deleteFavoutite)


// USER ROUTES

// PASSPORT ROUTES

routes.get('/google', (req,res)=> res.send(req.user));

// PASSPORT ROUTES

// PAYMENT ROUTES

routes.post('/create-payment-intents', paymentCard )

routes.post('/status-payment', statusPayment )

// PAYMENT ROUTES

// SOLD ROUTES

routes.get('/sold', soldProducts )

// SOLD ROUTES

// PROMOS ROUTES

routes.post('/create-promo', postPromo )

// PROMOS ROUTES

module.exports = routes