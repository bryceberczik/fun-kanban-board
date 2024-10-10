import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const secretKey = process.env.JWT_SECRET_KEY || "";

  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  return res.json({ token });
};

export const signUp = async (req: Request, res: Response) => {

  try {
    
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });

  } catch (error: any) {
    
    res.status(400).json({ message: error.message });
  }
}

const router = Router();

router.post("/signup", signUp);

router.post("/login", login);

export default router;
