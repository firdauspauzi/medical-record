import React, { useState } from "react";
import { useNavigate } from "react-router";


export default function AddRecord() {
  const [form, setForm] = useState({
    name: "",
    ic: "",
    sex:"",
    contact: "",
    doctorsnote: "",
  });
  const navigate = useNavigate();


  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }


  async function onSubmit(e) {
    e.preventDefault();


    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", ic: "", sex:"", contact: "", doctorsnote:"" });

    navigate("/");
  }

  
  return (
    <div>
      <h3>Add New Record</h3>

      <form onSubmit={onSubmit}>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            placeholder="e.g Ali Bin Ahmad"
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ic">IC/Passport No.</label>
          <input
            placeholder="eg 90083015890"
            type="text"
            className="form-control"
            id="ic"
            value={form.ic}
            onChange={(e) => updateForm({ ic: e.target.value })}
          />
        </div>
        
        
        <p>Gender</p>
        <div className="form-group">
          <div className="form-check form-check-inline">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sexOptions"
              id="radioMale"
              value="Male"
              checked={form.sex === "Male"}
              onChange={(e) => updateForm({ sex: e.target.value })}
            />
            <label htmlFor="radioMale" className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sexOptions"
              id="radioFemale"
              value="Female"
              checked={form.sex === "Female"}
              onChange={(e) => updateForm({ sex: e.target.value })}
            />
            <label htmlFor="radioFemale" className="form-check-label">Female</label>
          </div>      
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="contact">Phone No</label>
          <input
            type="number"
            className="form-control"
            id="contact"
            value={form.contact}
            onChange={(e) => updateForm({ contact: e.target.value })}
          />
        </div>


        <div className="form-group">
          <label htmlFor="notes">Doctor's Notes</label>
          <input
            type="text"
            className="form-control"
            id="notes"
            value={form.doctorsnote}
            onChange={(e) => updateForm({ doctorsnote: e.target.value })}
          />
        </div>


        <div className="form-group">
          <input
            type="submit"
            value="Add Record"
            className="btn btn-primary"
          />
        </div>

      </form>

    </div>
  );
}
