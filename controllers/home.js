
const jwt = require('jsonwebtoken');
const autenticador	=	require('../middlewares/autenticador');
const Usuario = require('../models/usuario')
const conexao = require('../infraestrutura/conexao')

module.exports = (app) => {

    const publicFolder = `${process.cwd()}/public/gefi-web/dist/gefi-web`;

    app.get('/', (req,res) => {
		res.sendFile(`${publicFolder}/index.html`);
	  });

	app.get('/home', (req,res) => {
		res.sendFile(`${publicFolder}/index.html`);
	});

    
    app.get('/login', (req,res) => {
		res.sendFile(`${publicFolder}/index.html`);
    });
    

    app.post('/autenticar', (req, res) => {

        login = req.body.login;
        senha = req.body.senha;
        
        console.log(`rota de autenticacao`);

        if(login && senha){
            const sql = `select  id_usuario, login, role_fk,
            trocar_senha, nome, matricula, ativo, departamento_fk
            from usuarios where login = ? and senha = ? `;

            conexao.query(sql, [login, senha], (erro, resultado)=>{
                if(erro){
                    res.status(400).json(erro);
                }else{
 
                    if(resultado.length > 0 ){
                        const id = resultado[0].id_usuario;
                        var token = jwt.sign({ id }, process.env.SECRET, {
                            expiresIn: 300 // expires in 5min
                          });

                        usuario = {};

                        usuario.id = resultado[0].id_usuario;
                        usuario.login = resultado[0].login;
                        usuario.role_fk = resultado[0].role_fk;
                        usuario.trocarSenha = resultado[0].trocar_senha;
                        usuario.departamento = resultado[0].departamento_fk;
                        usuario.token = token;
                        usuario.auth = true;
                        usuario.status = resultado[0].ativo;
                      
                        usuario.senha = "123";

                        switch (usuario.role_fk){
                            case 1:
                                usuario.privilegio = "ADMIN";
                                break;
                            case 2:
                                usuario.privilegio = "USER";
                                break;
                            case 3:
                                usuario.privilegio = "GESTOR";
                                break;

                        }
                        res.status(200).json(usuario);
                    }else{
                        res.status(500).json({message: 'Login inválido!'});
                    }
                    
                }
            });
        }
    });
     

    app.post('/logout', (req, res)=>{
        res.json({ auth: false, token: null });
    });
   
}