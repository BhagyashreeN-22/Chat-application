import { sequelize } from "../../config/db.js";
import { DataTypes } from "sequelize";
export const Follow = sequelize.define(
    "Follow",{
        uniqueId:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull : false,
            unique:true,
            primaryKey:true
        },
        followerId:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model : "User",
                key:"userId"
            },
            onDelete:"CASCADE"
        },
        followingId:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model : "User",
                key:"userId"
            },
            onDelete:"CASCADE"
        },
        status:{
            type : DataTypes.ENUM("pending","accepted"),
            allowNull:false,
            defaultValue :"pending"
        }
    },
    {
        tableName:"Follow",
        timestamps:true
    }
);