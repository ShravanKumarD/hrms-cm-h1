// src/components/AttendanceList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get("http://localhost:80/api/attendance");
        setAttendances(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendances();
  }, []);

  return (
    <div>
      <h2>Attendance List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.id}</td>
              <td>{attendance.userId}</td>
              <td>{attendance.date}</td>
              <td>{attendance.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
