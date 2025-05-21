import Report from "../models/report.model.js";
import ReportCategory from "../models/reportCategory.model.js";
import { Op } from "sequelize";

export const getReports = async (req, res) => {
  try {
    const response = await Report.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getReportsById = async (req, res) => {
  try {
    const response = await Report.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const createReports = async (req, res) => {
  try {
    await Report.create(req.body);
    res.status(201).json({ msg: "Report add" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateReport = async (req, res) => {
  try {
    await Report.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Report berhasil di update" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteReport = async (req, res) => {
  try {
    await Report.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Report berhasil di hapus" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getReportsByCategory = async (req, res) => {
  try {
    const response = await Report.findAll({
      where: {
        category_id: req.params.categoryId,
        status: {
          [Op.in]: [
            "pending",
            "verified",
            "in_progress",
            "resolved",
            "rejected",
          ],
        },
      },
      include: [
        {
          model: ReportCategory,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat mengambil data aduan" });
  }
};

export const getPublicReportsByStatus = async (req, res) => {
  try {
    const response = await Report.findAll({
      where: {
        status: req.params.status,
      },
      attributes: [
        "id",
        "title",
        "location",
        "status",
        "createdAt",
        "updatedAt",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat mengambil data aduan" });
  }
};

export const trackReportStatus = async (req, res) => {
  try {
    const trackingId = req.params.trackingId;
    const report = await Report.findOne({
      where: { id: trackingId },
      attributes: [
        "id",
        "title",
        "description",
        "status",
        "location",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: ReportCategory,
          attributes: ["name"],
        },
      ],
    });

    if (!report) {
      return res.status(404).json({ msg: "Aduan tidak ditemukan" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan saat melacak aduan" });
  }
};

export const getReportStatistics = async (req, res) => {
  try {
    // Statistik jumlah aduan per kategori
    const categoryStats = await Report.findAll({
      attributes: [
        "category_id",
        [Report.sequelize.fn("COUNT", Report.sequelize.col("id")), "count"],
      ],
      include: [
        {
          model: ReportCategory,
          attributes: ["name"],
        },
      ],
      group: ["category_id"],
      raw: true,
    });

    // Statistik jumlah aduan per status
    const statusStats = await Report.findAll({
      attributes: [
        "status",
        [Report.sequelize.fn("COUNT", Report.sequelize.col("id")), "count"],
      ],
      group: ["status"],
      raw: true,
    });

    res.status(200).json({
      categories: categoryStats,
      statuses: statusStats,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil statistik" });
  }
};
