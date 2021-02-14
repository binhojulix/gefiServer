require('dotenv').config()

const app = require('./app');
const PORT = process.env.PORT || 8080;
require('./database');
require('./redis/blocklist-access-token');
require('./redis/allowlist-refresh-token');

const routes = require('./rotas');
routes(app);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}...`);
  });

