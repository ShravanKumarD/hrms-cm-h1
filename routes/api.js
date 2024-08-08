const express = require("express");
const router = express.Router();

const organizationRouter = require("./organization.routes");
const userRouter = require("./user.routes");
const departmentRouter = require("./department.routes");
const departmentAnnouncementRouter = require("./departmentAnnouncement.routes");
const jobRouter = require("./job.routes");
const daysHolidayRouter = require("./daysHoliday.routes");
const daysWorkingRouter = require("./daysWorking.routes");
const expenseRouter = require("./expense.routes");
const paymentRouter = require("./payment.routes");
const applicationRouter = require("./application.routes");
const userMessageRouter = require("./userMessage.routes");
const userPersonalEventRouter = require("./userPersonalEvent.routes");
const userPersonalInformationRouter = require("./userPersonalInformation.routes");
const userFinancialInformationRouter = require("./userFinancialInformation.routes");
const userSalarySlipRouter = require("./userSalarySlip.routes");
const userOfferLetterRouter = require("./userOfferLetter.routes");
const userHikeLetterRouter = require("./userHikeLetter.routes");
const userResignationLetterRouter = require("./userResignationLetter.routes");
const userRelievingLetterRouter = require("./userRelievingLetter.routes");
const attendanceRouter = require("./attendance.routes");
const userDocumentsRouter = require("./userDocuments.routes");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("this is the index for api");
});

router.use("/organizations", organizationRouter);
router.use("/users", userRouter);
router.use("/departments", departmentRouter);
router.use("/departmentAnnouncements", departmentAnnouncementRouter);
router.use("/jobs", jobRouter);
router.use("/daysHolidays", daysHolidayRouter);
router.use("/daysWorkings", daysWorkingRouter);
router.use("/expenses", expenseRouter);
router.use("/payments", paymentRouter);
router.use("/applications", applicationRouter);
router.use("/messages", userMessageRouter);
router.use("/personalEvents", userPersonalEventRouter);
router.use("/personalInformations", userPersonalInformationRouter);
router.use("/financialInformations", userFinancialInformationRouter);
router.use("/salary-slip", userSalarySlipRouter);
router.use("/offerLetters", userOfferLetterRouter);
router.use("/hikeLetters", userHikeLetterRouter);
router.use("/resignationLetters", userResignationLetterRouter);
router.use("/relievingLetters", userRelievingLetterRouter);
// router.use("/uploadLetters", userDocumentsRouter);
router.use("/attendance", attendanceRouter);

module.exports = router;
