const customExpress = require('./config/customExpress');


const app = customExpress();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`servidor está rodando na porta ${PORT}`))

module.exports = app