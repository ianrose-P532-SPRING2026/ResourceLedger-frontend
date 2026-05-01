import { useEffect, useState } from "react";

import '../style.css';

import { setActionState, readResources } from "../services/api";
import GenericResourceAllocationDialog from "./GenericResourceAllocationDialog";
import SuspensionDialog from "./SuspensionDialog";

export default function ActionDetails({ action, onUpdate }) {
    const [implementing, setimplementing] = useState(true);
    const [completing, setcompleting] = useState(true);
    const [suspending, setsuspending] = useState(true);
    const [resuming, setresuming] = useState(true);
    const [abandoning, setabandoning] = useState(true);


    useEffect(() => {
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

            //console.log("implementing", implementing);
            //console.log("completing", completing);
            //console.log("suspending", suspending);
            //console.log("resuming", resuming);
            //console.log("abandoning", abandoning);
        }

        configButtons(action);
    }, []);


    

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

    return (
        <div className="action-details">
            <h3>Selected Action</h3>
            <div>
                <p>Name: {action.name}</p>
                <p>State: {action.status ? action.status : "None????"}</p>
                <p>Party: {action.party ? action.party : "None"}</p>
                <p>Location: {action.party ? action.party : "None"}</p>
                <button>Edit</button>
            </div>


            <div>
                <details>
                    <summary>Allocations</summary>
                    <div>
                        <GenericResourceAllocationDialog action={action} disabled={false} onUpdate={onUpdate}/>
                        <ul>
                            {action.allocations && action.allocations.map(alloc => (
                            <li key={alloc.id}>
                               {alloc.resourceType.name}: {alloc.amount} {alloc.resourceType.unit}
                            </li>
                        ))}
                        </ul>
                    </div>
                </details>
            </div>

                
            
            <div>
                <details>
                    <summary>Change state...</summary>
                    <div>
                    <button disabled={!implementing} onClick={implement}>Implement</button><br/>
                    <button disabled={!completing} onClick={complete}>Complete</button><br/>
                    <SuspensionDialog action={action} disabled={!suspending} onUpdate={handleStateChange}/>
                    <button disabled={!resuming} onClick={resume}>Resume</button><br/>
                    <button disabled={!abandoning} onClick={abandon}>Abandon</button><br/>
                    </div>
                </details>
            </div>

        </div>        
    );
}