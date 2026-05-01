import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom';
import { addEdge, useNodesState, useEdgesState, ReactFlow, Background, Panel, MarkerType } from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

import '../style.css';

import { readAccounts } from '../services/api';
import AccountListing from './AccountListing';
import ProtocolNode from './ProtocolNode';
import ProtocolStepNode from './ProtocolStepNode';
import { createProtocol } from '../services/api';
import PlanNode from './PlanNode';
import ProposalNode from './ProposalNode';

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

const nodeTypes = { planNode: PlanNode, proposalNode: ProposalNode };

function PlanView({ plan, carryUp }) {
  const dialogRef = useRef(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  
  useEffect(() => {
    if (!plan) return;

    const nodesAcc = [];
    const edgesAcc = [];

    const traverse = (node, parent = null) => {
      if (node.nodeType == "PROPOSAL") {
        nodesAcc.push({
          id: String(node.id),
          data: { action: node, carryUp: carryUp},
          position: { x: 0, y: 0 },
          type: "proposalNode"
        });
      } else {
        nodesAcc.push({
          id: String(node.id),
          data: { plan: node, carryUp: carryUp },
          position: { x: 0, y: 0 },
          type: "planNode"
        });
      }
      

      if (parent) {
        edgesAcc.push({
          id: `${parent.id}-${node.id}`,
          source: String(parent.id),
          target: String(node.id),
        });
      }

      node.children?.forEach(child => traverse(child, node));
    };

    traverse(plan);


    const layouted = getLayoutedElements(nodesAcc, edgesAcc);

    setNodes(layouted.nodes);
    setEdges(layouted.edges);
  }, [plan]);


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
              <h2>{plan && plan.name}</h2>
            </div>
          </Panel> 
        </ReactFlow>
      </div>
    </>
  )
}

export default PlanView