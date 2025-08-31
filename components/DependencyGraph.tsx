'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { GitHubContent } from '@/types/github';

interface DependencyGraphProps {
  contents: GitHubContent[];
}

interface GraphNode {
  id: string;
  name: string;
  type: 'file' | 'dir';
  size?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

export default function DependencyGraph({ contents }: DependencyGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !contents.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 400;

    // Process contents into nodes and links
    const nodes: GraphNode[] = contents
      .filter(item => item.type === 'file' && item.name.match(/\.(js|ts|jsx|tsx|py|java|cpp|c)$/))
      .slice(0, 20) // Limit for performance
      .map(item => ({
        id: item.path,
        name: item.name,
        type: item.type,
        size: item.size,
      }));

    // Generate some sample connections based on file types and names
    const links: GraphLink[] = [];
    nodes.forEach((node, i) => {
      if (i < nodes.length - 1) {
        const nextNode = nodes[i + 1];
        if (Math.random() > 0.6) { // Random connections for demo
          links.push({ source: node.id, target: nextNode.id });
        }
      }
    });

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#38bdf8')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d: any) => Math.max(5, Math.min(15, (d.size || 1000) / 1000)))
      .attr('fill', (d: any) => d.type === 'file' ? '#38bdf8' : '#a855f7')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    const label = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d: any) => d.name.length > 15 ? d.name.substring(0, 12) + '...' : d.name)
      .attr('font-size', 10)
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .attr('dy', -20);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    node.call(d3.drag()
      .on('start', (event: any, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event: any, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event: any, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }) as any);

  }, [contents]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass rounded-2xl p-6 neon-border"
    >
      <h3 className="text-2xl font-bold text-white mb-6">File Dependencies</h3>
      
      <div className="bg-gray-900/50 rounded-xl p-4">
        <svg
          ref={svgRef}
          width="100%"
          height="400"
          viewBox="0 0 800 400"
          className="overflow-visible"
        />
      </div>

      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <span className="text-gray-300">Files</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <span className="text-gray-300">Directories</span>
        </div>
      </div>
    </motion.div>
  );
}