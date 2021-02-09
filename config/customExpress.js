const express           = require('express');
const path	            = require('path');
var load = require('express-load');
const bodyParser        = require('body-parser');
const cookieParser	    = require('cookie-parser');
const expressSession	= require('express-session');
var expressValidator = require('express-validator');
const methodOverride	= require('method-override');
require("dotenv-safe").config();
const jwt               = require('jsonwebtoken');

module.exports = () => {

	var cors = require('cors');
	const app = express();
	app.use(cors({origin: '*'}));
	app.use(cookieParser('gefi'));

	app.use(expressSession());
	app.use(bodyParser.json())
	//app.use(express.static(process.cwd()+"/public/gefi-web/dist/gefi-web/"));
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(methodOverride('_method'));

	 
	load('models',{cwd: 'app'})
	.then('controllers')
	.then('infraestrutura')
	.into(app);



 
 return app
}