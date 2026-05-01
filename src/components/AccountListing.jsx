
function AccountListing({ account }) {
    return (
        <div>
            <strong>{account.name}</strong>    
            <hr></hr>
            <span>Type: {account.type}</span>
            <br></br>
            <span>Resource: {account.resource.name}</span>
            <br></br>
            <span>Balance: {account.balance} {account.resource.unit}</span>

            {account.memo ? 
                <>
                    <details>
                        <summary>
                            {account.memo.balance != 0 ?
                             <>
                                <b>{"OVERDRAWN!"}</b>
                             </>
                             :
                             <>
                                <span>Memo Account</span>
                             </>
                             }
                        </summary>
                        <div>
                            <AccountListing account={account.memo}/>
                        </div>
                    </details>
                </> 
                : 
                <>
                </>
            }

            <details>
                <summary>Entries</summary>
                <div>
                    {account.entries.map(entry => (
                        <li key={entry.id}>
                            <p>Amount: {entry.amount}</p>
                            <p>Booked: {entry.bookedTime}</p>
                            <p>Charged: {entry.chargedTime}</p>
                            {entry.transaction ?
                             <>
                                <p>Transaction: {entry.transaction.description}</p>
                             </>
                             :
                             <></>
                             }
                        </li>

                    ))}
                </div>
            </details>
            
        </div>
    );
}

export default AccountListing;