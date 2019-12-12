import * as React from 'react';
import * as d3 from 'd3';
import { css } from 'emotion';
import { theme } from '../../components/theme';

const nodeStyle = css({
    cursor: 'pointer',
    '& circle': {
        fill: 'red',
        stroke: theme.firstColor,
        strokeWidth: 3,
    },
    '& text': {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 15,
        fill: theme.firstColor,
        fontWeight: 'bold',
    },
});

const linkStyle = css({
    fill: 'none',
    stroke: theme.secondaryColor,
    strokeWidth: 2,
});

export const generateTreeDiagram = (treeData: any) => {
    update(treeData);
};

function update(treeData: any) {
    const margin = { top: 20, right: 0, bottom: 20, left: 165 };
    const width = 1150 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;

    let i = 0;
    const duration = 750;

    const tree = d3.layout.tree().size([height, width]);

    const diagonal = d3.svg.diagonal().projection(function(d) {
        return [d.y, d.x];
    });

    const svg = d3
        .select('#phylogeneticTree')
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const root = treeData;
    root.x0 = height / 2;
    root.y0 = 0;

    let source = root;

    // Compute the new tree layout.
    const nodes = tree.nodes(root).reverse();
    const links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d: any) {
        d.y = d.depth * 180;
    });

    // Update the nodes…
    const node = svg.selectAll('g.node').data(nodes, function(d: any) {
        return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', nodeStyle)
        .attr('transform', function(d: any) {
            return 'translate(' + source.y0 + ',' + source.x0 + ')';
        });

    nodeEnter
        .append('circle')
        .attr('r', 1e-6)
        .style('fill', function(d: any) {
            return d._children ? 'lightsteelblue' : '#fff';
        });

    nodeEnter
        .append('text')
        .attr('x', function(d: any) {
            return d.children || d._children ? -13 : 13;
        })
        .attr('dy', '.35em')
        .attr('text-anchor', function(d: any) {
            return d.children || d._children ? 'end' : 'start';
        })
        .text(function(d: any) {
            return d.name;
        })
        .style('fill-opacity', 1e-6);

    // Transition nodes to their new position.
    const nodeUpdate = node
        .transition()
        .duration(duration)
        .attr('transform', function(d: any) {
            return 'translate(' + d.y + ',' + d.x + ')';
        });

    nodeUpdate
        .select('circle')
        .attr('r', 10)
        .style('fill', function(d: any) {
            return d._children ? 'lightsteelblue' : '#fff';
        });

    nodeUpdate.select('text').style('fill-opacity', 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', function(d: any) {
            return 'translate(' + source.y + ',' + source.x + ')';
        })
        .remove();

    nodeExit.select('circle').attr('r', 1e-6);

    nodeExit.select('text').style('fill-opacity', 1e-6);

    // Update the links…
    const link = svg.selectAll('path.link').data(links, function(d: any) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link.enter()
        .insert('path', 'g')
        .attr('class', linkStyle)
        .attr('d', function(d: any) {
            const o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        // @ts-ignore
        .attr('d', diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit()
        .transition()
        .duration(duration)
        .attr('d', function(d: any) {
            const o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d: any) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}
