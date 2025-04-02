import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Curso extends Model {
  public id_curso!: number;
  public nome!: string;
  public carga_horaria!: number;
}

Curso.init(
  {
    id_curso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carga_horaria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "curso", 
    timestamps: false
  }
);

export default Curso;