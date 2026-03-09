import { sequelize } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
    "User",{
       userId :{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull : false,
        unique:true,
        primaryKey: true
       },
       userName :{
        type:DataTypes.STRING,
        allowNull:false
       },
       email:{
        type : DataTypes.STRING,
        validate:{
            isEmail : true,
        },
        allowNull:false,
        unique: true
       },
       password:{
        type:DataTypes.STRING,
        allowNull:false,  
       },
    },
    {
        tableName: "User",
        timestamps:true
    }
);

