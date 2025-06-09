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

// Robust type guard to verify schedule data shape
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

export default function Schedule() {
  const nurseID = sessionStorage.getItem("nurseID");
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
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
    // Set Monday as first day of week
    copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7));
    return copy;
  };

  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));

  // Fetch schedules from API and validate response
  const fetchSchedules = () => {
    if (!nurseID) {
      setError("No nurse ID found in sessionStorage");
      return;
    }

    axios
      .get(`http://26.184.100.176:3000/api/schedules/${nurseID}`)
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

  // Filter schedules within the current week
  const filteredSchedules = schedules.filter((s) => {
    const schedDate = new Date(s.date);
    const start = new Date(weekStart);
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    // Normalize to dates only
    return schedDate >= start && schedDate <= end;
  });

  // Navigation handlers
  const goPrevWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() - 7);
    setWeekStart(newStart);
  };

  const goNextWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() + 7);
    setWeekStart(newStart);
  };

  const goCurrentWeek = () => setWeekStart(getWeekStart(new Date()));

  // Get date string of week day for headers and lookup
  const getDateOfWeekday = (weekdayIndex: number) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + weekdayIndex);
    return formatDate(date);
  };

  // Find a schedule matching a date and time slot
  const findSchedule = (date: string, time: string) =>
    filteredSchedules.find(
      (s) =>
        formatDate(new Date(s.date)) === date && s.start_at.startsWith(time)
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
                const sched = findSchedule(date, slot);
                // Add a class or style to highlight
                const cellStyle = sched
                  ? { backgroundColor: "lightblue" } // Light green background for tasks
                  : undefined;

                return (
                  <td key={colIdx} style={cellStyle}>
                    {sched ? (
                      <div>
                        <strong>{sched.subject}</strong>
                        <br />
                        {sched.room_location}
                        <br />
                        Room {sched.roomID}
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
