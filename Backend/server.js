const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

class servidor {
	constructor() {
		this.app = express.Router();
		this.router = express.Router();

		this.port = process.env.PORT;
		this.paths = {
			bar: '/api/bar',
			cliente: '/api/cliente',
			menu: '/api/menu',
			plato: '/api/plato',
			reservacion: '/api/reservacion',
		};
		this.conectarDB().then();
		this.middlewares();
		this.routes();
		this.router.use('/Bares/V1', this.app)
		this._express = express().use(this.router);
	}

	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.paths.bar, require('./routes/bar'));
		this.app.use(this.paths.cliente, require('./routes/cliente'));
		this.app.use(this.paths.menu, require('./routes/menu'));
		this.app.use(this.paths.plato, require('./routes/plato'));
		this.app.use(this.paths.reservacion, require('./routes/reservacion'));
	}

	listen() {
		this._express.listen(this.port, () => {
			console.log(`Servidor corriendo en el puerto ${this.port}`);
		});
	}
}

module.exports = servidor;
