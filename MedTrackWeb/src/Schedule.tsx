import React, { useState, useEffect } from 'react';
import './schedule.css';

export default function Schedule() {
  const simulateSchedules = [
    { name: "CSE_442", date: "2025-06-20", startAt: "09:30", workingHours: 1, userId: "1", roomName: "402B11" },
    { name: "CSE_441", date: "2025-06-19", startAt: "07:30", workingHours: 2, userId: "1", roomName: "402B11" },
    { name: "CSE_443", date: "2025-06-21", startAt: "13:30", workingHours: 2, userId: "1", roomName: "402B11" },
    { name: "CSE_444", date: "2025-06-23", startAt: "07:30", workingHours: 2, userId: "1", roomName: "402B11" },
    { name: "CSE_445", date: "2025-06-24", startAt: "14:30", workingHours: 1, userId: "1", roomName: "402B11" }
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = [
    "07:30 - 08:30", "08:30 - 09:30", "09:30 - 10:30", "10:30 - 11:30",
    "12:30 - 13:30", "13:30 - 14:30", "14:30 - 15:30", "15:30 - 16:30", "17:30 - 18:30"
  ];

  const getWeekStartDate = (input: string | Date) => {
    const date = new Date(input);
    const day = date.getDay(); // Sunday=0 ... Saturday=6
    const diff = (day + 6) % 7; // Monday=0 ... Sunday=6
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const formatWeekLabel = (monday: Date) => {
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return `${monday.toLocaleDateString('vi-VN')} - ${sunday.toLocaleDateString('vi-VN')}`;
  };

  const getWeeksOfYear = (year: number) => {
    const weeks = [];
    let date = new Date(year, 0, 1);
    date = getWeekStartDate(date);

    while (date.getFullYear() === year || (date.getFullYear() === year - 1 && date.getMonth() === 11)) {
      weeks.push({ key: date.toISOString().split('T')[0], label: formatWeekLabel(date) });
      date = new Date(date);
      date.setDate(date.getDate() + 7);
    }
    return weeks;
  };

  const findWeekIndexByKey = (weeks: { key: string; label: string }[], key: string) => {
    return weeks.findIndex(w => w.key === key);
  };

  const [year, setYear] = useState(2025);
  const [allWeeks, setAllWeeks] = useState(() => getWeeksOfYear(2025));
  const todayWeekKey = getWeekStartDate(new Date()).toISOString().split('T')[0];
  const initialWeekIndex = findWeekIndexByKey(allWeeks, todayWeekKey);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(
    initialWeekIndex !== -1 ? initialWeekIndex : 0
  );

  useEffect(() => {
    const weeks = getWeeksOfYear(year);
    setAllWeeks(weeks);

    if (year === new Date().getFullYear()) {
      const currentWeekKey = getWeekStartDate(new Date()).toISOString().split('T')[0];
      const index = findWeekIndexByKey(weeks, currentWeekKey);
      setSelectedWeekIndex(index !== -1 ? index : 0);
    } else {
      setSelectedWeekIndex(0);
    }
  }, [year]);

  const selectedWeek = allWeeks[selectedWeekIndex]?.key;

  const getWeekString = (dateStr: string) => getWeekStartDate(dateStr).toISOString().split('T')[0];

  const filteredSchedules = simulateSchedules.filter(s => getWeekString(s.date) === selectedWeek);

  const timeToSlotIndex = (time: string) => timeSlots.findIndex(slot => slot.startsWith(time));
  const dateToDayIndex = (dateStr: string) => (new Date(dateStr).getDay() + 6) % 7;

  const scheduleMap: Record<string, { name: string, roomName: string, rowSpan: number }> = {};
  const skipMap = new Set<string>();
  const occupiedSlots = new Set<string>();

  filteredSchedules.forEach(schedule => {
    const col = dateToDayIndex(schedule.date);
    const startRow = timeToSlotIndex(schedule.startAt);
    const rowSpan = schedule.workingHours;

    let conflict = false;
    for (let i = 0; i < rowSpan; i++) {
      if (occupiedSlots.has(`${startRow + i}-${col}`)) {
        conflict = true;
        break;
      }
    }

    if (!conflict) {
      scheduleMap[`${startRow}-${col}`] = { name: schedule.name, roomName: schedule.roomName, rowSpan };
      for (let i = 0; i < rowSpan; i++) {
        const key = `${startRow + i}-${col}`;
        occupiedSlots.add(key);
        if (i > 0) skipMap.add(key);
      }
    }
  });

  // Handlers for Prev / Next week buttons
  const goPrevWeek = () => {
    if (selectedWeekIndex > 0) setSelectedWeekIndex(selectedWeekIndex - 1);
  };
  const goNextWeek = () => {
    if (selectedWeekIndex < allWeeks.length - 1) setSelectedWeekIndex(selectedWeekIndex + 1);
  };

  return (
    <div className="p-3 overflow-auto main-content">
      <div className="mb-3 d-flex align-items-center gap-3 flex-wrap">
        <label htmlFor="yearSelect" className="fw-semibold mb-0">Chọn năm:</label>
        <select
          id="yearSelect"
          className="form-select form-select-sm w-auto"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        >
          {[2024, 2025, 2026].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <label htmlFor="weekSelect" className="fw-semibold mb-0 ms-3">Chọn tuần:</label>
        <select
          id="weekSelect"
          className="form-select form-select-sm w-auto"
          value={selectedWeekIndex}
          onChange={e => setSelectedWeekIndex(Number(e.target.value))}
        >
          {allWeeks.map((w, i) => (
            <option key={w.key} value={i}>{w.label}</option>
          ))}
        </select>

        {/* New Previous and Next buttons */}
        <button
          className="btn btn-outline-primary btn-sm ms-3"
          onClick={goPrevWeek}
          disabled={selectedWeekIndex === 0}
        >
          Previous Week
        </button>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={goNextWeek}
          disabled={selectedWeekIndex === allWeeks.length - 1}
        >
          Next Week
        </button>
      </div>

      <div className="mb-3">
        <strong>Tuần hiện tại:</strong> {selectedWeek ? formatWeekLabel(new Date(selectedWeek)) : "N/A"}
      </div>

      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th scope="col" style={{ minWidth: '140px' }}>Giờ / Ngày</th>
            {days.map(day => (
              <th scope="col" key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row" className="align-middle">{slot}</th>
              {days.map((_, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                if (skipMap.has(key)) return null;
                const schedule = scheduleMap[key];
                return (
                  <td
                    key={colIndex}
                    rowSpan={schedule?.rowSpan || 1}
                    title={schedule ? `${schedule.name} @ ${schedule.roomName}` : ''}
                    className={schedule ? 'table-primary fw-semibold' : ''}
                    style={{ cursor: schedule ? 'pointer' : 'default' }}
                  >
                    {schedule && (
                      <>
                        <div>{schedule.name}</div>
                        <div className="text-muted small">{schedule.roomName}</div>
                      </>
                    )}
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
