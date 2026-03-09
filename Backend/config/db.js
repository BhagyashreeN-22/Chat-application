import dotenv from "dotenv"
dotenv.config();
import { Sequelize } from "sequelize";

console.log("TYPE OF PASSWORD:", typeof process.env.DB_PASSWORD);
console.log("VALUE OF PASSWORD:", process.env.DB_PASSWORD);

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        pool:{
            max:10,
            min:0,
            acquire:30000,
            idle:1000,
        },
    }
);

export const db = async () => {
    try {
        await sequelize.authenticate();
        console.log("Successful authentication!");
        await sequelize.sync();
    } catch (error) {
        console.log("Failed connection:", error.message);
        process.exit(1);
    }
};