import { useState, useEffect } from "react"

import '../style.css';

import { getPlanSummary } from "../services/api";


export default function PlanSummaryView({ plan }) {
    const [loadState, setLoadState] = useState("WAITING");
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getPlanSummary(plan.id);
            const objects = response.data;
            setSummary(objects);
            setLoadState("DONE");
            console.log(objects);
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

        if (loadState == "LOADING") {
            fetchData();
        }
      }, [loadState]);

    if (plan == null) {
        return (<></>);
    }

    if (loadState == "WAITING") return (
        <div className="plan-details">
            <strong>Name: {plan ? plan.name : "(none)"}</strong>
            <hr/>
            <p>Summary:</p>
            <button onClick={(e) => setLoadState("LOADING")}>Request summary</button>
                <label>this frontend doesnt work yet sorry </label>
                <select>
                    <option value="PROPOSED">PROPOSED</option>
                    <option value="COMPLETE">COMPLETE</option>
                    <option value="PENDING_APPROVAL">PENDING_APPROVAL</option>
                    <option value="ABANDONED">ABANDONED</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                    
                </select>
        </div>
    );

    if (loadState == "LOADING") return (
        <div className="plan-details">
            <strong>Name: {plan.name}</strong>
            <hr/>
            <p>Summary:</p>
            <button disabled>Loading...</button>
        </div>
    );

    console.log("SUMMARY: ", summary);
    return (
        <div className="plan-details">
            <h3>Name: {plan.name}</h3>
            <p>Total cost: {summary.totalCost}</p>
            <p>risk sorcre: {summary.riskScore}</p>
            <p>ratio: {summary.ratio}</p>
            <hr/>
            <button onClick={(e) => setLoadState("LOADING")}>update summary</button>
            <p>Summary:</p>
            <div className="plan-summary">
                <ul>
                    {summary.allPoints.map(point => (
                        <li key={point.index} className="summary-point">
                            <p>Index: {point.index}</p>
                            <p>Name: {point.name}</p>
                            <p>Status: {point.status}</p>
                            <p>Total Allocations: </p>
                            <ul className="summary-quants">
                                {point.resourceQuantities.map(quant => (
                                    <li key={String(point.index)+"-"+String(quant.resourceName)}>
                                        {quant.resourceName}: {quant.amount} {quant.resourceUnit}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}