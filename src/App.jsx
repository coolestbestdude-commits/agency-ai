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

      {/* LEFT STACK */}
      <div className="left">

        <form className="form-card">
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
          <button type="submit">Submit</button>
        </form>

        <form className="form-card">
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
          <button type="submit">Submit</button>
        </form>

      </div>

      {/* CENTER IMAGE */}
      <div className="center-image">
        <img src="/Team.jpg" alt="center" />
      </div>

      {/* RIGHT STACK */}
      <div className="right">

        <form className="form-card">
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
          <button type="submit">Submit</button>
        </form>

        <form className="form-card">
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
          <button type="submit">Submit</button>
        </form>

      </div>

    </div>
  );
}