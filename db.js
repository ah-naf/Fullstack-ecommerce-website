require("dotenv").config();
const { Pool } = require("pg");

const connectionString = `postgresql://${"postgres"}:${"8880"}@${"localhost"}:${5432}/${"ecommerce"}`;

const proConfig = process.env.DATABASE_URL; //heroku addons
console.log(proConfig)
console.log(process.env.JWT_SECRET)
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : connectionString,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;
