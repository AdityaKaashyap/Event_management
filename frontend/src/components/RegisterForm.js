import React, { useState, useEffect } from "react";
import api from "../api";

export default function RegisterForm() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [collegeId, setCollegeId] = useState(1);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [msg, setMsg] = useState("");

  // ✅ Fetch events when component mounts
  useEffect(() => {
    api
      .get("/events/")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg("❌ Passwords do not match!");
      return;
    }

    try {
      // Step 1: Register student
      const studentRes = await api.post("/students/", {
        student_id: studentId,
        name,
        email,
        college: collegeId,
        password, // backend must accept this!
      });

      const newStudentId = studentRes.data.id;

      // Step 2: If event is selected, also register for event
      if (selectedEvent) {
        await api.post("/registrations/", {
          student: newStudentId,
          event: selectedEvent,
        });
      }

      setMsg("✅ Student registered successfully" + (selectedEvent ? " and event registered!" : "!"));

      // Reset form
      setStudentId("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCollegeId(1);
      setSelectedEvent("");
    } catch (err) {
      setMsg("❌ Error: " + (err.response?.data?.detail || err.message));
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow p-4" style={{ width: "500px" }}>
        <h3 className="text-center mb-3">Student + Event Registration</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
            >
              <option value="1">College 1</option>
              <option value="2">College 2</option>
              <option value="3">College 3</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">-- Select Event (Optional) --</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  #{ev.id} - {ev.title} ({ev.event_type})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register Student {selectedEvent ? "and Event" : ""}
          </button>
        </form>
        {msg && <div className="alert alert-info mt-3 text-center">{msg}</div>}
      </div>
    </div>
  );
}
