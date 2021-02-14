const moment = require('moment');
const usuario = require('../controllers/usuario');
const conexao = require('../infraestrutura/conexao')
const { InternalServerError } = require('../utils/erros');

class Usuario {

    tabela_name = `usuarios`;
    id_name = `id`;
    login = `login`;
    matricula = `matricula`;
  
    adiciona(res, model){
       
        const sql = `insert into ${this.tabela_name} set ?`;
        conexao.query(sql, [model],(erro,  resultado) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }


    pesquisarPorId(res, id){
        const sql = `select *from ${this.tabela_name} left join areas on areas.id = usuarios.area where ${this.tabela_name}.${this.id_name} = ? `;
        conexao.query(sql, [id], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                const retorno = this.convertUsuarioToListToJson(resultado);
                res.status(201).json(retorno);
            }
        });
    }

    lista(res){
        const sql = `select *from ${this.tabela_name} left join areas on areas.id = usuarios.area`;
        conexao.query(sql, [], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                const retorno = this.convertUsuarioToListToJson(resultado);
                res.status(201).json(retorno);
            }
        });
    }



    async buscaPorLogin(login) {
        const query = `select *from ${this.tabela_name} where login = ?`;
        try{
            let pro = new Promise((resolve, reject) =>{
                conexao.query(query, [login], function(erro, resultado){
                if(erro)   throw erro;
                    resolve(resultado);
                });
            });
            return pro.then((val)=>{
                return val[0];
            });
        }catch(erro){
            throw new InternalServerError('Não foi possível encontrar o usuário!');
        }
    }


    async buscaPorMatricula(login) {
        const query = `select *from ${this.tabela_name} where matricula = ?`;
        try{
            let pro = new Promise((resolve, reject) =>{
                conexao.query(query, [login], function(erro, resultado){
                if(erro)   throw erro;
                    resolve(resultado);
                });
            });
            return pro.then((val)=>{
                return val[0];
            });
        }catch(erro){
            throw new InternalServerError('Não foi possível encontrar o usuário!');
        }
    }



   


    atualiza(res, model, id){
        const sql = `UPDATE ${this.tabela_name} SET ? WHERE ${this.id_name} =?`;
        conexao.query(sql,[model, id], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }


    deleta(res, id){
        const sql = `delete from ${this.tabela_name} WHERE ${this.id_name}=?`;
        conexao.query(sql,[id], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }

    convertUsuarioToListToJson(resultados){
        const usuarioReturn = [];
        resultados.forEach(resultado => {

            const usuario = resultado;
            console.log(resultado)
            const area = {};
            area.sigla = resultado.sigla;
            area.descricao = resultado.descricao;
            delete usuario.descricao;
            delete usuario.sigla;
            usuario.area = area;
            usuarioReturn.push(usuario);

        });
        return usuarioReturn;
    }

    
}

module.exports = new Usuario