const express = require('express');
const router = express.Router();
const controller = require('../controllers/vehicles');

router.get('/', controller.getAllVehicles);
router.post('/', controller.createVehicle);
router.put('/:id', controller.updateVehicle);
router.delete('/:id', controller.deleteVehicle);

module.exports = router;
