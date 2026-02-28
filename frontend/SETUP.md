# VectorShift — Visual Pipeline Builder

A drag-and-drop pipeline builder that lets you construct and analyse node-based AI/data workflows on an interactive canvas. The frontend is built with React + ReactFlow and the backend is a FastAPI service that validates the pipeline's graph structure.

---

## Table of Contents

- [VectorShift — Visual Pipeline Builder](#vectorshift--visual-pipeline-builder)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Run the Backend](#2-run-the-backend)
    - [3. Run the Frontend](#3-run-the-frontend)
  - [Available Node Types](#available-node-types)
    - [Text Node — Variable Syntax](#text-node--variable-syntax)
  - [How to Use](#how-to-use)
  - [API Reference](#api-reference)
    - [`GET /`](#get-)
    - [`POST /pipelines/parse`](#post-pipelinesparse)

---

## Tech Stack

| Layer     | Technology                           |
|-----------|--------------------------------------|
| Frontend  | React 18, ReactFlow, Zustand, MUI v7 |
| Backend   | Python 3.10+, FastAPI, Uvicorn       |
| Styling   | MUI Emotion, glassmorphism theme     |

---

## Project Structure

```
vectorshift/
├── frontend/               # React application
│   ├── public/
│   └── src/
│       ├── nodes/          # Individual node components
│       │   ├── BaseNode.js     # Shared node base (renders all config-driven nodes)
│       │   ├── inputNode.js
│       │   ├── outputNode.js
│       │   ├── llmNode.js
│       │   ├── textNode.js     # Standalone — supports {{ variable }} syntax
│       │   ├── mathNode.js
│       │   ├── apiNode.js
│       │   ├── filterNode.js
│       │   ├── noteNode.js
│       │   └── mergeNode.js
│       ├── App.js          # Root component, MUI theme setup
│       ├── ui.js           # ReactFlow canvas
│       ├── toolbar.js      # Top bar with draggable node palette
│       ├── draggableNode.js
│       ├── submit.js       # "Run Pipeline" button and API call
│       └── store.js        # Zustand global state
│
└── backend/
    ├── main.py             # FastAPI app, pipeline parsing, DAG detection
    └── requirements.txt    # Python dependencies
```

---

## Prerequisites

Make sure the following are installed on your machine:

| Tool    | Version  | Check command        |
|---------|----------|----------------------|
| Node.js | >= 16.x  | `node --version`     |
| npm     | >= 8.x   | `npm --version`      |
| Python  | >= 3.10  | `python3 --version`  |
| pip     | >= 22.x  | `pip --version`      |

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd vectorshift
```

---

### 2. Run the Backend

Open a terminal and run the following:

```bash
# Navigate to the backend directory
cd backend

# (Recommended) Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

The backend will be available at **http://localhost:8000**

To verify it's running, open http://localhost:8000 in your browser — you should see:
```json
{ "Ping": "Pong" }
```

> The `--reload` flag enables hot-reloading. The server will automatically restart when you edit `main.py`.

---

### 3. Run the Frontend

Open a **new terminal** (keep the backend running) and run:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The app will open automatically at **http://localhost:3000**

> The frontend expects the backend at `http://localhost:8000`. Make sure the backend is running before you click "Run Pipeline".

---

## Available Node Types

| Node   | Inputs              | Outputs   | Description                                          |
|--------|---------------------|-----------|------------------------------------------------------|
| Input  | —                   | value     | Entry point. Configure name and type (Text/File)     |
| Output | value               | —         | Exit point. Configure name and type (Text/Image)     |
| LLM    | system, prompt      | response  | Language model node with two input handles           |
| Text   | `{{ var }}` handles | output    | Text template with dynamic variable handles          |
| Math   | A, B                | result    | Arithmetic (Add / Subtract / Multiply / Divide)      |
| API    | body                | response  | HTTP request node (GET / POST / PUT / DELETE)        |
| Filter | data, condition     | filtered  | Data filtering with a custom expression              |
| Note   | —                   | —         | Freeform annotation, not connected to the graph      |
| Merge  | input1, input2      | merged    | Combine two inputs (Concatenate / Zip / Override)    |

### Text Node — Variable Syntax

The **Text** node supports `{{ variable_name }}` syntax. Each unique variable you type automatically generates a corresponding input handle on the left side of the node.

Example:
```
Hello {{ name }}, your score is {{ score }}.
```
This produces two input handles: `name` and `score`.

---

## How to Use

1. **Drag** a node type from the top toolbar onto the canvas
2. **Connect** nodes by dragging from an output handle (right side ●) to an input handle (left side ●)
3. **Configure** each node using the fields inside it
4. **Click "Run Pipeline"** (bottom-right button) to submit the pipeline to the backend
5. A summary dialog shows the node count, edge count, and whether the graph is a valid DAG

---

## API Reference

### `GET /`
Health check.

**Response:**
```json
{ "Ping": "Pong" }
```

---

### `POST /pipelines/parse`

Analyses a pipeline graph and returns its structure.

**Request body:**
```json
{
  "nodes": [
    { "id": "customInput-1", "type": "customInput", "data": {} },
    { "id": "llm-1", "type": "llm", "data": {} }
  ],
  "edges": [
    { "id": "e1", "source": "customInput-1", "target": "llm-1" }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

| Field       | Type    | Description                                     |
|-------------|---------|-------------------------------------------------|
| `num_nodes` | integer | Total number of nodes in the pipeline           |
| `num_edges` | integer | Total number of edges (connections)             |
| `is_dag`    | boolean | `true` if no cycles exist (valid pipeline flow) |

---
