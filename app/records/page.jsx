"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'

const MedicalRecordsPage = () => {


  const { data: session } = useSession()
  console.log(session)

  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    userId: "",
    name: "",
    document: null,
  });


  useEffect(() => {
    setNewRecord({
      userId: session?.user?.id,
    })
  }, [session])


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setNewRecord({ ...newRecord, document: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      userId: newRecord.userId,
      name: newRecord.name,
      document: newRecord.document,
    };

    try {

      const response = await fetch('/api/records/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response.data)
      if (response.ok) {
        const createdRecord = await response.json();
        setRecords([...records, createdRecord]);
        setNewRecord({ userId: '', name: '', document: null });
      } 
      else {
        console.error('Failed to create a new record');
      }
    } catch (error) {
      console.error('Failed to create a new record', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Medical Records</h1>

      <div className="records-list">
        <h2 className="section-title">Existing Records</h2>
        <ul>
          {records.map((record) => (
            <li key={record._id} className="record-item">
              <span>{record.name}</span>
              <span>{record.date}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-record">
        <h2 className="section-title">Add New Record</h2>
        <form className="record-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">User ID:</label>
            <input
              className="form-input"
              type="text"
              name="userId"
              value={newRecord.userId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Name:</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={newRecord.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Document:</label>
            <input
              className="form-input"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              required
            />
          </div>

          <button className="btn" type="submit">
            Add Record  
          </button>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
