import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';

import '../style.css';

import NavBar from '../components/NavBar.jsx';

import { planProtocol, readProtocols, createProtocol, deleteProtocol } from '../services/api';
import AccountListing from '../components/Listings/AccountListing.jsx';
import ProtocolNode from '../components/ProtocolNode';
import ProtocolStepNode from '../components/ProtocolStepNode';
import CreateProtocolDialog from '../components/Dialogs/CreateProtocolDialog.jsx';
import ProtocolView from '../components/ProtocolView';


function Protocols() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [protocol, setProtocol] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readProtocols();

        const status = response.status;
        const statusText = response.statusText;
        console.log(`${status}: ${statusText}`);

        const objects = response.data;
        setData(objects);
        setLoading(false);
        console.log(objects);
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

  function onUpdate(newData) {
    setData(prevData => [...prevData, newData]);
  }

  function onDelete(newData) {
    setData(data.filter(item => item.id !== newData.id));
    setProtocol(null);
  }

  async function planProto(protocol) {
    const response = await planProtocol(protocol.id);
    console.log(response);
    alert("Plan generated.");
  }

  async function updateProto(protocol) {
    //const response = await deleteProtocol(protocol.id);
    //console.log(response);
    alert("oops this doesnt work yet :(");
  }

  async function deleteProto(protocol) {
    if (!confirm(`Are you sure you want to delete ${protocol.name}?`)) return;

    const response = await deleteProtocol(protocol.id);
    console.log(response);

    onDelete(protocol);
  }

  if (loading) {
    return (
      <div>
        <NavBar/>
        <h1>Protocols</h1>
        <h3>All Protocols:</h3>
        <ul>
          Loading...
        </ul>

        <CreateProtocolDialog disabled={true} onUpdate={onUpdate}></CreateProtocolDialog>
      </div>
    );
  } 
  return (
    <>
      <NavBar/>
      <div className='protocol-view'>
        <div className='protocol-list'>
          <h1>Protocols</h1>
          <h3>All Protocols:</h3>
          <CreateProtocolDialog disabled={false} onUpdate={onUpdate} protocols={data}></CreateProtocolDialog>
          <ul>
            {data.map(proto => (
              <li key={`${proto.id}`} className='protocol-listing'>
                <span>{proto.name}</span>
                <button onClick={() => setProtocol(proto)}>View</button>
                
                <button onClick={() => deleteProto(proto)}>Delete</button>
                <button onClick={() => planProto(proto)}>Plan</button>
              </li>
            ))}
          </ul>
        </div>
        <ProtocolView protocol={protocol}></ProtocolView>
      </div>
    </>
  )
}
//<button onClick={() => updateProto(proto)}>Edit</button>
export default Protocols