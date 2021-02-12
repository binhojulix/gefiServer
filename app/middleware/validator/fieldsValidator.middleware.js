const { check, validationResult } = require('express-validator');
const Usuario = require('../../models/usuario');
//const auth = require('../middleware/auth.middleware');

const campos ={
    descricao : `descricao`,
    nome : `nome`,
    matricula :'matricula',
    login:`login`,
    privilegio:`privilegio`,
    senha :`senha`
 }

exports.validaEquipamento = [

    check(`${campos.descricao}`, `campo ${campos.descricao} obrigatório`).notEmpty()

];

exports.validaUsuario =[

    check(`${campos.nome}`, `campo ${campos.nome} obrigatório`).notEmpty(),

    check(`${campos.privilegio}`).notEmpty().withMessage(`campo ${campos.privilegio} obrigatório`)
    .isIn(['User', 'Admin', 'Gestor']).withMessage(`campo ${campos.privilegio} inválido`),
    
    check(`${campos.matricula}`)
    .notEmpty()
    .withMessage(`campo ${campos.matricula} obrigatório`)
    .exists()
    .isLength({ min: 9, max: 9 })
    .withMessage(`campo ${campos.matricula} matricula inválida`)
    .isNumeric().withMessage('Formato de matricula inválida')
    .trim()
    .custom(async matricula => {
        const value = await Usuario.findOne("matricula", matricula);
        if (value) {
            throw new Error('Matricula já cadastrado!!!');
        }
    })
    .withMessage('Matricula inválida!!!'),

    check(`${campos.login}`)
    .notEmpty()
    .withMessage(`campo ${campos.login} obrigatório`)
    .exists()
    .isLength({ min: 6, max: 12 })
    .withMessage(`campo ${campos.login} deve ter no minimo 6 caracteres e no máximo 12 caracteres`)
    .trim()
    .custom(async login => {
        const value = await Usuario.findOne("login", login);
        if (value) {
            throw new Error('Usuário já cadastrado!!!');
        }
    })
    .withMessage('Login inválido!!!')

];

exports.validaAtualizacaoUsuario = [
    check(`${campos.nome}`, `campo ${campos.nome} obrigatório`).notEmpty(),

    check(`${campos.privilegio}`).notEmpty().withMessage(`campo ${campos.privilegio} obrigatório`)
    .isIn(['User', 'Admin', 'Gestor']).withMessage(`campo ${campos.privilegio} inválido`),
    
    check(`${campos.matricula}`)
    .notEmpty()
    .withMessage(`campo ${campos.matricula} obrigatório`)
    .exists()
    .isLength({ min: 9, max: 9 })
    .withMessage(`campo ${campos.login} matricula inválida`),

    check(`${campos.login}`)
    .notEmpty()
    .withMessage(`campo ${campos.login} obrigatório`)
    .exists()
    .isLength({ min: 6, max: 12 })
];

exports.validateLogin = [
    check(`${campos.login}`)
    .notEmpty()
    .withMessage(`campo ${campos.login} obrigatório`)
    .exists()
    .withMessage(`campo ${campos.login} obrigatório`),

    check(`${campos.senha}`)
    .notEmpty()
    .withMessage(`campo ${campos.senha} obrigatório`)
    .exists()
    .withMessage(`campo ${campos.senha} obrigatório`)
];

exports.centroDeCusto =[];

exports.controle =[];

exports.associacao =[];

exports.revisao =[];


