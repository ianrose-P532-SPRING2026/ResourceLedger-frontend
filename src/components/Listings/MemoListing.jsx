
export default function MemoListing({ account }) {
    return (
        <div className="account-listing">
            <strong>{account.name}</strong>    
            <hr></hr>
            <strong>{account.resource.name}: {account.balance} {account.resource.unit}</strong>
            
            {account.entries.length > 0 ?
                <>
                    <details>
                        <summary><b>Entries - OVERDRAWN!</b></summary>                      
                        <div>
                            {account.entries.map(entry => (
                                <li key={entry.id} className="entry-listing">
                                    <p>Amount: {entry.amount}</p>
                                    <p>Booked: {entry.bookedTime}</p>
                                    <p>Charged: {entry.chargedTime}</p>
                                    <p>Transaction: {entry.transaction}</p>
                                </li>
                            ))}
                        </div>
                    </details>
                </>
                :
                <></>
            }
        </div>
    );
}