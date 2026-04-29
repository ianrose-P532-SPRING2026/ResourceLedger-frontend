import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';

import '../style.css';

import { readAccounts, readProtocols } from '../services/api';
import AccountListing from '../components/AccountListing';
import ProtocolNode from '../components/ProtocolNode';
import ProtocolStepNode from '../components/ProtocolStepNode';
import { createProtocol } from '../services/api';
import CreateProtocolDialog from '../components/CreateProtocolDialog';
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

  function onUpdate(newData) {
    setData(prevData => [...prevData, newData]);
  }

  if (loading) {
    return (
      <div>
        <h1>Protocols</h1>
        <Link to="/">Home</Link>
        <h3>All Protocols:</h3>
        <ul>
          Loading...
        </ul>

        <CreateProtocolDialog disabled={true} onUpdate={onUpdate}></CreateProtocolDialog>
      </div>
    );
  } 

  return (
    <div className='protocol-view'>
      <div className='protocol-list'>
        <h1>Protocols</h1>
        <Link className='link' to="/">Home</Link>
        <h3>All Protocols:</h3>
        <CreateProtocolDialog disabled={false} onUpdate={onUpdate} protocols={data}></CreateProtocolDialog>
        <ul>
          {data.map(proto => (
            <li key={`${proto.id}`} className='protocol-listing'>
              <span>{proto.name}</span>
              <button onClick={() => setProtocol(proto)}>View</button>
            </li>
          ))}
        </ul>
      </div>
      <ProtocolView protocol={protocol}></ProtocolView>
    </div>

      /*
      <ul className='protocol-list'>
        {data.map(item => (
          <li key={`${item.id}`}>
            {item.name}, {item.desc}
            <ul>
              {item.steps.map(step => (
                <li key={`${item.id}-${step.id}`}>
                  {step.name}
                  <br/>
                  {step.next && <span>Sub-protocol: {step.next.name}</span>}
                  {!step.next && <span>Sub-protocol: None</span>}
                  <br/>
                  {step.dependencies.length > 0 && <ul>
                    {step.dependencies.map(depend => (
                      <li key={`${item.id}-${step.id}-${depend.id}`}>
                        {depend.name}
                      </li>
                    ))}
                  </ul>
                  }
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      */
  )
}

export default Protocols