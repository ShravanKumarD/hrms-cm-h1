module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Present", "Absent", "Leave"],
        allowNull: false,
      },
      clockinTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitudeClockin: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      longitudeClockin: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      clockoutTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitudeClockout: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      longitudeClockout: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    },
    {
      tableName: "attendances",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["userId", "date"],
        },
      ],
    }
  );

  return Attendance;
};
