import Report from "../models/report.model.js";
import ReportCategory from "../models/reportCategory.model.js";
import ReportHistory from "../models/reportHistory.model.js";
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
        [
          Report.sequelize.fn("COUNT", Report.sequelize.col("reports.id")),
          "count",
        ],
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

// Mendapatkan riwayat perubahan aduan
export const getReportHistory = async (req, res) => {
  try {
    const reportId = req.params.id;

    // Cek apakah laporan ada
    const report = await Report.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ msg: "Aduan tidak ditemukan" });
    }

    // Dapatkan riwayat laporan
    const history = await ReportHistory.findAll({
      where: { report_id: reportId },
      include: [
        {
          model: Admin,
          attributes: ["name"],
        },
        {
          model: GovernmentAgency,
          attributes: ["name"],
        },
      ],
      order: [["timestamp", "DESC"]],
    });

    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat mengambil riwayat aduan" });
  }
};

// Memverifikasi aduan
export const verifyReport = async (req, res) => {
  const { note } = req.body;
  const reportId = req.params.id;

  try {
    // Cek apakah laporan ada
    const report = await Report.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ msg: "Aduan tidak ditemukan" });
    }

    // Ubah status laporan menjadi terverifikasi
    await Report.update(
      {
        status: "verified",
        admin_id: req.adminId,
      },
      { where: { id: reportId } }
    );

    // Buat catatan riwayat
    await ReportHistory.create({
      report_id: reportId,
      status: "verified",
      note: note || "Aduan telah diverifikasi",
      admin_id: req.adminId,
    });

    res.status(200).json({ msg: "Aduan berhasil diverifikasi" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan saat memverifikasi aduan" });
  }
};

// Menugaskan aduan ke instansi
export const assignReportToAgency = async (req, res) => {
  const { agency_id, note } = req.body;
  const reportId = req.params.id;

  try {
    // Validasi input
    if (!agency_id) {
      return res.status(400).json({ msg: "ID instansi diperlukan" });
    }

    // Cek apakah laporan ada
    const report = await Report.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ msg: "Aduan tidak ditemukan" });
    }

    // Cek apakah instansi ada
    const agency = await GovernmentAgency.findByPk(agency_id);
    if (!agency) {
      return res.status(404).json({ msg: "Instansi tidak ditemukan" });
    }

    // Ubah status laporan menjadi dalam proses
    await Report.update(
      {
        status: "in_progress",
        agency_id: agency_id,
        admin_id: req.adminId,
      },
      { where: { id: reportId } }
    );

    // Buat catatan riwayat
    await ReportHistory.create({
      report_id: reportId,
      status: "in_progress",
      note: note || `Aduan ditugaskan ke ${agency.name}`,
      agency_id: agency_id,
      admin_id: req.adminId,
    });

    res.status(200).json({ msg: "Aduan berhasil ditugaskan ke instansi" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan saat menugaskan aduan" });
  }
};

// Menyelesaikan aduan
export const resolveReport = async (req, res) => {
  const { note } = req.body;
  const reportId = req.params.id;

  try {
    // Cek apakah laporan ada
    const report = await Report.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ msg: "Aduan tidak ditemukan" });
    }

    // Ubah status laporan menjadi terselesaikan
    await Report.update(
      {
        status: "resolved",
        admin_id: req.adminId,
      },
      { where: { id: reportId } }
    );

    // Buat catatan riwayat
    await ReportHistory.create({
      report_id: reportId,
      status: "resolved",
      note: note || "Aduan telah diselesaikan",
      agency_id: report.agency_id,
      admin_id: req.adminId,
    });

    res.status(200).json({ msg: "Aduan berhasil diselesaikan" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan saat menyelesaikan aduan" });
  }
};

// Menolak aduan
export const rejectReport = async (req, res) => {
  const { note } = req.body;
  const reportId = req.params.id;

  try {
    // Cek apakah catatan penolakan disertakan
    if (!note) {
      return res.status(400).json({ msg: "Alasan penolakan diperlukan" });
    }

    // Cek apakah laporan ada
    const report = await Report.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ msg: "Aduan tidak ditemukan" });
    }

    // Ubah status laporan menjadi ditolak
    await Report.update(
      {
        status: "rejected",
        admin_id: req.adminId,
      },
      { where: { id: reportId } }
    );

    // Buat catatan riwayat
    await ReportHistory.create({
      report_id: reportId,
      status: "rejected",
      note: note,
      admin_id: req.adminId,
    });

    res.status(200).json({ msg: "Aduan telah ditolak" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan saat menolak aduan" });
  }
};
