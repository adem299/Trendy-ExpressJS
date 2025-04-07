import { prismaClient } from "../application/database.js";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = "very_secret_key";
import { ResponseError } from "../error/response-error.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ errors: "Authorization header is missing" }).end();
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "Invalid token format" }).end();
  }

  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).json({ errors: "Token is empty" }).end();
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ errors: "Invalid token" }).end();
      req.user = user;
      next();
    });
    
    // const user = await prismaClient.user.findFirst({
    //   where: {
    //     token: token,
    //   },
    // });

    // if (!user) {
    //   return res.status(401).json({ errors: "Unauthorized - Invalid token" }).end();
    // }

    // req.user = user;
    // next();
  } catch (error) {
    return res.status(500).json({ errors: "Internal Server Error", details: error.message }).end();
  }
};

