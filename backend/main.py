# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# ── CORS ──────────────────────────────────────────────────────────────────────
# Allow the React frontend (localhost:3000) to call this backend (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Models ────────────────────────────────────────────────────────────────────

class Node(BaseModel):
    id: str
    type: str | None = None
    data: Dict[str, Any] | None = None

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# ── Helpers ───────────────────────────────────────────────────────────────────

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph.
    Uses depth-first search (DFS) cycle detection.
    - WHITE (0): node not yet visited
    - GRAY  (1): node currently being visited (in the current DFS path)
    - BLACK (2): node fully visited
    If we ever encounter a GRAY node during DFS, a cycle exists → not a DAG.
    """
    # Build adjacency list
    graph: Dict[str, List[str]] = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)

    WHITE, GRAY, BLACK = 0, 1, 2
    color: Dict[str, int] = {node.id: WHITE for node in nodes}

    def dfs(node_id: str) -> bool:
        """Returns True if a cycle is found."""
        color[node_id] = GRAY
        for neighbor in graph.get(node_id, []):
            if color.get(neighbor) == GRAY:
                return True   # cycle found
            if color.get(neighbor) == WHITE:
                if dfs(neighbor):
                    return True
        color[node_id] = BLACK
        return False

    for node in nodes:
        if color[node.id] == WHITE:
            if dfs(node.id):
                return False  # cycle found → not a DAG

    return True  # no cycles → is a DAG

# ── Routes ────────────────────────────────────────────────────────────────────

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }