import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { readLogs } from '../services/api';
import '../style.css';

import NavBar from '../components/NavBar.jsx';
import TransactionListing from '../components/Listings/TransactionListing.jsx';

function TransactionLogs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readLogs();

        const objects = response.data;
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

    
  console.log(data);

  if (loading) return (
    <div>
      <NavBar/>
      <h1>Transaction Logs</h1>
      <ul className='resource-list'>
        Loading...
      </ul>          
    </div>
  )

  return (
    <div>
      <NavBar/>
      <h1>Transaction Logs</h1>
      <ul className='resource-list'>
        {data.map(transaction => (
          <li key={transaction.id} className='log'>
            <TransactionListing transaction={transaction}/>
          </li>
        ))}
      </ul>          
    </div>
  )
}

export default TransactionLogs
