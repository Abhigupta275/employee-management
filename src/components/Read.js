import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function Read() {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://sweede.app/DeliveryBoy/Get-Employee/')
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleEdit = (employee) => {
    localStorage.setItem('editEmployeeData', JSON.stringify(employee));
    navigate(`/update/${employee.id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`)
      .then((response) => {
        if (response.status === 204) {
          setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id));
        }
        console.log("feleted");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='container mt-4'>
      <h3>Employee List</h3>
      <div className="mt-5">
        <div style={{ border: "1px solid #000", borderRadius: "20px", textAlign: 'center' }}  className="table-responsive">
           <table className="table table-bordered rounded">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.FirstName} {employee.LastName}</td>
                  <td>{employee.DOB}</td>
                  <td>{employee.StartDate}</td>
                  <td>{employee.EndDate}</td>
                  <td>{employee.Description}
                    <div className="dropdown float-end">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${employee.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ border: "none", backgroundColor: "transparent", color: "black" }} 
                      >
                        {/* <i className="bi bi-three-dots"></i> */}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${employee.id}`}>
                        <li><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faEye} /> View</a></li>
                        <li><button className="dropdown-item" onClick={() => handleEdit(employee)}><FontAwesomeIcon icon={faEdit} /> Edit</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDelete(employee.id)}><FontAwesomeIcon icon={faTrash} /> Delete</button></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Read;
