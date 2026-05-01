import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import '../style.css';
import NavBar from '../components/NavBar.jsx';


import { readAccounts } from '../services/api';
import AccountListing from '../components/AccountListing';
import CreateConsumableDialog from '../components/CreateResourceDialog';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readAccounts();
        
        const status = response.status;
        const statusText = response.statusText;
        
        const objects = response.data;
        console.log(objects);
        setData(objects);
        setLoading(false);
      } 
      catch (error) {
        if (error.response) {
          const status = error.response.status;
          const statusText = error.response.statusText;
          const details = error.response.data;
          alert(`ERR ${status}: ${details}`);
        }
        else if (error.request) {
          alert(`Request Error ${error.code}\nDetails: ${error.request}`);
          console.log("Request Details:", error.request);
        } else {
          alert(`Error: ${error.message}`)
        }
      }      
    }

    fetchData();
  }, []);


  function handleDelete(id) {

  }

  function onUpdate(newData) {
    setData(prevData => [...prevData, newData]);
  }
  


  if (loading) {
    return (
      <div>
        <NavBar/>
        <h1>Dashboard</h1>
        <h3>All Pool Accounts: </h3>
        <ul className='resource-list'>
          Loading...
        </ul>
      </div>
    );
  } 

  return (
    <div>
      <NavBar/>
      <h1>Dashboard</h1>
      <h3>All Pool Accounts: </h3>
      <ul className='resource-list'>
        {data.map(account => (
          <li key={account.id}>
            <AccountListing account={account}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
