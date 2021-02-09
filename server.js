const customExpress = require('./config/customExpress');
const conexao = require('./app/infraestrutura/conexao');
const Tabelas = require('./app/infraestrutura/tabelas');

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso');
       // Tabelas.init(conexao);
        
        const app = customExpress();
        
        app.use((req, res,next)=>{
            res.sendFile(process.cwd()+"/public/gefi-web/dist/gefi-web/index.html")
         });

        const PORT = process.env.PORT || 8083;

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}...`);
          });

     
    }
});
