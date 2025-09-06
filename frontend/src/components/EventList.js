import React, { useEffect, useState } from "react";
import api from "../api";
import AttendanceButton from "./AttendanceButton";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    api.get("/events/")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  // ✅ Filtered events based on search and filter type
  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || e.event_type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      {/* Hero Section */}
      <div
        className="p-5 mb-4 bg-dark text-white rounded-3"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x400/?college,students')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Welcome to Campus Events 🎉</h1>
          <p className="col-md-8 fs-4">
            Discover workshops, hackathons, seminars, and cultural fests happening in your college.
            Register now and don’t miss out!
          </p>
        </div>
      </div>

      <div className="container">
        <h2 className="mb-4 text-center">Upcoming Events</h2>

        {/* Search + Filter Controls */}
        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-2">
            <select
              className="form-select"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="workshop">Workshop</option>
              <option value="hackathon">Hackathon</option>
              <option value="seminar">Seminar</option>
              <option value="fest">Fest</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="alert alert-warning text-center">
            No matching events found. Try another search or filter.
          </div>
        ) : (
          <div className="row">
            {filteredEvents.map(e => (
              <div className="col-md-4 mb-4" key={e.id}>
                <div className="card h-100 shadow-sm">
                  {/* Event Image */}
                  <img
                    src={`https://source.unsplash.com/400x200/?${e.event_type},students`}
                    className="card-img-top"
                    alt={e.title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      #{e.id} - {e.title}
                    </h5>
                    <span className="badge bg-info mb-2">{e.event_type}</span>
                    <p className="card-text flex-grow-1">
                      {e.description || "No description available."}
                    </p>
                    <small className="text-muted">
                      {new Date(e.start_time).toLocaleString()} →{" "}
                      {new Date(e.end_time).toLocaleString()}
                    </small>
                    <div className="mt-3">
                      <AttendanceButton eventId={e.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
