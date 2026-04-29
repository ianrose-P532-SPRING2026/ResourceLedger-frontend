import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { readTest, deleteTest } from '../services/api';
import CreateTestDialog from '../components/CreateTestDialog';

function TestPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const objects = await readTest();
        setData(objects);
        setLoading(false);
      } catch {
        console.log("Could not connect to backend.")
        setLoading(true);
      }
    };

    fetchData();
  }, []);


  function handleDelete(id) {

  }

  function onUpdate(newData) {
    setData(prevData => [...prevData, newData]);
  }
  


  if (loading) {
    console.log("NOT LOADED");
    return (
      <div>
        <h1>Test Page :3</h1>
        <Link to="/">Home</Link>
        <ul>
          Loading...
        </ul>

        <CreateTestDialog disabled={true} onUpdate={onUpdate}></CreateTestDialog>
      </div>
    );
  }
  
  console.log("LOADED");
  return (
    <div>
      <p>Test Page :3</p>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>

      <CreateTestDialog disabled={false} onUpdate={onUpdate}></CreateTestDialog>
    </div>
  );
}


export default TestPage
