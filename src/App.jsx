import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page">
      <div className="left">
        <div className="card-row">
          <div className="form-card">
            <h2>Contact Us</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <button>Submit</button>
          </div>
        </div>
      </div>

      <div className="center-image">
        <div className="image-label">MM in the area</div>
      </div>

      <div className="right">
        <div className="card-row">
          <div className="form-card">
            <h2>Contact Us</h2>
            <input placeholder="Name" />
            <input placeholder="Email" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}