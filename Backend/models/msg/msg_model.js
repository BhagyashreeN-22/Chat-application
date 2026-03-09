import { sequelize } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const Msg =sequelize.define(
    "Msg",{
        msgId:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            unique:true,
            primaryKey : true
        },
        senderId:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model : "User",
                key:"userId"
            },
            onDelete:"CASCADE"
        },
        receiverId:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model : "User",
                key:"userId"
            },
            onDelete:"CASCADE"
        },
        context:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName :"Msg",
        timestamps:true
    }
);