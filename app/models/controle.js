const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Controle {
    tabela_name = `controles`;
    id_name = `id_controle`;

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
        const sql = `SELECT * FROM ${this.tabela_name}
        left join usuarios on controles.usuario_fk = usuarios.id
        left join departamentos on controles.departamento_fk = departamentos.id
        left join equipamentos on controles.equipamento_fk = equipamentos.id
        order by controles.id`
        conexao.query(sql, [], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                const retorno = this.convertControleListToJson(resultado);
                res.status(201).json(retorno);
            }
        });
    }

    listaControlePorCentroDeCusto(res, controle){
        const sql = `SELECT * FROM ${this.tabela_name}
        left join usuarios on controles.usuario_fk = usuarios.id_usuario
        left join departamentos on controles.departamento_fk = departamentos.id_departamento
        left join equipamentos on controles.equipamento_fk = equipamentos.id_equipamento
        where controles.controle_status= ? and controles.departamento_fk = ?
        order by controles.id_controle`;
        conexao.query(sql,[controle.controle_status, 
                controle.departamento_fk], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                const controles = this.convertControleListToJson(resultado);
                res.status(201).json(controles);
            }
        });

    }

    listaControlePorUsuario(res, controle){
        const sql = `SELECT * FROM ${this.tabela_name} 
        left join usuarios on controles.usuario_fk = usuarios.id_usuario
        left join departamentos on controles.departamento_fk = departamentos.id_departamento
        left join equipamentos on controles.equipamento_fk = equipamentos.id_equipamento
        where controles.controle_status = ? and controles.usuario_fk = ?
        order by controles.id_controle `;
        conexao.query(sql,[controle.controle_status, controle.usuario_fk], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                const controles = this.convertControleListToJson(resultado);
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



    convertControleListToJson(resultados){
        const revisaoReturn = [];
        resultados.forEach(resultado=> {

            const controle ={}
            controle.id = resultado.id_controle;
            controle.dataDevolucao = resultado.data_devolucao;
            controle.dataRetirada = resultado.data_retirada;
            controle.status = resultado.status;

            const equipamento_fk={};
            equipamento_fk.id = resultado.id_equipamento;
            equipamento_fk.descricao = resultado.descricao_equipamento;
            equipamento_fk.fabricante = resultado.fabricante;
            equipamento_fk.modelo = resultado.modelo;
            equipamento_fk.codigoCPTM = resultado.codigo_cptm;
            controle.equipamento = equipamento_fk;

            const usuario_fk={};
            usuario_fk.id = resultado.id_usuario;
            usuario_fk.matricula = resultado.matricula;
            usuario_fk.nome = resultado.nome;
            usuario_fk.ativo = resultado.ativo;
            controle.usuario = usuario_fk;

            const departamento_fk={};
            departamento_fk.id = resultado.id_departamento;
            departamento_fk.descricao = resultado.descricao_departamento;
            departamento_fk.sigla = resultado.sigla;
            controle.departamento = departamento_fk;
           
            revisaoReturn.push(controle);

        });
        return revisaoReturn;
    }

    
}

module.exports = new Controle;