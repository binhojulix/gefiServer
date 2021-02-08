const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Equipamento {

    adiciona(equipamento, res){
        const sql = 'INSERT INTO equipamentos SET ?'

        conexao.query(sql, equipamento, (erro, resultado) => {
            if(erro) {
                console.log(erro);
                res.status(400).send(JSON.stringify({ mensagem: 
                    'Equipamento com esse código já existe!' }));
            } else{
                res.status(201).send(JSON.stringify({ mensagem: 
                    'Equipamento adicionado com sucesso!' }));
                res.end();
        
            }
        })
    }

    deleta(id_equipamento, res){
        const sql = 'delete from equipamentos where id_equipamento = ?';
        conexao.query(sql, id_equipamento, (erro, resultado)=>{
            if(erro) {
                console.log(erro);
                res.status(400).send(JSON.stringify({ mensagem: 
                    'Não foi possivel deletar o equipamento!' }));
            } else{
                res.status(201).send(JSON.stringify({ mensagem: 
                    'Equipamento deletado com sucesso!' }));
                res.end();
        
            }
        });
    }

    atualiza(equipamento, res){
        const sql = 'update equipamentos set ? where id_equipamento = ?';
        conexao.query(sql, [equipamento, equipamento.id_equipamento], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }


    lista(res){
        const sql ='SELECT *FROM EQUIPAMENTOS';
        conexao.query(sql,[], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }    
        });
    }

    listaEquipamentosNaoAssociados(res){
        const sql =`SELECT * FROM db_test.equipamentos where id_equipamento 
        not in(SELECT equipamento_fk FROM usuario_equipamento)`;
        conexao.query(sql,[], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }    
        });
    }



   
    pesquisarPorId(id, res){
        const sql = `SELECT * FROM equipamentos WHERE id=${id}`;
       
        conexao.query(sql, (erro, resultado) =>{
            const equipamento = resultado[0];
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(equipamento);
            }
        });
    }




   
}

module.exports = new Equipamento