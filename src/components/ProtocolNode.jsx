import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

import '../style.css';

function ProtocolNode({ data }) {
  
  return (
    <div className="protocol-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.name}</strong>
        <br/>
        <p>{data.protocol}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ProtocolNode;