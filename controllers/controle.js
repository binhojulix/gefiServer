const Controle = require('../models/controle')
const Equipamento = require('../models/equipamentos')
const autenticador	=	require('../middlewares/autenticador');

module.exports = (app) => {

    const publicFolder = 'process.cwd()+"/public/gefi-web/dist/gefi-web/';
  
   app.get('/controle', (req,res) => {
       	res.sendFile(`${publicFolder}/index.html`);

    });
    
    app.post('/revisao', (req, res)=>{
        const revisao ={};
    
        revisao.data_revisao = new Date();
        revisao.revisao_status = 0;
        revisao.departamento_fk =req.body.departamento.id;
        revisao.equipamento_fk = req.body.equipamento.id;
        revisao.usuario_fk = req.body.usuario.id;
        console.log(revisao)
        console.log(`rota - adicionaRevisao`);
        Controle.adicionaRevisao(res, revisao);
    });

    app.patch('/revisao', (req, res)=>{
        const revisao ={};
    
        revisao.data_revisao = new Date();
        revisao.revisao_status = 1;
        revisao.departamento_fk =req.body.departamento.id;
        revisao.equipamento_fk = req.body.equipamento.id;
        revisao.usuario_fk = req.body.usuario.id;
        revisao.id_revisao = req.body.id; 
        console.log(revisao)
        console.log(`rota -atualizaRevisao`);
        Controle.atualizaRevisao(res, revisao);
    });

    app.get('/listaRevisaoPorDepartamento', (req, res)=>{
        const revisao = {};
        revisao.revisao_status = parseInt(req.query.revisao_status);
        revisao.departamento_fk = parseInt(req.query.departamento_fk);
        console.log(revisao);
        console.log(`rota - listaRevisaoPorDepartamento`);

        Controle.listaRevisaoPorDepartamento(res, revisao);
    });

    app.get('/listaRevisaoPorUsuario', (req, res)=>{
        const revisao = {};
        revisao.revisao_status = parseInt(req.query.revisao_status);
        revisao.usuario_fk = parseInt(req.query.usuario_fk);
        console.log(revisao);
        console.log(`rota - listarevisaoPorUsuario`);
        Controle.listaRevisaoPorUsuario(res, revisao);
    });

    app.post('/controle', (req, res)=>{
        const controle = {};
        id = req.body.id;
        controle.equipamento_fk = req.body.equipamento.id;
        controle.usuario_fk = req.body.usuario.id;
        controle.departamento_fk = req.body.departamento.id;
        controle.controle_status = 0;
        controle.data_retirada = new Date();
        console.log(controle)
        console.log(`rota - adicionaControle`);
        Controle.adicionaControle(res, controle, id);
    });

    app.patch('/controle', (req, res)=>{
            const controle = {};
            console.log(req.body);
            controle.id_controle = req.body.id;
            controle.equipamento_fk = parseInt(req.body.equipamento.id);
            controle.usuario_fk = parseInt(req.body.usuario.id);
            controle.departamento_fk = parseInt(req.body.departamento.id);
            controle.controle_status = 1;
            controle.data_devolucao = new Date();
            console.log(controle)
            console.log(`rota - atualizacontrole`);
            Controle.atualizaControle(res, controle, controle.id_controle);
        });

  
    app.get('/listacontrolepordepartamento', (req, res)=>{
        const controle = {};
        controle.controle_status = parseInt(req.query.controle_status);
        controle.departamento_fk = parseInt(req.query.departamento_fk);
        console.log(`rota - listacontroleporarea`);
        console.log(controle)
        Controle.listaControlePorArea(res, controle);

    });

    app.get('/listacontroleporusuario', (req, res)=>{
        const controle = {};
        controle.controle_status = parseInt(req.query.controle_status);
        controle.usuario_fk = parseInt(req.query.usuario_fk);
        console.log(controle)
        console.log(`rota - listacontroleporusuario`);
        Controle.listaControlePorUsuario(res, controle);
    });   
}