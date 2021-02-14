const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride	= require('method-override');
const cors = require('cors');
const { estrategiasAutenticacao } = require('./src/usuarios');

app.use(bodyParser.json());
app.use(cors({origin: '*'}));
//app.use(express.static(process.cwd()+"/public/gefi-web/dist/gefi-web/"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

module.exports = app;


