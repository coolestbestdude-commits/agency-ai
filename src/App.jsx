import { useState } from "react";

export default function App() {

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
    foundUs: "",
    recommend: "",
  });



  const handleChange = (e) => {

    const { name, value } = e.target;

    let updatedForm = {
      ...form,
      [name]: value,
    };


    // Add exactly 1 hour
    if (name === "startTime" && value) {

      const [hours, minutes] = value.split(":");

      const end = new Date();

      end.setHours(
        Number(hours) + 1,
        Number(minutes)
      );


      updatedForm.endTime =
        end.toTimeString().substring(0, 5);
    }


    setForm(updatedForm);
  };



  const handleSurveyChange = (e) => {

    setSurvey({
      ...survey,
      [e.target.name]: e.target.value,
    });

  };



  const submitContact = async () => {

    try {

      const response = await fetch(
        "http://localhost:4000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );


      const data = await response.json();


      if (response.ok) {

        alert(data.message);


        setForm({
          name: "",
          email: "",
          phone: "",
          date: "",
          startTime: "",
          endTime: "",
        });


      } else {

        alert("Database error");

      }


    } catch (error) {

      console.error(error);
      alert("Cannot connect to API");

    }

  };




  const submitSurvey = async () => {

    try {

      const response = await fetch(
        "http://localhost:4000/api/survey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(survey),

        }
      );


      const data = await response.json();


      if (response.ok) {

        alert(data.message);


        setSurvey({
          experience: "",
          foundUs: "",
          recommend: "",
        });


      } else {

        alert("Survey database error");

      }


    } catch(error) {

      console.error(error);
      alert("Survey API connection failed");

    }

  };



  return (

    <div className="page">


      <div className="left">

        <div className="card-row">

          <div className="form-card">


            <h2>Book an Appointment</h2>


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


            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Contact Number"
            />


            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />



            <label>
              Start Time
            </label>


            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
            />



            <label>
              End Time (1 hour)
            </label>


            <input
              type="time"
              name="endTime"
              value={form.endTime}
              readOnly
            />



            <button onClick={submitContact}>
              Submit Appointment
            </button>


          </div>

        </div>

      </div>




      <div className="center-image">

        <div className="image-label">
          MM in the area
        </div>

      </div>





      <div className="right">

        <div className="card-row">

          <div className="form-card">


            <h2>Customer Survey</h2>



            <input
              name="experience"
              value={survey.experience}
              onChange={handleSurveyChange}
              placeholder="How was your experience?"
            />



            <input
              name="foundUs"
              value={survey.foundUs}
              onChange={handleSurveyChange}
              placeholder="How did you find us?"
            />



            <input
              name="recommend"
              value={survey.recommend}
              onChange={handleSurveyChange}
              placeholder="Would you recommend us?"
            />



            <button onClick={submitSurvey}>
              Submit Survey
            </button>


          </div>

        </div>

      </div>


    </div>

  );

}