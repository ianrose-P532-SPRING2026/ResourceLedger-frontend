import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

import '../style.css';

function ProtocolStepNode({ data }) {
  const onChange = useCallback((evt) => {
    data.name = evt.target.value;
  }, []);
  const onSelect = useCallback((evt) => {
    console.log(evt.target.value);
    data.selected = evt.target.value;
  }, []);

  return (
    <div className="step-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label style={{margin: "10px"}}>Name: 
          <input 
            id="name" 
            name="name" 
            onChange={onChange} 
            className="nodrag" 
            required
          />
        </label>
        <br/>
        <label>Sub-protocol: </label>
        <select onChange={onSelect}>
          <option key={-1} value={null}>None</option>
          {data.protocols.map((protocol) => (
            <option key={protocol.id} value={protocol.id}>
              {protocol.name}
            </option>
          ))}
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ProtocolStepNode;