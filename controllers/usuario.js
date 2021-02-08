const Usuario = require('../models/usuario')
const autenticador	=	require(`../middlewares/autenticador`);
module.exports = (app) => {
    
    const publicFolder = `${process.cwd()}/public/gefi-web/dist/gefi-web`;
    app.get('/usuario', (req,res) => {
		res.sendFile(`${publicFolder}/index.html`);
    });
    
    app.get('/departamentos', (req,res) => {
        console.log("rota da lista de usuarios");
        Usuario.listaDepartamentos(res);
	});

    app.post('/usuarios', (req, res) => {
        const usuario = {};
        usuario.nome = req.body.nome.toUpperCase();
        usuario.matricula = req.body.matricula;
        usuario.login = req.body.login.toUpperCase();
        usuario.departamento_fk = req.body.departamento_fk;
        usuario.senha = 'gefi';
        usuario.ativo = 1;
        usuario.trocar_senha = 1;

        if(req.body.privilegio==="ADMIN"){
            usuario.role_fk=1;
        }else if(req.body.privilegio==="USER"){
            usuario.role_fk=3;
        }else if(req.body.privilegio==="GESTOR"){
            usuario.role_fk=2;
        }
        console.log("rota de salvar usuarios");
        console.log(usuario)
        Usuario.adiciona(usuario, res);
    });


    app.get('/usuarios', (req, res)=>{
        console.log("rota da lista de usuarios");
        Usuario.lista(res);
    });


    app.get('/usuarios/:id_usuario', (req, res)=>{
        const id_usuario = parseInt(req.params.id_usuario);
        console.log(`rota da pesquisa de usuario por id_usuario=${id_usuario}`);
        Usuario.pesquisarPorId(id_usuario, res);
    });


    app.delete('/usuarios/:id_usuario',(req, res)=>{
        const id_usuario = parseInt(req.params.id_usuario);
        console.log(`rota de deletar o  usuario`);
        Usuario.deleta(id_usuario, res);
    });


    app.patch('/usuarios', (req,res) =>{

        const usuario = {};
        usuario.id_usuario = req.body.id;
        usuario.senha = req.body.senha;
        usuario.login = req.body.login;
        console.log(usuario);
        console.log(`rota de atualizar usuario id_usuario=${usuario.id_usuario}`);
        Usuario.atualiza(usuario, res);
    });


}