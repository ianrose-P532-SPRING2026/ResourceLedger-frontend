import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom';
import { addEdge, useNodesState, useEdgesState, ReactFlow, Background, Panel } from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

import '../style.css';

import { readAccounts } from '../services/api';
import AccountListing from './AccountListing';
import ProtocolNode from './ProtocolNode';
import ProtocolStepNode from './ProtocolStepNode';
import { createProtocol } from '../services/api';

const nodeWidth = 180;
const nodeHeight = 40;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 250, ranksep: 150});

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      return {
        ...node,
        targetPosition: isHorizontal ? "left" : "top",
        sourcePosition: isHorizontal ? "right" : "bottom",
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    }),
    edges,
  };
};

const nodeTypes = { protocolNode: ProtocolNode, stepNode: ProtocolStepNode };

let ids = 0;
function CreateProtocolDialog({ onUpdate, disabled, protocols }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    ids = 0;
  }, []);

  useEffect(() => {
    const layouted = getLayoutedElements(nodes, edges, "TB");
    setNodes(layouted.nodes);
    setEdges(layouted.edges);
  }, [nodes.length, edges.length]);



  const onOpen = () => {
    setNodes([]);
    setEdges([]);
    setName("");
    setDesc("");
    openModal();
  }

  const onCancel = () => {
    closeModal();
  }
  
  const onAddNode = useCallback(() => {
    console.log(protocols);
    const newNode = {
      id: `${ids}`,
      type: 'stepNode',
      data: { label: `Node ${ids}`, name: "", protocols: protocols, selected: null},
      position: { x: 0, y: 0 },
    };
    ids = ids + 1;

    const newNodes = [...nodes, newNode];

    setNodes(newNodes);
  }, [nodes]);

  const onConnect = useCallback(
    (params) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
  }, [edges]);

  const onDelete = useCallback(
  ({ nodes: deletedNodes, edges: deletedEdges }) => {
    const remainingNodes = nodes.filter(
      (n) => !deletedNodes.some((dn) => dn.id === n.id)
    );

    const remainingEdges = edges.filter(
      (e) => !deletedEdges.some((de) => de.id === e.id)
    );

    setNodes(remainingNodes);
    setEdges(remainingEdges);
  }, [nodes, edges]);

const onSubmit = async (e) => {
      e.preventDefault();
    
      await onProcess()
      
      closeModal();
    };

  async function onProcess() {
    
    const nodeMap = new Map(nodes.map(node => [node.id, node.data.name]));
    const steps = [];
    nodes.forEach(node => {
      const dependencies = [];
      edges.forEach(edge => {
        if (edge.source == node.id) {
          const dependency = nodeMap.get(edge.target);
          dependencies.push(dependency);
        }
      });
      const step = {name: node.data.name, dependencies: dependencies, subProtocol: node.data.selected};
      steps.push(step);
    });

    await submitProtocol(name, desc, steps);
  };

  async function submitProtocol(name, desc, steps) {
    const response = await createProtocol(name, desc, steps);
    console.log(response);
  }

  if (disabled == true) {
    return (
      <>
        <button disabled>Create Protocol</button>
      </>    
    );
  }

  return (
    <>
      <button onClick={onOpen}>Create Protocol</button>
      <dialog ref={dialogRef}  style={{position: "fixed", inset: "0", margin: "auto", width: "80%", height: "800px", padding: "20px"}}>
        <form onSubmit={onSubmit}>
          <div style={{ width: "100%", height: "750px" }}>
            <ReactFlow 
              nodes={nodes} 
              edges={edges} 
              fitView 
              onConnect={onConnect}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onDelete={onDelete} 
              deleteKeyCode={["Delete", "Backspace"]}
              nodeTypes={nodeTypes}
            > 
              <Background />
              <Panel position="top-left">
                <div>
                  <h2>New Protocol</h2>
                  <label>
                    Name:
                    <input
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <br/>
                  <br/>
                  <label>Description: </label>
                  <br/>
                  <textarea
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  
                  <br/>
                  <button type="button" onClick={onAddNode}>Add Step</button>
                </div>
              </Panel>
              <Panel position="bottom-left">
                <button type="submit">Submit</button>
                <button type="button" onClick={onCancel}>Discard</button>
              </Panel>          
            </ReactFlow>
          </div>
        </form>
      </dialog>
    </>
  )
}

export default CreateProtocolDialog