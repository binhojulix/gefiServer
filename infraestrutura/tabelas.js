const csv = require('csv-parser');
const fs = require('fs');

class Tabelas {
    init(conexao) {
    this.conexao = conexao;

    this.criarDepartamentos();
    this.criarEquipamentos();
    this.criarRoles();
    this.criarUsuarios();
    this.criarRevisoes();
    this.criarControles();
    this.criarUsuarioEquipamentos();

    this.inserirDepartamentos();
    this.inserirEquipamentos();
    this.inserirRoles();


    }

    criarDepartamentos() {

        const sql = `CREATE TABLE IF NOT EXISTS departamentos
                     (id_departamento int NOT NULL AUTO_INCREMENT, sigla VARCHAR(6) NOT NULL UNIQUE,
                      descricao_departamento VARCHAR(200) NOT NULL, 
                      PRIMARY KEY(id_departamento))`;

        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }



    criarRoles() {
        const sql = `create table if not exists roles
                    (id_role int not null auto_increment, 
                    descricao_role varchar(20) not null unique,
                    primary key(id_role));`;

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
                    (id_usuario int not null auto_increment primary key, 
                    login varchar(20) not null unique, senha varchar(250), role_fk int, 
                    trocar_senha int,
                    nome varchar(200) NOT NULL UNIQUE,
                    matricula varchar(10) NOT NULL UNIQUE, ativo int,
                    departamento_fk int,
                    foreign key(departamento_fk) references departamentos(id_departamento),
                    foreign key(role_fk) references roles(id_role))`;

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
                    (id_equipamento int NOT NULL AUTO_INCREMENT, 
                    descricao_equipamento varchar(200) NOT NULL, 
                    fabricante varchar(100), coletivo int,
                    modelo varchar(200) , codigo_cptm varchar(20) UNIQUE, PRIMARY KEY(id_equipamento))`;
    
        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }

    criarUsuarioEquipamentos() {
        const sql = `CREATE TABLE IF NOT EXISTS usuario_equipamento 
        (id_usuario_equipamento int NOT NULL AUTO_INCREMENT PRIMARY KEY, usuario_fk int, equipamento_fk int,
        foreign key(usuario_fk) references usuarios(id_usuario), status varchar(20),
        foreign key(equipamento_fk)  references equipamentos(id_equipamento))`;
    
        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }



    criarControles() {
        const sql = `CREATE TABLE IF NOT EXISTS controles 
        (id_controle int NOT NULL AUTO_INCREMENT, usuario_fk int, equipamento_fk int, 
        data_devolucao datetime, data_retirada datetime  , PRIMARY KEY(id_controle), controle_status int, 
        departamento_fk int,
        foreign key(usuario_fk) references usuarios(id_usuario),
        foreign key(equipamento_fk)  references equipamentos(id_equipamento),
        foreign key(departamento_fk) references departamentos(id_departamento))`;

        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }

    criarRevisoes() {
        const sql = `CREATE TABLE IF NOT EXISTS revisoes
        (id_revisao int NOT NULL AUTO_INCREMENT,usuario_fk int, equipamento_fk int, 
            data_revisao datetime, PRIMARY KEY(id_revisao), revisao_status int,
            departamento_fk int,
            foreign key(usuario_fk) references usuarios(id_usuario),
            foreign key(equipamento_fk)  references equipamentos(id_equipamento),
            foreign key(departamento_fk) references departamentos(id_departamento))`;

        this.conexao.query(sql,  (erro, resultado)=> {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        });
    }
  
    
    


   

    inserirRoles(){

        const roles = [
            {descricao_role: "ADMIN" },
            {descricao_role: "GESTOR" },
            {descricao_role: "USER" },
        ];

      
        const sql = `insert into roles(descricao_role) values ?`;
           
        this.conexao.query(sql, [roles.map(role => [role.descricao_role])],
            (erro, resultado) =>{
            
            if(erro){
                console.log(erro)
            }else{
                console.log(`Inserido com sucesso`);
                this.inserirUsuarios();
            }

        });  
    }

   



