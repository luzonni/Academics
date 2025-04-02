import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Curso from "./Curso";


class Disciplina extends Model {
    public id_disciplina!: number;
    public nome!: string;
    public id_curso!: number;
    public carga_horaria!: number;
}

Disciplina.init(
    {
        id_disciplina: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        id_curso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Curso,
                key: "id_curso"
            }, 
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        carga_horaria: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "disciplina",
        timestamps: false
    }
);

Curso.hasMany(Disciplina, {
    foreignKey: "id_disciplina"
})

Disciplina.belongsTo(Curso, {
    foreignKey: "id_curso"
})

export default Disciplina;