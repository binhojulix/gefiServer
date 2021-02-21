const customExpress = require('./config/customExpress');
const db = require('./src/infraestrutura/database');


db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = customExpress();
const PORT = process.env.PORT || 3000;

db.sync().then(() => {
    app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}...`)});
}).catch(err => console.log("Error: " + err));

