import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom';
import { addEdge, useNodesState, useEdgesState, ReactFlow, Background, Panel, MarkerType } from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

import '../style.css';

import AccountListing from './Listings/AccountListing';
import ProtocolNode from './ProtocolNode';
import ProtocolStepNode from './ProtocolStepNode';
import { createProtocol } from '../services/api';

const nodeWidth = 180;
const nodeHeight = 40;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 150});

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

function ProtocolView({ protocol }) {
  const dialogRef = useRef(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  
  useEffect(() => {
    if (!protocol) return;
    console.log(protocol);
    const nodesAcc = [];
    const edgesAcc = [];

    const getRootSteps = (protocol) => {
      const dependedOn = new Set();

      for (const step of protocol.steps) {
        for (const dep of step.dependencies) {
          dependedOn.add(dep.id);
        }
      }

      return protocol.steps.filter(step => !dependedOn.has(step.id));
    };

    const processProtocol = (protocol) => {
      for (const step of protocol.steps) {
        console.log("PROC STEP: ", step);
        nodesAcc.push({
          id: String(step.id),
          data: { name: step.name, protocol: step.parentName},
          position: { x: 0, y: 0 },
          type: "protocolNode"
        });

        // Add dependency edges
        if (step.dependencies) {
          for (const dep of step.dependencies) {
            edgesAcc.push({
              id: `${dep.id}-${step.id}`,
              source: String(step.id),
              target: String(dep.id),
            });
          }
        }

        if (step.next) {
          processProtocol(step.next);

          const rootSteps = getRootSteps(step.next);

          for (const root of rootSteps) {
            edgesAcc.push({
              id: `${step.id}-${root.id}`,
              source: String(step.id),
              target: String(root.id),
            });
          }
        }
      }
    };


    processProtocol(protocol);

    console.log(nodesAcc);
    console.log(edgesAcc);

    const layouted = getLayoutedElements(nodesAcc, edgesAcc);

    setNodes(layouted.nodes);
    setEdges(layouted.edges);
  }, [protocol]);

  useEffect(() => {
    console.log("FINAL nodes state:", nodes);
  }, [nodes]);

  useEffect(() => {
    console.log("FINAL edges state:", edges);
  }, [edges]);

  return (
    <>
      <div className='protocol-window'>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          fitView 
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          elementsSelectable={false}
          nodeTypes={nodeTypes}
        > 
          <Panel position="top-left">
            <div>
              <h2>{protocol && protocol.name}</h2>
              <label>{protocol && "Description: " }</label>
              <br/>
              <pre>{protocol && protocol.description}</pre>
            </div>
          </Panel> 
        </ReactFlow>
      </div>
    </>
  )
}

export default ProtocolView