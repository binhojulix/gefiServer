const csv = require('csv-parser');
const fs = require('fs');

class Tabelas {
    init(conexao) {
    this.conexao = conexao;

    this.criarAreas();
    this.criarEquipamentos();
    this.criarUsuarios();
    this.criarControles();


 
    }

    criarAreas() {
        const sql = `CREATE TABLE IF NOT EXISTS areas
                        (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, sigla VARCHAR(6) NOT NULL UNIQUE,
                        descricao VARCHAR(200) NOT NULL
                        )`
                      ;
        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }


    criarUsuarios() {
        const sql = `create table if not exists usuarios 
                        (id int not null auto_increment primary key, 
                        login varchar(20) not null unique, 
                        senha varchar(255), 
                        role varchar (10) NOT NULL, check (role IN ('ADMIN','GESTOR','USER')), 
                        trocar_senha int,
                        nome varchar(200) NOT NULL UNIQUE,
                        matricula varchar(10) NOT NULL UNIQUE, 
                        area int,
                        foreign key(area) references areas(id)
                    )`
                    ;

        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }

    
    criarEquipamentos() {
        const sql = `CREATE TABLE IF NOT EXISTS equipamentos 
                        (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                        descricao varchar(200) NOT NULL, 
                        fabricante varchar(100), 
                        modelo varchar(200), 
                        codigo_cptm varchar(7) UNIQUE
                    ) `
                    ;
    
        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }

   


    criarControles() {
        const sql = `CREATE TABLE IF NOT EXISTS controles(
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                        area int, foreign key(area) references areas(id),
                        solicitante int, foreign key(solicitante)  references usuarios(id),
                        responsavel int, foreign key(responsavel)  references usuarios(id),
                        usuarioValidador int, foreign key(usuarioValidador)  references usuarios(id),
                        equipamento int, foreign key(equipamento)  references equipamentos(id),
                        isDisponivelParaSolicitacao TINYINT(1),
                        dataSolicitacao date,
                        dataDevolucao date,
                        isIndividual TINYINT(1),
                        dataIndisponibilidade date,
                        dataSolucao date,
                        isDisponivelparaUso TINYINT(1),
                        indisponibilidade varchar(250),
                        solucao varchar(250))
                    `
                    ;

        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }

  

}

module.exports = new Tabelas