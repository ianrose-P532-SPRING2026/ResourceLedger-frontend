import { useState, useRef, useEffect } from 'react';
import { suspendAction } from "../../services/api";

function SuspensionDialog({ onUpdate, disabled, action, plan }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [reason, setReason] = useState('');
  const [end, setEnd] = useState('');


  const onOpen = () => {
    setReason('');
    setEnd('');
    openModal();
  }

  const onCancel = () => {
    closeModal();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitted reason:', reason);
    console.log('Submitted end:', end);
    
    try {
      const endDate = new Date(end);  
      const iso = endDate.toISOString();

      const result = await suspendAction(action.id, reason, iso);
      onUpdate(result.data);
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
        console.log(error.message);
        alert(`Error: ${error.message}`)
      }
    }

    finally {
      closeModal();
    }
  };

  if (disabled == true) {
    return (
      <>
        <button disabled>Suspend</button>
        <br/>
      </>    
    );
  }

  return (
    <>
      <button onClick={onOpen}>Suspend</button>

      <dialog ref={dialogRef} style={{ padding: '30px' }}>
        <form onSubmit={onSubmit}>
          <h3>Suspension</h3>

          <label>Reason: 
            <input 
              type="text" 
              value={reason}
              required
              onChange={(e) => setReason(e.target.value)} 
            />
          </label>

          <label>End Date (optional): 
            <input 
              type="datetime-local" 
              value={end}
              onChange={(e) => setEnd(e.target.value)} 
            />
          </label>
          <br/>
          <br/>
          
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    </>
  );
}

export default SuspensionDialog