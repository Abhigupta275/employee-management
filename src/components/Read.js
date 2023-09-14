import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Read = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get('https://sweede.app/DeliveryBoy/Get-Employee/')
  .then((response) => {
    // Handle successful response
    setEmployeeData(response.data);
  })
  .catch((error) => {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      console.error('No Response from Server');
    } else {
      console.error('Error:', error.message);
    }
  });
  }
  const handleEdit = (employee) => {
    localStorage.setItem('editEmployeeData', JSON.stringify(employee));
    navigate(`/update/${employee.id}`);
  };
  const handleView = (employee) => {
    localStorage.setItem('editEmployeeData', JSON.stringify(employee));
    navigate(`/view/${employee.id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`)
      .then(() => {
        getData(); 
      });
  };

  return (
    <div className='container mt-4'>
      <h3>Employee List</h3>
      <div className="mt-5">
      <div className="table-responsive" style={{ border: "1px solid #000", borderRadius: "20px", textAlign: 'center', minHeight: '250px' }}>
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
            <tbody className='h-40'>
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
                        <i className="bi bi-three-dots"></i>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${employee.id}`}>
                      <li><button className="dropdown-item" onClick={() => handleView(employee)}><FontAwesomeIcon icon={faEye} /> View</button></li>
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
