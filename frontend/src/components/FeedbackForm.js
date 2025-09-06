import React, { useState, useEffect } from "react";
import api from "../api";

export default function FeedbackForm() {
  const [regId, setRegId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [feedbacks, setFeedbacks] = useState([]); // Store previous feedbacks

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await api.get("/feedbacks/");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    }
    fetchFeedbacks();
  }, []);

  async function submitFeedback(e) {
    e.preventDefault();
    try {
      const res = await api.post("/feedbacks/", {
        registration: Number(regId),
        rating: Number(rating),
        comment,
      });
      setMsg("✅ Feedback submitted");
      setFeedbacks(prev => [...prev, res.data]);
      setRegId("");
      setRating(5);
      setComment("");
    } catch (err) {
      setMsg("❌ Error: " + err.message);
    }
  }

  return (
    <div>
      <h2 className="mb-3">Submit Feedback</h2>
      <form onSubmit={submitFeedback}>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Registration ID"
            value={regId}
            onChange={e => setRegId(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            min="1"
            max="5"
            className="form-control"
            value={rating}
            onChange={e => setRating(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-warning">Submit Feedback</button>
      </form>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}

      <h3 className="mt-4">Previous Feedbacks</h3>
      {feedbacks.length === 0 ? (
        <p>No feedbacks yet.</p>
      ) : (
        <ul className="list-group">
          {feedbacks.map((fb) => (
            <li key={fb.id} className="list-group-item">
              <strong>Student:</strong> {fb.student_name || fb.student?.username} | 
              <strong> Reg ID:</strong> {fb.registration} | 
              <strong> Rating:</strong> {fb.rating} | 
              <strong> Comment:</strong> {fb.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
