module.exports = (sequelize, Sequelize) => {
  const UserDocuments = sequelize.define(
    "user_documents",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      offerLetter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salarySlips: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hikeLetter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relievingLetter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resignationLetter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    }
  );

  return UserDocuments;
};
