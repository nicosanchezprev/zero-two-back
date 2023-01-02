require('dotenv').config();

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {PORT} = process.env;
// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
  server.listen(PORT || 3001, () => {
    console.log(`listening at ${PORT || 3001}`); // eslint-disable-line no-console
  });
});
