import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import '../style.css';
import NavBar from '../components/NavBar.jsx';


import { readAllAccounts } from '../services/api.js';
import AccountListing from '../components/Listings/AccountListing.jsx';
import CreateConsumableDialog from '../components/Dialogs/CreateConsumableDialog.jsx';

function Accounts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readAllAccounts();
        
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
          const body = JSON.stringify(details);
          console.log(details);
          alert(`ERR ${status}: ${body}`);
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


  if (loading) {
    return (
      <div>
        <NavBar/>
        <h1>Accounts</h1>
        <h3>All Accounts: </h3>
        <ul className='resource-list'>
          Loading...
        </ul>
      </div>
    );
  } 

  return (
    <div>
      <NavBar/>
      <h1>Accounts</h1>
      <h3>All Accounts: </h3>
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

export default Accounts
