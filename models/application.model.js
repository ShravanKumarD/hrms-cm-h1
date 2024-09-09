module.exports = (sequelize, Sequelize) => {
  const Application = sequelize.define(
    "application",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Approved", "Rejected", "Pending"],
        allowNull: false,
      },
      appliedOn:{
        type: Sequelize.DATE,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM,
        values: [
          "Leave",
          "Regularisation",
          "Work From Home",
          "On Duty",
          "Comp Off",
          "Expense",
          "Restricted Holiday",
          "Short Leave",
        ],
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Application;
};
