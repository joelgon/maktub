import knex from 'knex';

const options = {
  client: "mysql2",
  connection: {
    host: "mysql742.umbler.com",
    user: "testejoel",
    password: "joelMAKTUB2021",
    database: "testejoel",
    port: 41890,
  },
};

const Knex = knex(options);

export default Knex;