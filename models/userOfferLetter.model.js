// userOfferLetter.model.js
module.exports = (sequelize, Sequelize) => {
  const UserOfferLetter = sequelize.define(
    "user_offer_letters",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipient_place: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: "Hyderabad",
      },
      work_schedule: {
        type: Sequelize.STRING,
        defaultValue: "9:30 am to 6:30 pm, Monday to Friday",
      },
      company_name: {
        type: Sequelize.STRING,
        defaultValue: "CreditMitra",
      },
      sender_name: {
        type: Sequelize.STRING,
        defaultValue: "Murthy Balaji",
      },
      sender_title: {
        type: Sequelize.STRING,
        defaultValue: "Co Founder",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    }
  );

  return UserOfferLetter;
};
