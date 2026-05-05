import { useEffect, useState } from "react";

import '../style.css';

import { setActionState, readResources } from "../services/api";
import GenericResourceAllocationDialog from "./Dialogs/GenericResourceAllocationDialog";
import SuspensionDialog from "./Dialogs/SuspensionDialog";

export default function ActionDetails({ action, onUpdate, plan }) {
    const [implementing, setimplementing] = useState(true);
    const [completing, setcompleting] = useState(true);
    const [suspending, setsuspending] = useState(true);
    const [resuming, setresuming] = useState(true);
    const [abandoning, setabandoning] = useState(true);
    const [submitting, setsubmitting] = useState(true);
    const [rejecting, setrejecting] = useState(true);
    const [approving, setapproving] = useState(true);
    const [reopening, setreopening] = useState(true);


    useEffect(() => {
        function configButtons(action) {
            if (action.status == "PROPOSED") {
                setimplementing(false);
                setcompleting(false);
                setsuspending(true);
                setresuming(false);
                setabandoning(true);
                setsubmitting(true);
                setapproving(false);
                setrejecting(false);
                setreopening(false);
            }

            if (action.status == "IN_PROGRESS") {
                setimplementing(false);
                setcompleting(true);
                setsuspending(true);
                setresuming(false);
                setabandoning(true);
                setsubmitting(false);
                setapproving(false);
                setrejecting(false);
                setreopening(false);
            }

            if (action.status == "COMPLETED") {
                setimplementing(false);
                setcompleting(false);
                setsuspending(false);
                setresuming(false);
                setabandoning(false);
                setsubmitting(false);
                setapproving(false);
                setrejecting(false);
                setreopening(true);
            }

            if (action.status == "SUSPENDED") {
                setimplementing(false);
                setcompleting(false);
                setsuspending(false);
                setresuming(true);
                setabandoning(true);
                setsubmitting(false);
                setapproving(false);
                setrejecting(false);
                setreopening(false);
            }

            if (action.status == "ABANDONED") {
                setimplementing(false);
                setcompleting(false);
                setsuspending(false);
                setresuming(false);
                setabandoning(false);
                setsubmitting(false);
                setapproving(false);
                setrejecting(false);
                setreopening(false);
            }

            if (action.status == "REOPENED") {
                setimplementing(false);
                setcompleting(true);
                setsuspending(false);
                setresuming(false);
                setabandoning(true);
                setsubmitting(false);
                setapproving(false);
                setrejecting(false);
                setreopening(false);
            }

            if (action.status == "PENDING_APPROVAL") {
                setimplementing(false);
                setcompleting(false);
                setsuspending(false);
                setresuming(false);
                setabandoning(false);
                setsubmitting(false);
                setapproving(true);
                setrejecting(true);
                setreopening(false);
            }

            //console.log("implementing", implementing);
            //console.log("completing", completing);
            //console.log("suspending", suspending);
            //console.log("resuming", resuming);
            //console.log("abandoning", abandoning);
        }

        configButtons(action);
    }, [action]);


    

    const handleStateChange = (response) => {
        console.log(response);
        onUpdate(response);
    }

    const implement = async (e) => {
        const response = await setActionState(action.id, "implement", plan.id);
        handleStateChange(response);
    }

    const complete = async (e) => {
        const response = await setActionState(action.id, "complete", plan.id);
        handleStateChange(response);
    }

    const suspend = async (e) => {
        const response = await setActionState(action.id, "suspend", plan.id);
        handleStateChange(response);
    }

    const resume = async (e) => {
        const response = await setActionState(action.id, "resume", plan.id);
        handleStateChange(response);
    }

    const abandon = async (e) => {
        const response = await setActionState(action.id, "abandon", plan.id);
        handleStateChange(response);
    }

    const submit = async (e) => {
        const response = await setActionState(action.id, "submit", plan.id);
        handleStateChange(response);
    }

    const approve = async (e) => {
        const response = await setActionState(action.id, "approve", plan.id);
        handleStateChange(response);
    }

    const reject = async (e) => {
        const response = await setActionState(action.id, "reject", plan.id);
        handleStateChange(response);
    }

    const reopen = async (e) => {
        const response = await setActionState(action.id, "reopen", plan.id);
        handleStateChange(response);
    }

    return (
        <div className="action-details">
            <h3>Selected Action</h3>
            <hr/>
            <div>
                <p>Name: {action.name}</p>
                <p>Party: {action.party ? action.party : "None"}</p>
                <p>Location: {action.party ? action.party : "None"}</p>
                <button>Edit</button>
            </div>
            <br/>
            <hr/>
            <br/>
            <div>
                <p>State: {action.status ? action.status : "None????"}</p>
                <button disabled={!submitting} onClick={submit}>Submit</button><br/>
                <button disabled={!approving} onClick={approve}>Approve</button>
                <button disabled={!rejecting} onClick={reject}>Reject</button><br/>
                <SuspensionDialog action={action} disabled={!suspending} onUpdate={handleStateChange} plan={plan}/>
                <button disabled={!resuming} onClick={resume}>Resume</button><br/>
                <button disabled={!completing} onClick={complete}>Complete</button>
                <button disabled={!reopening} onClick={reopen}>Reopen</button><br/>
                <button disabled={!abandoning} onClick={abandon}>Abandon</button><br/>
            </div>
            <br/>
            <hr/>
            <br/>
            <div>
                <GenericResourceAllocationDialog plan={plan} action={action} disabled={false} onUpdate={onUpdate}/>
                <details>
                    <summary>Allocations</summary>
                    <div>
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
        </div>        
    );
}