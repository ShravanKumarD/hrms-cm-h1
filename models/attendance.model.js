const moment = require("moment");
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
      // Virtual field to calculate total hours
      totalHours: {
        type: Sequelize.VIRTUAL,
        get() {
          const clockinTime = this.getDataValue("clockinTime");
          let clockoutTime = this.getDataValue("clockoutTime");

          if (!clockinTime || !clockoutTime) {
            return null;
          }

          const clockinMoment = moment(clockinTime, "HH:mm:ss");
          let clockoutMoment = moment(clockoutTime, "HH:mm:ss");

          // Handle clock out on a different day
          if (clockoutMoment.isBefore(clockinMoment, "day")) {
            clockoutMoment = moment(
              `${this.getDataValue("date")} 23:59:59`,
              "YYYY-MM-DD HH:mm:ss"
            );
          }

          const duration = moment.duration(clockoutMoment.diff(clockinMoment));
          return duration.asHours().toFixed(2);
        },
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
