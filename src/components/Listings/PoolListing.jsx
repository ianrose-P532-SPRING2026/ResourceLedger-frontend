import MemoListing from "./MemoListing";

export default function PoolListing({ account }) {
    return (
        <div className="account-listing">
            <strong>{account.name}</strong>    
            <hr></hr>
            <strong>{account.resource.name}: {account.balance} {account.resource.unit}</strong>

            {account.overdraw ? 
                <>
                    <details>
                        <summary>
                            {account.overdraw.balance != 0 ?
                             <>
                                <b>{"OVERDRAWN!"}</b>
                             </>
                             :
                             <>
                                <span>Overdraw Memo Account</span>
                             </>
                             }
                        </summary>
                        <div>
                            <MemoListing account={account.overdraw}/>
                        </div>
                    </details>
                </> 
                : 
                <>
                </>
            }

            {account.entries.length > 0 ?
                <>
                    <details>
                        <summary>Entries</summary>                      
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