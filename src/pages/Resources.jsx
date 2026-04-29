import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { readResources } from '../services/api';
import '../style.css';


import CreateResourceDialog from '../components/CreateResourceDialog';

function Resources() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readResources();

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
        <h1>Resources</h1>
        <Link to="/">Home</Link>
        <h3>Resource Types:</h3>
        <ul>
          Loading...
        </ul>

        <CreateResourceDialog disabled={true} onUpdate={onUpdate}></CreateResourceDialog>
      </div>
    );
  } 

  return (
    <div>
      <h1>Resources</h1>
      <Link to="/">Home</Link>
      <h3>Resource Types:</h3>
      <ul className='resource-list'>
        {data.map(item => (
          <li key={item.id}>
            {item.name}, {item.unit}
          </li>
        ))}
      </ul>

      <CreateResourceDialog disabled={false} onUpdate={onUpdate}></CreateResourceDialog>
    </div>
  )
}

export default Resources
