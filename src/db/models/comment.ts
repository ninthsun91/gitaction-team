import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import sequelize from "../config/connection";


class Comments extends Model<
    InferAttributes<Comments>, InferCreationAttributes<Comments>> {

    declare commentId: CreationOptional<number>;
    declare userId: ForeignKey<number>;
    declare comment: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}


Comments.init({
    commentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    // userId: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     references: {
    //         model: 'Users',
    //         key: 'userId'
    //     }
    // },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString(),
    },
    updatedAt: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString(),
    }
}, {
    sequelize,
    modelName: 'Comments'
})


export default Comments;