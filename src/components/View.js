import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dropdownData from './dropdownData.json';

const View = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    FirstName: '',
    LastName: '',
    DOB: null,
    Study: '',
    StartDate: null,
    EndDate: null,
    CurrentSalary: '',
    Description: '',
  });

  useEffect(() => {
    const selectedEmployeeData = JSON.parse(localStorage.getItem('editEmployeeData'));

    if (selectedEmployeeData) {
      const dob = selectedEmployeeData.DOB ? new Date(selectedEmployeeData.DOB) : null;
      const startDate = selectedEmployeeData.StartDate ? new Date(selectedEmployeeData.StartDate) : null;
      const endDate = selectedEmployeeData.EndDate ? new Date(selectedEmployeeData.EndDate) : null;

      setEmployeeData({
        ...selectedEmployeeData,
        DOB: dob,
        StartDate: startDate,
        EndDate: endDate,
      });
      console.log(selectedEmployeeData);
    }
  }, []);


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
      <h1 className="text-center mb-4">Update Employee</h1>
      <div className="col-md-9">
      <div className="card p-4 shadow">
        <form className="mt-3" >
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={employeeData.FirstName}
              />
            </div>
            <div className="col">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={employeeData.LastName}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <div className="input-group">
              <DatePicker
                selected={employeeData.DOB}
                className="form-control w-100"
                placeholderText="Enter your dob"
              />
              <span className="input-group-text">
                <i className="bi bi-calendar"></i>
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Study Field</label>
            <select
              className="form-select"
              value={employeeData.Study}
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
                  selected={employeeData.StartDate}
                  className="form-control"
                  placeholderText="Select start date"
                />
                <span className="input-group-text">
                  <i className="bi bi-calendar"></i>
                </span>
              </div>
            </div>
            <div className="col">
              <label className="form-label">End Date</label>
              <div className="input-group">
                <DatePicker
                  selected={employeeData.EndDate}
                  className="form-control"
                  placeholderText="Select end date"
                />
                <span className="input-group-text">
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
              value={employeeData.CurrentSalary}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter your description"
              value={employeeData.Description}
              style={{ height: '150px' }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/read')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </div>
  )}
  export default View;