import { Sequelize } from "sequelize";

const dbUser=process.env.DB_USER!;

async function runDB(){
    const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
    })
    await sequelize.authenticate();
    console.log("Database is running...");
}

export {
    runDB
}