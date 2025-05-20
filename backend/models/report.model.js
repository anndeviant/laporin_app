import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Report = db.define(
  "reports",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reporter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reporter_contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "verified",
        "in_progress",
        "resolved",
        "rejected"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Report;
