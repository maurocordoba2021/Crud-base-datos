const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

//Rutas  de listado y detalle de actores

router.get('/', actorsController.list);

router.get('/detail/:id', actorsController.detail)



//Rutas exigidas para la creación del CRUD
router.get('/add', actorsController.add);
router.post('/create', actorsController.create);

router.get('/edit/:id', actorsController.edit);
router.put('/update/:id', actorsController.update);

router.get('/delete/:id', actorsController.delete);
router.delete('/delete/:id', actorsController.destroy);

module.exports = router;