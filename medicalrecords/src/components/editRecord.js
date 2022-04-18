import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditRecord() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex:"",
    contact: "",
    doctorsnote: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

 
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      ic: form.ic,
      sex: form.sex,
      contact: form.contact,
      doctorsnote: form.doctorsnote,
    };

  
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }


  return (
    <div>
      <h3>Update Record</h3>
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
            type="text"
            className="form-control"
            id="ic"
            value={form.ic}
            onChange={(e) => updateForm({ ic: e.target.value })}
          />
        </div>
        
        

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
          <label htmlFor="contact">Contact</label>
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
