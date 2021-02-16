const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

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
        const sql = `select *from ${this.tabela_name} where ${this.id_name} = ? `;
        conexao.query(sql, [id], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }

    lista(res){
        const sql = `select *from ${this.tabela_name}`;
        conexao.query(sql, [], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }

    pesquisarPorLoginESenha(usuario, res){
        const sql = `select nome, matricula, login, ativo, trocar_senha, 
        departamento_fk from usuarios where login = ? and senha = ? `;
        conexao.query(sql, [usuario.login, usuario.senha], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }

    pesquisaPorLogin(login){
        return new Promise((resolve, reject) => {
            conexao.query(`SELECT COUNT(*) AS total FROM ${this.tabela_name}
             WHERE ${this.login} = ?`, [login], function (error, results, fields) {
                if(!error){
                    console.log("Login Count : "+results[0].total);
                    return resolve(results[0].total > 0);
                } else {
                    return reject(new Error('Database error!!'));
                }
              }
            );
        });
    }


    findOne(login){
        return new Promise((resolve, reject) => {
            conexao.query(`SELECT *FROM ${this.tabela_name}
             WHERE ${this.login} = ?`, [login], function (error, results, fields) {
                if(!error){
                    console.log("Login Count : "+results[0].total);
                    return resolve(results[0].total > 0);
                } else {
                    return reject(new Error('Database error!!'));
                }
              }
            );
        });
    }

    pesquisaPorMatricula(matricula){
        return new Promise((resolve, reject) => {
            conexao.query(`SELECT COUNT(*) AS total FROM ${this.tabela_name}
             WHERE ${this.matricula} = ?`, [matricula], function (error, results, fields) {
                if(!error){
                    console.log("Matricula Count : " + results[0].total);
                    return resolve(results[0].total > 0);
                } else {
                    return reject(new Error('Database error!!'));
                }
              }
            );
        });
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

 
    
}

module.exports = new Usuario