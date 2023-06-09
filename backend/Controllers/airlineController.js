import express from "express";
import { airlineUserSchema } from "../Database/auth/UserSchema.js";

export const airlineUsersControllerPost = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phonenumber,
      state,
      zipcode,
      age,
      check,
      email,
    } = req.body;
    if (
      firstname &&
      lastname &&
      email &&
      phonenumber &&
      state &&
      zipcode &&
      age &&
      check
    ) {
      const airlineData = new airlineUserSchema({
        firstname,
        lastname,
        email,
        phonenumber,
        state,
        zipcode,
        age,
        check,
      });
      const saveUser = await airlineData.save();

      res.json({ status: 200, msg: "data save sucessfully", data: saveUser });
    } else {
      res.json({ status: 401, msg: "please send valid data" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, msg: error.message });
  }
};
