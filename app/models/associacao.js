const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Asociacao {
    tabela_name = `associacoes`;
    id_name = `id`;
  
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

    listaAssociacoesPorCentroDeCusto(parametros, res){
        const sql = `SELECT id_associacao, equipamento_fk, usuario_fk, id_usuario,
                    nome, matricula, login, status, tipo,
                    id_equipamento, descricao_equipamento, fabricante, coletivo, modelo,codigo_cptm 
                    FROM associacao, equipamentos, usuarios
                    where usuarios.id_usuario = associacao.usuario_fk
                    and equipamentos.id_equipamento = associacao.equipamento_fk and tipo = ? and  centrodecusto =?`;
       
        conexao.query(sql, [parametros.tipo, parametros.centrodecusto], (erro, resultado) =>{
            
            if(erro){
                res.status(400).json(erro);
            }else{
                const controles = this.convertAssociacaoToJSON(resultado);
                res.status(201).json(controles);
            }

        });
    }

    listaAssociacoesPorUsuario(parametros, res){
        const sql = `SELECT id_associacao, equipamento_fk, usuario_fk, id_usuario,
                    nome, matricula, login, status, tipo,
                    id_equipamento, descricao_equipamento, fabricante, coletivo, modelo,codigo_cptm 
                    FROM associacao, equipamentos, usuarios
                    where usuarios.id_usuario = associacao.usuario_fk
                    and equipamentos.id_equipamento = associacao.equipamento_fk and tipo = ? and usuario_fk =?`;
       
        conexao.query(sql, [parametros.tipo, parametros.usuario_fk], (erro, resultado) =>{
            
            if(erro){
                res.status(400).json(erro);
            }else{
                const controles = this.convertAssociacaoToJSON(resultado);
                res.status(201).json(controles);
            }

        });
    }

    atualiza(res, model){
        const sql = `UPDATE ${this.tabela_name} SET ? WHERE ${this.id_name} =?`;
        conexao.query(sql,[model, model.id], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }


    deleta(res, id){
        const sql = `delete ${this.tabela_name} WHERE ${this.id_name}=?`;
        conexao.query(sql,[id], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }

 

    convertAssociacaoToJSON(resultados){
        const associacaoReturn = [];
        resultados.forEach(resultado=> {

            const associacao ={}
            associacao.id_usuario_equipamento = resultado.id_associacao;
            associacao.status = resultado.status;

            const equipamento_fk={};
            equipamento_fk.id = resultado.id_equipamento;
            equipamento_fk.descricao_equipamento = resultado.descricao_equipamento;
            equipamento_fk.fabricante = resultado.fabricante;
            equipamento_fk.modelo = resultado.modelo;
            equipamento_fk.codigo_cptm = resultado.codigo_cptm;
            associacao.equipamento = equipamento_fk;

            const usuario_fk={};
            usuario_fk.id = resultado.id_usuario;
            usuario_fk.matricula = resultado.matricula;
            usuario_fk.nome = resultado.nome;
            usuario_fk.ativo = resultado.ativo;
  
            associacaoReturn.push(associacao);

        });
        return associacaoReturn;
    }

}

module.exports = new Associacao;