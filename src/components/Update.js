import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dropdownData from './dropdownData.json';

const Update = () => {
  const { id } = useParams();
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formattedStartDate = employeeData.StartDate
      ? employeeData.StartDate.toISOString().split('T')[0]
      : null;
    const formattedEndDate = employeeData.EndDate
      ? employeeData.EndDate.toISOString().split('T')[0]
      : null;
    const formattedDob = employeeData.DOB
      ? employeeData.DOB.toISOString().split('T')[0]
      : null;

    const dataToSend = {
      Id: id,
      FirstName: employeeData.FirstName,
      LastName: employeeData.LastName,
      DOB: formattedDob,
      Study: employeeData.Study,
      StartDate: formattedStartDate,
      EndDate: formattedEndDate,
      CurrentSalary: employeeData.CurrentSalary,
      Description: employeeData.Description,
    };

    try {
      const response = await axios.post(
        `https://sweede.app/DeliveryBoy/update-Employee/${id}`,
        dataToSend
      );

      if (response.status === 200) {
        navigate('/read'); 
      } else {
        console.error('API Response:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
      <h1 className="text-center mb-4">Update Employee</h1>
      <div className="col-md-9">
      <div className="card p-4 shadow">
        <form className="mt-3" onSubmit={handleUpdate}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={employeeData.FirstName}
                onChange={(e) =>
                  setEmployeeData({
                    ...employeeData,
                    FirstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="col">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={employeeData.LastName}
                onChange={(e) =>
                  setEmployeeData({
                    ...employeeData,
                    LastName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <div className="input-group">
              <DatePicker
                selected={employeeData.DOB}
                onChange={(date) =>
                  setEmployeeData({
                    ...employeeData,
                    DOB: date,
                  })
                }
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
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  Study: e.target.value,
                })
              }
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
                  onChange={(date) =>
                    setEmployeeData({
                      ...employeeData,
                      StartDate: date,
                    })
                  }
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
                  onChange={(date) =>
                    setEmployeeData({
                      ...employeeData,
                      EndDate: date,
                    })
                  }
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
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  CurrentSalary: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter your description"
              value={employeeData.Description}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  Description: e.target.value,
                })
              }
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </div>
  )}
  export default Update;