import React from "react";
import api from "../api";

export default function AttendanceButton({ eventId }) {
  async function markAttendance() {
    try {
      // Here you’d normally look up the student’s registration
      // For demo, we assume student with id=1 is registered
      const regRes = await api.post("/registrations/", { student: 1, event: eventId });
      const regId = regRes.data.id;

      await api.post("/attendances/", { registration: regId });
      alert(`✅ Attendance marked for event ${eventId}`);
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  }

  return (
    <button className="btn btn-outline-secondary btn-sm" onClick={markAttendance}>
      Mark Attendance
    </button>
  );
}
