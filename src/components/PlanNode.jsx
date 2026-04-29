import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

import '../style.css';

function PlanNode({ data, carryUp }) {
  
  return (
    <div className="protocol-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>Plan: {data.plan.name}</strong>
        <p>Status: {data.plan.status}</p>
        <p>Planned Start: {data.plan.plannedStart}</p>
        <p>Source Protocol: {data.plan.sourceProtocol && data.plan.sourceProtocol.name}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default PlanNode;