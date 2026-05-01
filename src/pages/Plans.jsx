import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';

import '../style.css';

import NavBar from '../components/navbar';

import { planProtocol, readProtocols, createProtocol, readPlans, setActionState, readResources } from '../services/api';
import AccountListing from '../components/AccountListing';
import ProtocolNode from '../components/ProtocolNode';
import ProtocolStepNode from '../components/ProtocolStepNode';
import CreateProtocolDialog from '../components/CreateProtocolDialog';
import ProtocolView from '../components/ProtocolView';
import PlanView from '../components/PlanView';
import PlanSummaryView from '../components/PlanSummaryView';
import ActionDetails from '../components/ActionDetails';


function Plans() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(null);
  const [action, setAction] = useState(null);
  const [editing, setEditing] = useState(false);

  const [resources, setResources] = useState([]); 

  const [party, setParty] = useState("");
  const [location, setLocation] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readPlans();

        const resourceResponse = await readResources();

        const status = response.status;
        const statusText = response.statusText;
        console.log(`${status}: ${statusText}`);

        const objects = response.data;
        setData(objects);
        setResources(resourceResponse.data);
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

  function carryUp(e) {
    console.log(e.action);
    setAction(e.action);
  }

  

  if (loading) {
    return (
      <div>
        <NavBar/>
        <h1>Plans</h1>
        <h3>All Plans:</h3>
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
          <h1>Plans</h1>
          <Link className='link' to="/">Home</Link>
          <h3>All Plans:</h3>
          <ul>
            {data
            .filter(plan => plan.name)
            .map(plan => (
              <li key={`${plan.id}`} className='protocol-listing'>
                <span>{plan.name}</span>
                <button onClick={() => setPlan(plan)}>View</button>
              </li>
            ))}
          </ul>
        </div>
        

        {plan ?
        <div style={{width: "15%"}}>
            <PlanSummaryView plan={plan}/>
        </div>
        :
        <></>
        }
        
        {action ?
        <div style={{width: "15%"}}>
          <ActionDetails action={action}/>
        </div>
        :
        <></>
        }

        

        <PlanView plan={plan} carryUp={carryUp}></PlanView>
      </div>
    </>
  )
}

export default Plans