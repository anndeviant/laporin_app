import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        status: false,
        message: "Token refresh tidak ditemukan",
      });
    }

    const admin = await Admin.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!admin || !admin.refresh_token) {
      return res.status(403).json({
        status: false,
        message: "Token tidak valid atau admin tidak ditemukan",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: false,
            message: "Token tidak valid",
          });
        }

        // Buat access token baru
        const accessToken = jwt.sign(
          {
            adminId: decoded.adminId,
            username: decoded.username,
            name: decoded.name,
            email: decoded.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m", // Durasi token 15 menit
          }
        );

        // Kirim token baru
        return res.json({
          status: true,
          message: "Token berhasil diperbarui",
          accessToken,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat memproses token",
    });
  }
};
