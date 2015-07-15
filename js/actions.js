var error = false;
var graph = {
  "nodes": [{
    "label": "Webstore",
    "id": 1,
    "Betweenness": 5000,
          "size": 1110.0,
    "color": [223, 240, 216],
    "borderColor": [60, 118, 61]

      }, {
    "label": "Catalogo",
    "id": 2,
    "Betweenness": 2500,
    "color": [242, 222, 222],
    "borderColor": [180, 68, 66]
      }, {
    "label": "Payment",
    "id": 3,
    "Betweenness": 2500,
    "color": [242, 222, 222],
    "borderColor": [180, 68, 66]
      }, {
    "label": "Discount",
    "id": 4,
    "Betweenness": 2500,
    "color": [242, 222, 222],
    "borderColor": [180, 68, 66]
      }],
  "links": [{
    "source": 0,
    "target": 1
  }, {
    "source": 0,
    "target": 2
  }, {
    "source": 0,
    "target": 3
  }]
  };

var w = 450, h = 450, r = 5, padding = 2, color = d3.scale.category20();
var force = d3.layout.force().gravity(0.06).charge(-200).linkDistance(100).size([
    w *= 2 / 2,
    h *= 2 / 2
]);
var svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
svg.append('svg:rect').attr('width', w - 2).attr('height', h - 2).style('fill', '#FFF');

var link = svg.selectAll('.link').data(graph.links).enter().append('line').attr('class', 'link').style('stroke-width', function (d) {
    return Math.sqrt(d.value);
});
var node = svg.selectAll('.node').data(graph.nodes).enter().append('g').attr('class', 'node').call(force.drag).on('dblclick', connectedNodes);
node.append('circle').attr('r', function (d) {
    return r + d.Betweenness / 200;
}).style('fill', function (d) {
    return d3.rgb(d.color[0], d.color[1], d.color[2]);
}).style('stroke', function (d) {
	return d3.rgb(d.borderColor[0], d.borderColor[1], d.borderColor[2]);
});
node.append('text').attr('dx', function (d) {
    return r + 3 + d.Betweenness / 200;
}).attr('dy', '.35em').text(function (d) {
    return d.label;
}).style('stroke', '#000').style('stroke-width', '0.5px').style('font', '12px Tahoma');
var toggle = 0;
var linkedByIndex = {};
for (i = 0; i < graph.nodes.length; i++) {
    if (window.CP.shouldStopExecution(1)) {
        break;
    }
    linkedByIndex[i + ',' + i] = 1;
}
window.CP.exitedLoop(1);

graph.links.forEach(function (d) {
    linkedByIndex[d.source.index + ',' + d.target.index] = 1;
});
function neighboring(a, b) {
    return linkedByIndex[a.index + ',' + b.index];
}
function connectedNodes() {
    if (toggle == 0) {
        d = d3.select(this).node().__data__;
        node.style('opacity', function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
        });
        link.style('opacity', function (o) {
            return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
        });
        toggle = 1;
    } else {
        node.style('opacity', 1);
        link.style('opacity', 1);
        toggle = 0;
    }
}
function collide(alpha) {
    var quadtree = d3.geom.quadtree(graph.nodes);
    return function (d) {
        var rb = 2 * r + padding, nx1 = d.x - rb, nx2 = d.x + rb, ny1 = d.y - rb, ny2 = d.y + rb;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
            if (quad.point && quad.point !== d) {
                var x = d.x - quad.point.x, y = d.y - quad.point.y, l = Math.sqrt(x * x + y * y);
                if (l < rb) {
                    l = (l - rb) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}
force.on('tick', function () {
    link.attr('x1', function (d) {
        return d.source.x;
    }).attr('y1', function (d) {
        return d.source.y;
    }).attr('x2', function (d) {
        return d.target.x;
    }).attr('y2', function (d) {
        return d.target.y;
    });
    d3.selectAll('circle').attr('cx', function (d) {
        return d.x = Math.max(r, Math.min(w - 10 - r, d.x));
    }).attr('cy', function (d) {
        return d.y = Math.max(r, Math.min(h - 10 - r, d.y));
    });
    d3.selectAll('text').attr('x', function (d) {
        return d.x;
    }).attr('y', function (d) {
        return d.y;
    });
    node.each(collide(0.5));
});
var optArray = [];
for (var i = 0; i < graph.nodes.length - 1; i++) {
    if (window.CP.shouldStopExecution(2)) {
        break;
    }
    optArray.push(graph.nodes[i].label);
}
window.CP.exitedLoop(2);
optArray = optArray.sort();

$(document).ready(function() {
  force.nodes(graph.nodes).links(graph.links).start();

  force.on('tick', function () {
      link.attr('x1', function (d) {
          if(isNaN(d.source.x)) {
            error = true;
          }

          return isNaN(d.source.x) ? 0 : d.source.x;
      }).attr('y1', function (d) {
          return isNaN(d.source.y) ? 0 : d.source.y;
      }).attr('x2', function (d) {
          return isNaN(d.target.x) ? 0 : d.target.x;
      }).attr('y2', function (d) {
          return isNaN(d.target.y) ? 0 : d.target.y;
      });
      d3.selectAll('circle').attr('cx', function (d) {
          var cx = Math.max(r, Math.min(w - 10 - r, d.x));
          return d.x = isNaN(cx) ? 0 : cx;
      }).attr('cy', function (d) {
        var cy = Math.max(r, Math.min(h - 10 - r, d.y));
          return d.y = isNaN(cy) ? 0 : cy;
      });
      d3.selectAll('text').attr('x', function (d) {
          return d.x;
      }).attr('y', function (d) {
          return d.y;
      });
      node.each(collide(0.5));
  });
});
