import { deleteResource } from "../../services/api";
import UpdateConsumableDialog from "../Dialogs/UpdateConsumableDialog";

export default function ConsumableListing({ consumable, onDelete, onUpdate, depositFunc }) {


    const deleteConsumableType = async (e) => {
        if (!confirm(`Are you sure you want to delete ${consumable.name}?`)) {
            return;
        }

        try {
            await deleteResource(consumable.id);
            onDelete(consumable.id);
            alert("Deleted.");
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


    return(
        <div className="consumable-listing">
            <strong>Name: {consumable.name}</strong>
            <br/>
            <span>Type: Consumable</span>
            <br/>
            <span>Unit: {consumable.unit}</span>
            <br/>
            <UpdateConsumableDialog onUpdate={onUpdate} consumable={consumable}/>
            <button onClick={(e) => depositFunc(consumable)}>Deposit</button>
            <button onClick={deleteConsumableType}>Delete</button>
        </div>
    )
}