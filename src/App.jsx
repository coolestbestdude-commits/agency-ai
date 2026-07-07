import { useState } from "react";
import Navbar from "./components/Navbar";

export default function App() {
  const API_BASE = "http://localhost:5000/api";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    startTime: "",
  });

  const [survey, setSurvey] = useState({
    experience: "",
    source: "",
    recommend: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSurveyChange = (e) => {
    const { name, value } = e.target;
    setSurvey((prev) => ({ ...prev, [name]: value }));
  };

  const submitContact = async () => {
    try {
      const formattedDate = form.date || null;

      let endTime = null;
      if (form.startTime) {
        const [h, m] = form.startTime.split(":");
        const end = new Date();
        end.setHours(Number(h) + 1, Number(m));
        endTime = end.toTimeString().slice(0, 5);
      }

      const payload = {
        name: form.name || null,
        email: form.email || null,
        phone: form.phone || null,
        appointment_date: formattedDate,
        start_time: form.startTime || null,
        end_time: endTime,
      };

      const response = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      });
    } catch (err) {
      console.error("CONTACT ERROR:", err);
      alert("Error saving appointment. Check console.");
    }
  };

  const submitSurvey = async () => {
    try {
      const payload = {
        experience: survey.experience,
        source: survey.source,
        recommend: survey.recommend,
      };

      const response = await fetch(`${API_BASE}/surveys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Survey failed");

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

  const endTime = form.startTime
    ? (() => {
        const [h, m] = form.startTime.split(":");
        const end = new Date();
        end.setHours(Number(h) + 1, Number(m));
        return end.toTimeString().slice(0, 5);
      })()
    : "";

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />

      {/* BACKGROUND IMAGE SECTION */}
      <div
        className="flex-1 bg-cover bg-center bg-no-repeat flex flex-col items-center"
        style={{
        backgroundImage: "url('/Team2.jpg')",
        height: "75vh",
       }}
         >
        {/* TITLE */}
        <h1
          className="mt-6 text-6xl font-bold text-transparent bg-clip-text drop-shadow-xl z-50"
          style={{
            fontFamily: "'Pacifico', cursive",
            backgroundImage:
              "linear-gradient(90deg, #d4af37 0%, #ff8c00 50%, #ff3cac 100%)",
          }}
        >
          MM in the Table View area
        </h1>

        {/* FORMS */}
        <div
          className="flex flex-row justify-between w-full"
          style={{ paddingLeft: "2cm", paddingRight: "4cm", marginBottom: "2cm" }}
        >
          {/* Appointment Form */}
          <div
          className="form-card appointment-card w-80 rounded-lg shadow-lg space-y-3"
          style={{ marginTop: "15.5rem" }}
            >

            <h2 className="text-xl font-semibold">Book Appointment</h2>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

            <input type="date" name="date" value={form.date} onChange={handleChange} />
            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} />

            <label className="mt-2 block" style={{ color: "#000" }}>
            End Time (Auto)
            </label>


            <input type="time" value={endTime} readOnly />

            <button onClick={submitContact}>Submit Appointment</button>
          </div>

          {/* Survey Form */}
          <div
            className="form-card survey-card w-80 rounded-lg shadow-lg"
            style={{ marginTop: "30.5rem" }}
             >

            <h2 className="text-xl font-semibold">Customer Survey</h2>

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
    </div>
  );
}
