import './schedule.css';

export default function Schedule() {
    const simulateSchedules = [
        { name: "CSE_442", date: "2025-05-20", startAt: "09:30", workingHours: 1, userId: "1", roomName: "402B11" }, // Tuesday
        { name: "CSE_441", date: "2025-05-19", startAt: "07:30", workingHours: 2, userId: "1", roomName: "402B11" }, // Monday
        { name: "CSE_443", date: "2025-05-21", startAt: "13:30", workingHours: 2, userId: "1", roomName: "402B11" }, // Wednesday
        { name: "CSE_444", date: "2025-05-23", startAt: "07:30", workingHours: 2, userId: "1", roomName: "402B11" }, // Friday
        { name: "CSE_445", date: "2025-05-24", startAt: "14:30", workingHours: 1, userId: "1", roomName: "402B11" }  // Saturday
    ];

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const timeSlots = [
        "07:30 - 08:30",
        "08:30 - 09:30",
        "09:30 - 10:30",
        "10:30 - 11:30",
        "12:30 - 13:30",
        "13:30 - 14:30",
        "14:30 - 15:30",
        "15:30 - 16:30",
        "17:30 - 18:30"
    ];

    const timeToSlotIndex = (time) => {
        return timeSlots.findIndex(slot => slot.startsWith(time));
    };

    const dateToDayIndex = (dateString) => {
        const day = new Date(dateString).getDay(); // Sunday = 0
        return (day + 6) % 7; // Shift so Monday = 0
    };

    const scheduleMap = {};
    const skipMap = new Set(); // Keys like "row-col" to skip rendering
    const occupiedSlots = new Set(); // Tracks all occupied slots to detect conflicts

    simulateSchedules.forEach(schedule => {
        const col = dateToDayIndex(schedule.date);
        const startRow = timeToSlotIndex(schedule.startAt);
        const rowSpan = schedule.workingHours;
        let conflict = false;

        // Check if any slot is already occupied
        for (let i = 0; i < rowSpan; i++) {
            const key = `${startRow + i}-${col}`;
            if (occupiedSlots.has(key)) {
                console.warn(`Conflict: Task "${schedule.name}" overlaps at ${key}`);
                conflict = true;
                break;
            }
        }

        // If no conflict, mark occupied and update scheduleMap and skipMap
        if (!conflict) {
            const key = `${startRow}-${col}`;
            scheduleMap[key] = {
                name: schedule.name,
                roomName: schedule.roomName,
                rowSpan
            };

            for (let i = 0; i < rowSpan; i++) {
                const slotKey = `${startRow + i}-${col}`;
                occupiedSlots.add(slotKey);
                if (i !== 0) skipMap.add(slotKey); // Skip rendering if part of a rowspan
            }
        }
    });

    return (
        <div style={{ overflowX: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <td className="border">Previous</td>
                        {days.map(day => (
                            <td key={day} className="border">{day}</td>
                        ))}
                        <td className="border">Next</td>
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((timeSlot, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border">{timeSlot}</td>
                            {days.map((_, colIndex) => {
                                const key = `${rowIndex}-${colIndex}`;
                                if (skipMap.has(key)) return null;

                                const schedule = scheduleMap[key];
                                return (
                                    <td
                                        key={colIndex}
                                        className={`border ${schedule ? 'task' : ''}`}
                                        rowSpan={schedule?.rowSpan || 1}
                                        title={schedule ? `${schedule.name} @ ${schedule.roomName}` : ''}
                                    >
                                        {schedule && (
                                            <div>
                                                <div><strong>{schedule.name}</strong></div>
                                                <div style={{ fontSize: '0.85em', color: '#555' }}>{schedule.roomName}</div>
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                            <td className="border">{timeSlot}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
