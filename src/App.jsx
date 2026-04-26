import { useState, useEffect } from 'react'
import { readTest, deleteTest } from './services/api';


import CreateTestForm from './components/CreateTestForm';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const objects = await readTest();
      setData(objects);
      setLoading(false);
    };

    fetchUsers();
  }, []);


  function handleDelete(id) {

  }

  function onUpdate(newData) {
    setData(prevData => [...prevData, newData]);
  }
  


  if (loading) return <p>Loading...</p>;
  //<button onClick={() => handleUpdate(item.id)}>Update</button>
  return (
    <div>
      <p>hi :)</p>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>

      <CreateTestForm onUpdate={onUpdate}></CreateTestForm>

    </div>
  )
}

export default App
