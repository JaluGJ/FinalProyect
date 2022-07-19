const User = require('../models/user/userSchema')
const Product = require('../models/product/productSchema')
const getTokenData = require('../config/jwt.config.js').getTokenData


module.exports = {

  newFavourite: async (req, res, next) => {

    try {
      const autorization = req.get('Authorization')
      const { productsId } = req.body
      if (!autorization) {
        return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
      }
      if (autorization.split(' ')[0].toLowerCase() !== 'bearer') {
        return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
      }
      const token = autorization.split(' ')[1]
      const data = getTokenData(token)
      if (!data) {
        return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
      }

      const user = await User.findById(data.id)
      if (!user) {
        return res.status(401).json({ msg: 'No tienes permiso para hacer esto' })
      }

      if (!productsId.length || !productsId) {
        return res.json({ msg: "Machado, hace bien las cosas. pone algo que quieras guardar" })
      }
      if (!user.favourites) {
        user.favourites = [...productsId]
        await user.save()
        return res.json({ msg: 'se ha guardado con exito' })
      }

      const favoritos = user.favourites
      user.favourites = [...favoritos, productsId]
      await user.save()

      return res.json({ msg: 'se ha guardado con exito' })
    } catch (error) {
      return next(error)
    }
  },


  deleteFavoutite: async (req, res, next) => {
    try {
    const autorization = req.get('Authorization')
    const { productsId } = req.body
    if (!autorization) {
      return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
    }
    if (autorization.split(' ')[0].toLowerCase() !== 'bearer') {
      return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
    }
    const token = autorization.split(' ')[1]
    const data = getTokenData(token)
    if (!data) {
      return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
    }

    const user = await User.findById(data.id)
    if (!user) {
      return res.status(401).json({ msg: 'No tienes permiso para hacer esto' })
    }
    if (!productsId.length || !productsId) {
      return res.json({ msg: "Machado, hace bien las cosas. pone algo que quieras eliminar" })
    }
    const favoritos = user.favourites
    user.favourites = favoritos.filter(p => p.id !== productsId )
    await user.save()
      
    } catch (error) {
      next(error)
    }
    return res.json({ msg: "producto eliminado con exito" })
  },


  getFavourites: async (req, res, next) => {
    try {
      const autorization = req.get('Authorization')
      if (!autorization) {
        return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
      }
      if (autorization.split(' ')[0].toLowerCase() !== 'bearer') {
        return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
      }
      const token = autorization.split(' ')[1]
      const data = getTokenData(token)
      if (!data) {
        return res.status(401).json({ msg: 'No tienes permisos para hacer esto' })
      }
      const user = await User.findById(data.id).populate("favourites", {
        model: 1,
        brand: 1,
        price: 1,
        type: 1,
        category: 1,
        image: 1,
        description: 1,
        _id: 1
    })
      if (!user) {
        return res.status(401).json({ msg: 'No tienes permiso para hacer esto' })
      }
      return res.json(user.favourites)

    } catch (error) {
      return next(error)
    }
  }
}