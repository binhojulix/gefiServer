const Equipamento = require('../models/equipamentos')
const autenticador	=	require(`../middlewares/autenticador`);

module.exports = (app) => {

    const publicFolder = 'process.cwd()+"/public/gefi-web/dist/gefi-web/';


    app.get('/equipamento', (req,res) => {
        
		res.sendFile(`${publicFolder}/index.html`);
	});


    //ok
    app.post('/equipamentos', (req, res) => {
        console.log("rota de salvar equipamentos");
        if (!req.body.modelo || !req.body.descricao_equipamento) {
            res.status(400);
            res.send(JSON.stringify({ mensagem: 
                'Preencha todos os campos!' }));
            res.end();
            return;
          }else{
            const equipamento = req.body;
            Equipamento.adiciona(equipamento, res);
          }
    });

     //ok
    app.get('/equipamentos', (req, res)=>{
        console.log("rota da lista de equipamentos");
        Equipamento.lista(res);
    });

    app.get('/equipamentos/:id_equipamento', (req, res)=>{
        const id_equipamento = parseInt(req.params.id_equipamento);
        console.log(`rota de selecionar o  equipamento`);
        Equipamento.pesquisarPorid(id_equipamento, res);
    });

    //ok
    app.delete('/equipamentos/:id_equipamento',(req, res)=>{
        const id_equipamento= parseInt(req.params.id_equipamento);
        console.log(`rota de deletar o  equipamento`);
        Equipamento.deleta(id_equipamento, res);
    });


    //ok
    app.patch('/equipamentos', (req,res) =>{
        const equipamento = req.body;
        console.log(equipamento)
        console.log(`rota de atualizar equipamento `);
        Equipamento.atualiza(equipamento, res);
     
    });

 

}