import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.ic}</td>
    <td>{props.record.sex}</td>
    <td>{props.record.contact}</td>
    <td>{props.record.doctorsnote}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function Display() {
  const [records, setRecords] = useState([]);

  
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);


  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }


  return (
    <div>
      <h3>Patient's List</h3>
      <table className="table table-striped table-dark" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>IC/Passport No.</th>
            <th>Sex</th>
            <th>Contacts</th>
            <th>Doctor's Note</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
