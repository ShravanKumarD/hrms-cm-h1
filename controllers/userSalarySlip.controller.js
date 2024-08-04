const db = require("../models");
const UserSalarySlip = db.userSalarySlip;
const User = db.user;
const UserFinancialInfo = db.userFinancialInfo;

// Create a new User Salary Slip
exports.createSalarySlip = async (req, res) => {
  console.log(req.body)
  try {
    const {
      name, // Added name here
      userId,
      address,
      designation,
      month,
      date_of_joining,
      basic_salary,
      hra,
      conveyance_allowance,
      special_allowance,
      medical_allowance,
      total_earnings,
      tds,
      professional_tax,
      employee_pf,
      other_deductions,
      total_deductions,
    } = req.body;

    const salarySlip = await UserSalarySlip.create({
      name, // Added name here
      userId,
      address,
      designation,
      month,
      date_of_joining,
      basic_salary,
      hra,
      conveyance_allowance,
      special_allowance,
      medical_allowance,
      total_earnings,
      tds,
      professional_tax,
      employee_pf,
      other_deductions,
      total_deductions,
    });

    res.status(201).send(salarySlip);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve all User Salary Slips
exports.findAll = async (req, res) => {
  try {
    const salarySlips = await UserSalarySlip.findAll();
    res.status(200).send(salarySlips);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve a User Salary Slip by User Id
exports.findByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const salarySlips = await UserSalarySlip.findAll({
      where: { userId: userId },
    });
    if (!salarySlips.length) {
      return res
        .status(404)
        .send({ message: "No salary slips found for the user." });
    }
    res.status(200).send(salarySlips);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve a single User Salary Slip with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const salarySlip = await UserSalarySlip.findByPk(id);
    if (!salarySlip) {
      return res.status(404).send({ message: "Salary slip not found." });
    }
    res.status(200).send(salarySlip);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a User Salary Slip with id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await UserSalarySlip.update(req.body, { where: { id } });

    if (updated) {
      const updatedSalarySlip = await UserSalarySlip.findByPk(id);
      res.status(200).send(updatedSalarySlip);
    } else {
      res.status(404).send({ message: "Salary slip not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a User Salary Slip with id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserSalarySlip.destroy({ where: { id } });

    if (deleted) {
      res.status(200).send({ message: "Salary slip deleted successfully." });
    } else {
      res.status(404).send({ message: "Salary slip not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
