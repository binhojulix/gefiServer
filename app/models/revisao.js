const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Revisao {
    tabela_name = `revisoes`;
    id_name = `id_revisoes`;

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


    listaRevisaoPorCentroDeCusto(res, revisao){


        const sql = `SELECT * FROM revisoes
                    left join usuarios on revisoes.usuario_fk = usuarios.id_usuario
                    left join centrodecusto on revisoes.centrodecusto_fk = centrodecusto.ID_CPTM
                    left join equipamentos on revisoes.equipamento_fk = equipamentos.id_equipamento
                    where revisoes.revisao_status = ? and revisoes.centrodecusto_fk = ?`;
            
        conexao.query(sql,[revisao.revisao_status, 
                revisao.centrodecusto_fk], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                const controles = this.convertRevisaoListToJson(resultado);
                res.status(201).json(controles);
            }
        });

    }

    listaRevisaoPorUsuario(res, revisao){

        const sql = `SELECT * FROM revisoes
                    left join usuarios on revisoes.usuario_fk = usuarios.id_usuario
                    left join centrodecusto on revisoes.centrodecusto_fk = centrodecusto.ID_CPTM
                    left join equipamentos on revisoes.equipamento_fk = equipamentos.id_equipamento
                    where revisoes.revisao_status = ? and revisoes.usuario_fk = ?`;
            
        conexao.query(sql,[revisao.revisao_status, 
                revisao.usuario_fk], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                const controles = this.convertRevisaoListToJson(resultado);
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
 
  

    convertRevisaoListToJson(resultados){
        const revisaoReturn = [];
        resultados.forEach(resultado=> {
            const revisao ={}
            revisao.id = resultado.id_revisao;
            revisao.dataRevisao = resultado.data_revisao;
            revisao.status = resultado.revisao_status;

            const equipamento_fk={};
            equipamento_fk.id = resultado.id_equipamento;
            equipamento_fk.descricao = resultado.descricao_equipamento;
            equipamento_fk.fabricante = resultado.fabricante;
            equipamento_fk.modelo = resultado.modelo;
            equipamento_fk.codigoCPTM = resultado.codigo_cptm;
            revisao.equipamento = equipamento_fk;

            const usuario_fk={};
            usuario_fk.id = resultado.id_usuario;
            usuario_fk.matricula = resultado.matricula;
            usuario_fk.nome = resultado.nome;
            usuario_fk.ativo = resultado.ativo;
            revisao.usuario = usuario_fk;

            const departamento_fk={};
            departamento_fk.id = resultado.id_departamento;
            departamento_fk.descricao = resultado.descricao_departamento;
            departamento_fk.sigla = resultado.sigla;
            revisao.departamento = departamento_fk;
            revisaoReturn.push(revisao);

        });
        return revisaoReturn;
    }

}

module.exports = new Revisao;
