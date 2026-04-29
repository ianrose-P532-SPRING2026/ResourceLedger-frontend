import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../style.css';

import { readAccounts } from '../services/api';
import AccountListing from '../components/AccountListing';


function Accounts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readAccounts();
        
        const status = response.status;
        const statusText = response.statusText;
        console.log(`${status}: ${statusText}`);

        const objects = response.data;
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
        <p>Resource Page :3</p>
        <h3>Resource Types:</h3>
        <ul>
          Loading...
        </ul>
      </div>
    );
  } 

  return (
    <div>
      <h1>Accounts</h1>
      <Link to="/">Home</Link>
      <h3>All Accounts</h3>
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
