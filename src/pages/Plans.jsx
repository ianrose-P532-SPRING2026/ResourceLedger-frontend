import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';

import '../style.css';

import { planProtocol, readProtocols, createProtocol, readPlans, setActionState, readResources } from '../services/api';
import AccountListing from '../components/AccountListing';
import ProtocolNode from '../components/ProtocolNode';
import ProtocolStepNode from '../components/ProtocolStepNode';
import CreateProtocolDialog from '../components/CreateProtocolDialog';
import ProtocolView from '../components/ProtocolView';
import PlanView from '../components/PlanView';


function Plans() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(null);
  const [action, setAction] = useState(null);
  const [editing, setEditing] = useState(false);

  const [resources, setResources] = useState([]); 

  const [party, setParty] = useState("");
  const [location, setLocation] = useState("");

  const [implementing, setimplementing] = useState(true);
  const [completing, setcompleting] = useState(true);
  const [suspending, setsuspending] = useState(true);
  const [resuming, setresuming] = useState(true);
  const [abandoning, setabandoning] = useState(true);

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
    configButtons(e.action);
  }

  function configButtons(action) {
    if (action.status == "PROPOSED") {
      setimplementing(true);
      setcompleting(false);
      setsuspending(true);
      setresuming(false);
      setabandoning(true);
    }

    if (action.status == "IN_PROGRESS") {
      setimplementing(false);
      setcompleting(true);
      setsuspending(true);
      setresuming(false);
      setabandoning(true);
    }

    if (action.status == "COMPLETED") {
      setimplementing(false);
      setcompleting(false);
      setsuspending(false);
      setresuming(false);
      setabandoning(false);
    }

    if (action.status == "SUSPENDED") {
      setimplementing(false);
      setcompleting(false);
      setsuspending(false);
      setresuming(true);
      setabandoning(true);
    }

    if (action.status == "ABANDONED") {
      setimplementing(false);
      setcompleting(false);
      setsuspending(false);
      setresuming(false);
      setabandoning(false);
    }

    console.log("implementing", implementing);
    console.log("completing", completing);
    console.log("suspending", suspending);
    console.log("resuming", resuming);
    console.log("abandoning", abandoning);
  }

  const handleStateChange = (response) => {
    console.log(response);
  }

  const implement = async (e) => {
    const response = await setActionState(action.id, "implement");
    handleStateChange(response);
  }

  const complete = async (e) => {
    const response = await setActionState(action.id, "complete");
    handleStateChange(response);
  }

  const suspend = async (e) => {
    const response = await setActionState(action.id, "suspend");
    handleStateChange(response);
  }

  const resume = async (e) => {
    const response = await setActionState(action.id, "resume");
    handleStateChange(response);
  }

  const abandon = async (e) => {
    const response = await setActionState(action.id, "abandon");
    handleStateChange(response);
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
        <h1>Plans</h1>
        <Link className='link' to="/">Home</Link>
        <h3>All Plans:</h3>
        <ul>
          {data.map(plan => (
            <li key={`${plan.id}`} className='protocol-listing'>
              <span>{plan.name}</span>
              <button onClick={() => setPlan(plan)}>View</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{width: "15%"}}>
        <h3>Selected Action</h3>
        {action ?
        <div>
          {!editing ?
          <div>
            <p>Name: {action.name}</p>
            <p>State: {action.status ? action.status : "None????"}</p>
            <p>Party: {action.party ? action.party : "None"}</p>
            <p>Location: {action.party ? action.party : "None"}</p>
            <details>
              <summary>Allocations</summary>
              <div>
                <ul>
                  {action.allocations && action.allocations.map(alloc => (
                  <li key={alloc.id}>
                    {alloc.amount} {alloc.resourceType.unit}
                  </li>
                ))}
                </ul>
              </div>
            </details>

            <details>
              <summary>Change state...</summary>
              <div>
                <button disabled={!implementing} onClick={implement}>Implement</button><br/>
                <button disabled={!completing} onClick={complete}>Complete</button><br/>
                <button disabled={!suspending} onClick={suspend}>Suspend</button><br/>
                <button disabled={!resuming} onClick={resume}>Resume</button><br/>
                <button disabled={!abandoning} onClick={abandon}>Abandon</button><br/>
              </div>
            </details>
            <button onClick={(e) => setEditing(true)}>Edit</button>
          </div> 
          : 
          <div>
            <p>Name: {action.name}</p>
            <label>Party: </label>
            <input onChange={(e) => setParty(e.target.value)}></input>

            <label>Location: </label>
            <input onChange={(e) => setLocation(e.target.value)}></input>
          </div> 
          }
        </div> 
         :
          "None selected"}
      </div>

      <PlanView plan={plan} carryUp={carryUp}></PlanView>
    </div>
  )
}

export default Plans