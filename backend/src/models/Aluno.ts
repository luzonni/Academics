import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Aluno extends Model {
  public id_aluno!: number;
  public nome!: string;
  public email!: string;
  public data_nascimento!: string;
  public cpf!: string;
}

Aluno.init(
  {
    id_aluno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    tableName: "aluno", 
    timestamps: false
  }
);

export default Aluno;