import db from "../config/database.js";
import ReportCategory from "./reportCategory.model.js";
import Admin from "./admin.model.js";
import GovernmentAgency from "./governmentAgency.model.js";
import Report from "./report.model.js";
import ReportHistory from "./reportHistory.model.js";
import setupAssociations from "./associations.js";

const initializeDatabase = async () => {
  try {
    // Test database connection
    await db.authenticate();
    console.log("Database connection has been established successfully.");

    // Set up associations between models
    setupAssociations();

    // Sync models with database
    await db.sync();
    console.log("All models were synchronized successfully.");

    return {
      db,
      models: {
        ReportCategory,
        Admin,
        GovernmentAgency,
        Report,
        ReportHistory,
      },
    };
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export {
  db,
  ReportCategory,
  Admin,
  GovernmentAgency,
  Report,
  ReportHistory,
  setupAssociations,
  initializeDatabase,
};
