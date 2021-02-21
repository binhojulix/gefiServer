const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

module.exports = () => {

	const app = express();
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
	app.use(cors("*"));
	app.use('/', require('../src/usuario/index'));
	app.use('/', require('../src/area/index'));
	app.use('/', require('../src/solicitacao/index'));
	app.use('/', require('../src/equipamento/index'));
	app.use('/', require('../src/controle/index'));
 return app
}