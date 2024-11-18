const postgresDBName = process.env.POSTGRES_DB_NAME;
const postgresDBUser = process.env.POSTGRES_DB_USER;
const postgresDBPassword = process.env.POSTGRES_DB_PASSWORD;
const postgresDBHost = process.env.POSTGRES_DB_HOST;

const dbConnection = new sequelize(
  postgresDBName,
  postgresDBUser,
  postgresDBPassword,
  {
    host: postgresDBHost,
    dialect: "postgres",
  }
);

module.exports = { dbConnection };
