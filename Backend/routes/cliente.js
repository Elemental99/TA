const { Router } = require('express');

const { crearCliente, loginCliente } = require('../controllers').Cliente;

const router = Router();

router.get('/', loginCliente);
router.post('/', crearCliente);

module.exports = router;
