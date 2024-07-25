// src/components/MarkAttendance.js
import React, { useState } from "react";
import axios from "axios";

const MarkAttendance = () => {
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/api/attendance/mark",
        {
          userId,
          date,
          status,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      alert("Attendance marked successfully");
    } catch (error) {
      console.error(error);
      alert("Error marking attendance");
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
};

export default MarkAttendance;