    inserirDepartamentos(){
        var departamentos = [];

        fs.createReadStream('infraestrutura/csvs/departamentos.csv')
        .pipe(csv()).on('data', (departamento) => {
            departamentos.push(departamento);
        }).on('end', () => {
            const sql = `insert into departamentos (sigla, descricao_departamento) values ?`;
            this.conexao.query(sql,
                [departamentos.map(eqpt =>[eqpt.sigla, eqpt.descricao_departamento])], erro => {
                if(erro) {
                    console.log(erro)
                } else {
                    console.log('Departamento Inserido com sucesso')
                }
            })
        });
    }

    inserirUsuarios(){

      const usuarios = [
          {nome: 'FABIO JULIO DA LUZ', matricula:"920062970", ativo:1, login:"FABIOLU",
          senha:"GEFI", role_fk:1, trocar_senha:1, departamento_fk:1},
       
          {nome: 'EDSON AKIRA KUSANO', matricula:"92006297", ativo:1, login:"EDSONK",
          senha:"GEFI", role_fk:2, trocar_senha:1, departamento_fk:1},
       
          {nome: 'MARCELO BARBOSA', matricula:"9200629702", ativo:1, login:"MARCELOHB",
          senha:"GEFI", role_fk:3, trocar_senha:1, departamento_fk:1}
      ];
        const sql = `insert into usuarios (nome, matricula, ativo, login, senha,
            role_fk, trocar_senha, departamento_fk)  values ?`;
           
        this.conexao.query(sql, [usuarios.map(usuario => [usuario.nome, usuario.matricula,
              usuario.ativo, usuario.login, usuario.senha, usuario.role_fk, usuario.trocar_senha,
              usuario.departamento_fk])],
            (erro, resultado) =>{
            
            if(erro){
                console.log(erro)
            }else{
                console.log(`Usuario inserido com sucesso`)
                this.inserirControles();
                this.inserirRevisoes();
            }

        });  
    }

    inserirEquipamentos(){
        var equipamentos = [];

        fs.createReadStream('infraestrutura/csvs/equipamentos.csv')
        .pipe(csv()).on('data', (equipamento) => {
            equipamentos.push(equipamento);
        }).on('end', () => {
            const sql = `insert into equipamentos (descricao_equipamento, fabricante, modelo, codigo_cptm) values ?`;
            this.conexao.query(sql,
                [equipamentos.map(eqpt =>[eqpt.descricao_equipamento, eqpt.fabricante, eqpt.modelo, eqpt.codigo_cptm])], erro => {
                if(erro) {
                    console.log(erro)
                } else {
                    console.log('Equipamento inserido com sucesso')
                }
            })
        });
    }

  

    inserirControles(){

        const controles = [];

        for(var i =1; i<=409; i++){

            controles.push({usuario_fk:1, equipamento_fk:i, data_devolucao:new Date(),
                data_retirada:new Date(), controle_status:1, departamento_fk:1});
        }


          const sql = `insert into controles (usuario_fk, equipamento_fk, data_devolucao,
                       data_retirada, controle_status, departamento_fk)  values ?`;
             
          this.conexao.query(sql, [controles.map(controle => [controle.usuario_fk, 
                controle.equipamento_fk,
                controle.data_devolucao, controle.data_retirada,
                controle.controle_status, controle.departamento_fk])],
              (erro, resultado) =>{
              
              if(erro){
                  console.log(erro)
              }else{
                  console.log(`Controle inserido com sucesso`)
              }
  
          });  

    }

    inserirRevisoes(){
        const revisoes = [];

        for(var i =1; i<=409; i++){

            revisoes.push({usuario_fk:1, equipamento_fk:i, data_revisao:new Date(), revisao_status:1, departamento_fk:1});
        }


          const sql = `insert into revisoes (usuario_fk, equipamento_fk,
                       data_revisao, revisao_status, departamento_fk)  values ?`;
             
          this.conexao.query(sql, [revisoes.map(revisao => [revisao.usuario_fk, 
                revisao.equipamento_fk, revisao.data_revisao,  revisao.revisao_status, revisao.departamento_fk])],
              (erro, resultado) =>{
              
              if(erro){
                  console.log(erro)
              }else{
                  console.log(`Revisao inserido com sucesso`)
              }
  
          });  
      

    }

  
 

  

}

module.exports = new Tabelas