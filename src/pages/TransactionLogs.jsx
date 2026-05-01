import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { readLogs } from '../services/api';
import '../style.css';

import NavBar from '../components/NavBar.jsx';

function TransactionLogs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readLogs();

        const objects = response.data;
        setData(objects);
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

    
  console.log(data);

  return (
    <div>
      <NavBar/>
      <h1>Transaction Logs</h1>
      <ul className='resource-list'>
        {data.map(transaction => (
          <li key={transaction.id} className='log'>
            <p>Desc: {transaction.description}</p>
            <ul>
              {transaction.entries.map(entry => (
                <li key={transaction.id+"-"+entry.id}>
                  {entry.amount > 0 ?
                   <>
                    <p>DEPOSIT: {entry.amount} TO {entry.account.name}</p>
                   </>
                   : 
                   <>
                    <p>WITHDRAWAL: {entry.amount} FROM {entry.account.name}</p>
                   </>
                   }
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>          
    </div>
  )
}

export default TransactionLogs
