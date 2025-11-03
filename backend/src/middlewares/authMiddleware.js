// @ts-nocheck
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// authorization - xác minh user là ai
export const protectedRoute = (req, res, next) => {
  try {
    // lấy token từ header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy access token" });
    }

    // xác nhận token hợp lệ
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
      if (err) {
        console.error(err);

        return res
          .status(403)
          .json({ message: "Access token hết hạn hoặc không đúng" });
      }

      // tìm user
      const user = await User.findById(decodedUser.userId).select("-hashedPassword");

      if (!user) {
        return res.status(404).json({ message: "người dùng không tồn tại." });
      }

      // trả user về trong req
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Lỗi khi xác minh JWT trong authMiddleware", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
