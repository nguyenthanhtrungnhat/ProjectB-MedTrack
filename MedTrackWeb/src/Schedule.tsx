import React, { useState, useEffect } from "react";
import axios from "axios";
import "./schedule.css";

type ScheduleItem = {
  scheduleID: number;
  subject: string;
  date: string;
  start_at: string;
  working_hours: number;
  roomID: number;
  room_location: string;
};

// Robust type guard
const isScheduleArray = (data: any): data is ScheduleItem[] => {
  if (!Array.isArray(data)) return false;
  for (const item of data) {
    if (typeof item !== "object" || item === null) return false;
    if (typeof item.scheduleID !== "number") return false;
    if (typeof item.subject !== "string") return false;
    if (typeof item.date !== "string") return false;
    if (typeof item.start_at !== "string") return false;
    if (typeof item.working_hours !== "number") return false;
    if (typeof item.roomID !== "number") return false;
    if (typeof item.room_location !== "string") return false;
  }
  return true;
};

// Generate a light random color
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 156 + 100); // 100–255
  const g = Math.floor(Math.random() * 156 + 100);
  const b = Math.floor(Math.random() * 156 + 100);
  return `rgb(${r},${g},${b})`;
};

export default function Schedule() {
  const nurseID = sessionStorage.getItem("nurseID");
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timeSlots = [
    "07:30",
    "08:30",
    "09:30",
    "10:30",
    "12:30",
    "13:30",
    "14:30",
    "15:30",
    "17:30",
  ];

  const getWeekStart = (date: Date) => {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    const day = copy.getDay(); 
    const diff = (day === 0 ? -6 : 1) - day;
    copy.setDate(copy.getDate() + diff);
    return copy;
  };

  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));

  const fetchSchedules = () => {
    if (!nurseID) {
      setError("No nurse ID found in sessionStorage");
      return;
    }

    axios
      .get(`http://localhost:3000/api/schedules/${nurseID}`)
      .then((res) => {
        const data = res.data;
        if (isScheduleArray(data)) {
          setSchedules(data);
          setError(null);
        } else {
          setSchedules([]);
          setError("Invalid schedule data received from server");
          console.warn("API response is not valid ScheduleItem[]:", data);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load schedules");
        setSchedules([]);
      });
  };

  useEffect(() => {
    fetchSchedules();
  }, [nurseID]);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const filteredSchedules = schedules.filter((s) => {
    const schedDate = new Date(s.date);
    const start = new Date(weekStart);
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    return schedDate >= start && schedDate <= end;
  });

  const goPrevWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() - 7);
    setWeekStart(newStart);
  };

  const goNextWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + 7);
    setWeekStart(newStart);
  };

  const goCurrentWeek = () => setWeekStart(getWeekStart(new Date()));

  const getDateOfWeekday = (weekdayIndex: number) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + weekdayIndex);
    return formatDate(date);
  };

  // Return all schedules for a given date and time
  const findSchedules = (date: string, time: string) =>
    filteredSchedules.filter(
      (s) => formatDate(new Date(s.date)) === date && s.start_at.startsWith(time)
    );

  return (
    <div className="p-3 main-content">
      <div className="mb-3 d-flex gap-2">
        <button onClick={goPrevWeek} className="btn btn-outline-primary btn-sm">
          Previous Week
        </button>
        <button onClick={goNextWeek} className="btn btn-outline-primary btn-sm">
          Next Week
        </button>
        <button onClick={goCurrentWeek} className="btn btn-outline-success btn-sm">
          This Week
        </button>
        <div className="ms-3 mt-1">
          <strong>Week:</strong>{" "}
          {formatDate(weekStart)} -{" "}
          {formatDate(new Date(weekStart.getTime() + 6 * 86400000))}
        </div>
      </div>

      {error && <div className="text-danger mb-3">Error: {error}</div>}

      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>Time / Day</th>
            {days.map((day, i) => (
              <th key={i}>
                {day} <br />
                <small>{getDateOfWeekday(i)}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIdx) => (
            <tr key={rowIdx}>
              <td>{slot}</td>
              {days.map((_, colIdx) => {
                const date = getDateOfWeekday(colIdx);
                const scheds = findSchedules(date, slot);

                return (
                  <td
                    key={colIdx}
                    style={scheds.length ? { backgroundColor: "#d0f0ff", verticalAlign: "top" } : undefined}
                  >
                    {scheds.length > 0 ? (
                      <div className="d-flex flex-column gap-1">
                        {scheds.map((s) => (
                          <div
                            key={s.scheduleID}
                            className="border p-1 rounded"
                            style={{ backgroundColor: getRandomColor() }}
                          >
                            <strong>{s.subject}</strong>
                            <br />
                            {s.room_location}
                            <br />
                            Room {s.roomID}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
