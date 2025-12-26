import { Request, Response } from "express";
import { prisma } from "../configs/prisma";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      Gmail,
      PhoneNumber,
      Family_Name,
      Sure_Name,
      Nickname,
      Birthday,
      Password,
      Role,
    } = req.body;

    // validate cơ bản
    if (!Gmail || !Password || !Family_Name || !Sure_Name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check email tồn tại
    const existedUser = await prisma.user.findUnique({
      where: { gmail: Gmail },
    });

    if (existedUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // hash password
    const hashPassword = await bcrypt.hash(Password, 10);

    const user = await prisma.user.create({
      data: {
        gmail: Gmail,
        phoneNumber: PhoneNumber,
        familyName: Family_Name,
        sureName: Sure_Name,
        nickname: Nickname,
        birthday: new Date(Birthday),
        hashPassword,
        pinOtp: null,
        isDelete: false,
        role: Role,
        isOnline: false,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
