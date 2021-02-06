const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Usuario {

    adiciona(usuario, res){
        const sql = 'insert into usuarios set ?';
        
        conexao.query(sql, usuario,(err, result) =>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(201).json(result);
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

    
    deleta(id_usuario, res){
        const sql = 'delete from usuarios where id_usuario = ?';
        conexao.query(sql, id_usuario, (err, results) =>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(201).json(results);
            }
        })
    }

    pesquisarPorId(id_usuario, res){
        const sql = 'select nome, matricula, login from usuarios where id_usuario = ?';
        conexao.query(sql, [id_usuario], (err, results)=>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(201).json(results);
            }
        });
    }

    lista(res){
        const sql = 'select nome, matricula, login, id_usuario from usuarios';
        conexao.query(sql, [], (err, results)=>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(201).json(results);
            }
        });
    }


    atualiza(usuario, res){
        const sql = 'update usuarios set ? where id_usuario=?';
        conexao.query(sql, [usuario, usuario.id_usuario], (err, results)=>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(201).json(results);
            }
        });
    }

    listaDepartamentos(res){
        const sql = 'select *from departamentos';
        conexao.query(sql, [], (err, results)=>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(201).json(results);
            }
        });
    }



    
}

module.exports = new Usuario