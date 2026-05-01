
export default function ConsumableListing({ consumable }) {

    return(
        <div className="consumable-listing">
            <strong>Name: {consumable.name}</strong>
            <br/>
            <span>Type: Consumable</span>
            <br/>
            <span>Unit: {consumable.unit}</span>
        </div>
    )
}