import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import '../style.css';
import { setActionState } from '../services/api';

function ProposalNode({ data }) {

  return (
    <div className="protocol-node">
      <Handle type="target" position={Position.Top} />
      <div className='nodrag nopan' style={{ pointerEvents: 'all' }}>
        <strong>Proposed: {data.action.name}</strong>
        <p>Status: {data.action.status}</p>
        <br/>
        <button onClick={(e) => data.carryUp(data)}>Select</button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ProposalNode;