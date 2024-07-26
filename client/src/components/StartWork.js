import React, { useState, useEffect } from "react";
import axios from "axios";

const StartWork = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isMounted) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    };

    fetchUserLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStart = async () => {
    const start = new Date();
    setStartTime(start);
    setIsStarted(true);

    try {
      const response = await axios.post(
        "http://localhost:80/api/attendance/mark",
        {
          userId,
          date,
          status,
          clockinTime: start.toISOString(),
          latitude,
          longitude,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      localStorage.setItem("attendanceId", response.data.attendanceId); // Assuming the response contains the attendanceId
    } catch (error) {
      console.error("There was an error marking the start time!", error);
    }
  };

  const handleEnd = async () => {
    const end = new Date();
    setEndTime(end);
    setIsStarted(false);

    try {
      const response = await axios.put(
        `http://localhost:80/api/attendance/update/${localStorage.getItem(
          "attendanceId"
        )}`,
        {
          clockoutTime: end.toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error marking the end time!", error);
    }
  };

  return (
    <div>
      <h2>Start Work</h2>
      <div>
        <h3>Current Time: {currentTime.toLocaleTimeString()}</h3>
      </div>
      <div>
        {!isStarted ? (
          <button onClick={handleStart}>Start Work</button>
        ) : (
          <button onClick={handleEnd}>End Work</button>
        )}
      </div>
      {startTime && (
        <div>
          <h4>Work started at: {startTime.toLocaleTimeString()}</h4>
        </div>
      )}
      {endTime && (
        <div>
          <h4>Work ended at: {endTime.toLocaleTimeString()}</h4>
        </div>
      )}
      <Timeline isStarted={isStarted} startTime={startTime} />
    </div>
  );
};

const Timeline = ({ isStarted, startTime }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;

    if (isStarted && startTime) {
      const interval = setInterval(() => {
        if (isMounted) {
          const now = new Date();
          const elapsed = now - new Date(startTime);
          const percent = (elapsed / (1000 * 60 * 60 * 8)) * 100; // 8 hours work day
          setProgress(Math.min(percent, 100));
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        isMounted = false;
      };
    }
  }, [isStarted, startTime]);

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "#ddd",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: progress === 100 ? "green" : "orange",
          }}
        ></div>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {progress === 100 ? "Full Day" : `${Math.floor(progress)}% Completed`}
      </div>
    </div>
  );
};

export default StartWork;
