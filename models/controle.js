const e = require('method-override');
const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Controle {

   

    adicionaRevisao(res, revisao){

        const sql = `insert into revisoes SET ? `;
       
        conexao.query(sql,[revisao], (erro, resultado) =>{
            
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }

        });

    }
    
    atualizaRevisao(res, revisao){

        const sql = `update revisoes set ? where id_revisao= ?`;
       
            conexao.query(sql,[revisao,
                    revisao.id_revisao], (erro, resultado) =>{
                
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(201).json(resultado);
                }
            });

    }

    listaRevisaoPorDepartamento(res, revisao){

        const sql = `SELECT * FROM revisoes
                    left join usuarios on revisoes.usuario_fk = usuarios.id_usuario
                    left join departamentos on revisoes.departamento_fk = departamentos.id_departamento
                    left join equipamentos on revisoes.equipamento_fk = equipamentos.id_equipamento
                    where revisoes.revisao_status = ? and revisoes.departamento_fk = ?`;
            
        conexao.query(sql,[revisao.revisao_status, 
                revisao.departamento_fk], (erro, resultado) =>{
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
                    left join departamentos on revisoes.departamento_fk = departamentos.id_departamento
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


    adicionaControle(res, controle, id){

        const sql = `insert into controles set ?`;
       
        conexao.query(sql,[controle], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                controle.controle_status = -1;
                controle.id_controle = id;
                console.log("autalizadndo")
                console.log(controle)
                this.atualizaControle(res, controle, controle.id_controle);
            }
        });
    }


    atualizaControle(res, controle, id_controles){
        console.log(controle)
        const sql = `UPDATE controles SET ? WHERE id_controle =?`;
       
        conexao.query(sql,[controle, id_controles], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });
    }

  

    listaControlePorArea(res, controle){
 
        const sql = `SELECT * FROM controles 
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
    
        const sql = `SELECT * FROM controles 
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


   
    
    pesquisarPorId(id, res){

        const sql = 'select *from controles where id = ? ';
        conexao.query(sql, id, (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultado);
            }
        });

    }

 


    
}

module.exports = new Controle