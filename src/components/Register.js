import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dropdownData from './dropdownData.json';


export default function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDOB] = useState(null);
  const datePickerRef = useRef(null);
  const [selectedStudyField, setSelectedStudyField] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate()

  const handleDOBChange = (date) => {
    setDOB(date);
  };


  const handleStudyFieldChange = (e) => {
    setSelectedStudyField(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancel = () => {
    console.log("clicked");
    setFirstname('');
    setLastname('');
    setDOB(null);
    setSelectedStudyField('');
    setStartDate(null);
    setEndDate(null);
    setSalary('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
    const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
    const formattedDob = dob ? dob.toISOString().split('T')[0] : null;


    const dataToSend = {
      FirstName: firstname,
      LastName: lastname,
      DOB: formattedDob,
      Study: selectedStudyField,
      StartDate: formattedStartDate,
      EndDate: formattedEndDate,
      CurrentSalary: salary,
      Description: description,
    };

    try {
      const response = await axios.post(
        'https://sweede.app/DeliveryBoy/Add-Employee/',
        dataToSend
      );
      if (response.status === 201) {
        navigate('/read')
      } else {
        console.error('API Response:', response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('No Response from Server');
      } else {
        console.error('Error:', error.message);
      }
    }
    
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <h1 className="text-center mb-4">Employee Registration Form</h1>
        <div className="col-md-9">
          <div className="card p-4 shadow">
            <form className="mt-3" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    value={lastname}
                    className="form-control"
                    placeholder="Enter your name"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <div className="input-group">
                  <DatePicker
                    selected={dob}
                    onChange={handleDOBChange}
                    className="form-control w-100"
                    placeholderText="Enter your dob"
                    ref={datePickerRef}
                    style={{cursor: "pointer"}}
                  />
                  <span style={{cursor: "pointer"}} className="input-group-text">
                    <i className="bi bi-calendar"></i>
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Study Field</label>
                <select
                  className="form-select"
                  value={selectedStudyField}
                  onChange={handleStudyFieldChange}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select your study field</option>
                  {dropdownData.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Start Date</label>
                  <div className="input-group">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="form-control"
                      placeholderText="Select start date"
                      ref={startDatePickerRef}
                      style={{cursor: "pointer"}}
                    />
                    <span style={{cursor: "pointer"}} className="input-group-text">
                      <i className="bi bi-calendar"></i>
                    </span>
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">End Date</label>
                  <div className="input-group">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="form-control"
                      placeholderText="Select end date"
                      ref={endDatePickerRef}
                      style={{cursor: "pointer"}}
                    />
                    <span style={{cursor: "pointer"}} className="input-group-text">
                      <i className="bi bi-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your salary"
                  value={salary}
                  onChange={handleSalaryChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Enter your description"
                  value={description}
                  onChange={handleDescriptionChange}
                  style={{ height: '150px' }}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
