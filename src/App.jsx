import { useState } from "react";

export default function App() {
  // Using a relative path allows Vercel to route automatically in production, 
  // and works flawlessly with Vite's proxy or local setups.
  const API_BASE = "/api";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [survey, setSurvey] = useState({
    experience: "",
    source: "", 
    recommend: "",
  });

  // -------------------------
  // CONTACT FORM CHANGE
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("CHANGE FIRED:", name, value);

    const updated = {
      ...form,
      [name]: value,
    };

    if (name === "startTime" && value) {
      const [h, m] = value.split(":");
      const end = new Date();
      end.setHours(Number(h) + 1, Number(m));
      updated.endTime = end.toTimeString().slice(0, 5);
    }

    setForm(updated);
  };

  // -------------------------
  // SURVEY CHANGE
  // -------------------------
  const handleSurveyChange = (e) => {
    const { name, value } = e.target;

    setSurvey((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------
  // CONTACT SUBMIT
  // -------------------------
  const submitContact = async () => {
    try {
      console.log("CONTACT STATE:", form);

      const formattedDate = form.date ? `${form.date} 00:00:00` : null;

      const payload = {
        name: form.name || null,
        email: form.email || null,
        phone: form.phone || null,
        appointment_date: formattedDate,
        start_time: form.startTime || null,
        end_time: form.endTime || null,
      };

      console.log("FINAL CONTACT PAYLOAD:", payload);

      const response = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Contact failed");

      alert("Appointment saved successfully!");
      
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        startTime: "",
        endTime: "",
      });
    } catch (err) {
      console.error("CONTACT ERROR:", err);
      alert("Error saving appointment. Check console.");
    }
  };

  // -------------------------
  // SURVEY SUBMIT
  // -------------------------
  const submitSurvey = async () => {
    try {
      console.log("SURVEY STATE:", survey);

      const payload = {
        experience: survey.experience,
        source: survey.source, 
        recommend: survey.recommend,
      };

      console.log("FINAL SURVEY PAYLOAD:", payload);

      const response = await fetch(`${API_BASE}/surveys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Survey failed");
      }

      alert("Survey submitted successfully!");

      setSurvey({
        experience: "",
        source: "",
        recommend: "",
      });
    } catch (err) {
      console.error("SURVEY ERROR:", err);
      alert("Error submitting survey. Check console.");
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="page">
      <div className="image-label">MM in the area</div>

      {/* CONTACT */}
      <div className="left">
        <div className="form-card">
          <h2>Book Appointment</h2>

          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

          <input type="date" name="date" value={form.date} onChange={handleChange} />

          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} />

          <input type="time" name="endTime" value={form.endTime} readOnly />

          <button onClick={submitContact}>Submit Appointment</button>
        </div>
      </div>

      {/* SURVEY */}
      <div className="right">
        <div className="form-card">
          <h2>Customer Survey</h2>

          <input
            name="experience"
            value={survey.experience}
            onChange={handleSurveyChange}
            placeholder="Experience"
          />

          <input
            name="source" 
            value={survey.source}
            onChange={handleSurveyChange}
            placeholder="How did you find us?"
          />

          <input
            name="recommend"
            value={survey.recommend}
            onChange={handleSurveyChange}
            placeholder="Recommend?"
          />

          <button onClick={submitSurvey}>Submit Survey</button>
        </div>
      </div>
    </div>
  );
}