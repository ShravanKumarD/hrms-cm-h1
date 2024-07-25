import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "../AttendanceList.css"; // Import the CSS file

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/attendance/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAttendances(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendances();
  }, [userId]);

  const events = attendances.map((attendance) => ({
    title: attendance.status,
    start: moment(attendance.date).format("YYYY-MM-DD"),
    className: attendance.status === "Present" ? "present" : "absent",
  }));

  return (
    <div>
      <h2>Attendance Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default AttendanceList;
