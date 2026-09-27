#  Virtual World Editor in Vanilla JavaScript

> Building a complete 2D world editor from scratch using **HTML5 Canvas** and **Vanilla JavaScript**  no game engine, no rendering libraries.

## 🎥 Demo

[![Watch Demo](demo_thumbnail.png)](Virtual_World_with_markings.mp4)

*Click the image to play the full demo.*

---

## Project Overview

This project is part of my journey toward **Robotics, Autonomous Vehicles, Reinforcement Learning, and Simulation**.

Instead of relying on Unity, Three.js, or Phaser, I wanted to understand how simulation software actually works underneath. Every road, building, tree, traffic light, camera movement, and editor tool is implemented mathematically from first principles.

The editor allows users to create an interactive virtual world consisting of:

- 🛣️ Road networks
- 🚦 Traffic lights
- 🛑 Stop signs
- ⚠️ Yield signs
- 🚶 Crosswalks
- 🅿️ Parking areas
- 🚙 Vehicle start positions
- 🎯 Target destinations
- 🌳 Procedurally generated trees
- 🏠 Automatically generated buildings


---

# Demo

| Feature | Preview |
|---------|---------|
| World Editing | *(Add GIF)* |
| Traffic Lights | *(Add GIF)* |
| Save & Load | *(Add GIF)* |
| Camera Controls | *(Add GIF)* |

---

# Features

| Feature | Description |
|----------|-------------|
| 🌐 Graph Editor | Create roads interactively |
| 🛣️ Road Generation | Convert centerlines into full roads |
| 🌳 Tree Generation | Procedural vegetation placement |
| 🏠 Building Generation | Automatic roadside buildings |
| 🚦 Traffic Lights | Dynamic intersection signals |
| 🛑 Stop Signs | Road markings |
| 🚶 Crosswalks | Pedestrian crossings |
| 🅿️ Parking | Parking zones |
| 🚙 Start Position | Spawn point for future AI cars |
| 🎯 Target | Destination marker |
| 💾 Save | Export complete world as `.world` |
| 📁 Load | Reload saved worlds |
| 🎥 60 FPS Rendering | Smooth real-time editing |

---

# Project Architecture

The project follows a modular architecture similar to robotics software, where every subsystem has a single responsibility.

```text
index.html
      │
      ▼
Canvas (600×600)
      │
      ▼
Viewport (Camera)
      │
      ▼
Editor System
 ├── Graph Editor
 ├── Stop Editor
 ├── Light Editor
 ├── Parking Editor
 ├── Crossing Editor
 ├── Start Editor
 ├── Target Editor
 └── Yield Editor
      │
      ▼
Graph
      │
      ▼
World Generator
      │
      ▼
Geometry Engine
      │
      ▼
Render Loop (60 FPS)
```

Every module is independent, making it easy to extend the project with new editor tools and future AI systems.

---

# Folder Structure

```text
Virtual_World_Editor/

├── index.html
├── styles.css
│
├── js/
│   ├── world.js
│   ├── viewport.js
│
│   ├── math/
│   │   ├── graph.js
│   │   └── utils.js
│
│   ├── primitives/
│   │   ├── point.js
│   │   ├── segment.js
│   │   ├── polygon.js
│   │   └── envelope.js
│
│   ├── editors/
│   │   ├── graphEditor.js
│   │   ├── markingEditor.js
│   │   ├── stopEditor.js
│   │   ├── crossingEditor.js
│   │   ├── parkingEditor.js
│   │   ├── lightEditor.js
│   │   ├── startEditor.js
│   │   ├── targetEditor.js
│   │   └── yieldEditor.js
│
│   ├── markings/
│   │   ├── stop.js
│   │   ├── crossing.js
│   │   ├── parking.js
│   │   ├── light.js
│   │   ├── start.js
│   │   ├── target.js
│   │   └── yield.js
│
│   └── items/
│       ├── building.js
│       └── tree.js
```

---

# Complete Execution Flow

Every time the browser loads the project, the following sequence happens.

```text
Page Loads
     │
     ▼
Load Saved World
     │
     ▼
Initialize Viewport
     │
     ▼
Create Editor Tools
     │
     ▼
Start Animation Loop
     │
     ▼
Render World (60 FPS)
```

The browser continuously redraws the world while responding to mouse interactions.

---

# Step-by-Step Code Flow

## Step 1 – Canvas Creation

```javascript
myCanvas.width = 600;
myCanvas.height = 600;
```

The canvas becomes the drawing surface.

Coordinate system:

```text
(0,0)
 ●────────► X
 │
 │
 ▼
 Y
```

Unlike traditional mathematics:

- X increases right.
- Y increases downward.

---

## Step 2 – Create Drawing Context

```javascript
const ctx = myCanvas.getContext("2d");
```

`ctx` acts like a digital pen.

Every drawing operation later uses this object.

Example:

```javascript
ctx.moveTo(...)
ctx.lineTo(...)
ctx.arc(...)
ctx.fill()
```

---

## Step 3 – Load Saved World

The project restores the previously saved world.

```javascript
const worldString = localStorage.getItem("world");
```

### Serialization

Objects cannot be stored directly.

```text
World Object
     │
JSON.stringify()
     │
     ▼
Text
```

When loading:

```text
Text
 │
JSON.parse()
 │
 ▼
World Object
```

This process is called **serialization**.

---

## Step 4 – Create Graph

The graph stores the mathematical representation of roads.

```text
graph

├── points[]
└── segments[]
```

Every road is built from these two fundamental structures.

---

## Step 5 – Create World

The graph only stores mathematical roads.

Example:

```text
A────────B
```

The world transforms this into:

- Road width
- Rounded corners
- Lane guides
- Buildings
- Trees

Conceptually:

```text
Graph

A────────B


World

      🌳

██████████
- - - - -
██████████

      🏠
```

This transformation happens procedurally.

---

## Step 6 – Viewport

The viewport behaves like a virtual camera.

Instead of moving every object individually, the camera transforms the coordinate system.

This is the same concept used in:

- OpenGL
- MuJoCo
- ROS visualization
- Game engines

---

## Step 7 – Create Editor Tools

Each toolbar button creates its own editor.

Example:

```javascript
new GraphEditor(viewport, graph)
```

Every marking editor receives:

- viewport
- world

This shared architecture allows all tools to behave consistently.

---

## Step 8 – Animation Loop

The heart of the project.

```javascript
requestAnimationFrame(animate);
```

The browser automatically calls this approximately:

```text
60 FPS
```

Each frame performs:

```text
Reset Camera
      │
Check Graph Changes
      │
Generate World if Needed
      │
Update Traffic Lights
      │
Draw Roads
      │
Draw Buildings
      │
Draw Trees
      │
Draw Markings
      │
Draw Active Editor
```

This layered rendering pipeline is similar to how game engines work.

---

# World Generation

The `World` class is the procedural generation engine.

Input:

```text
Graph
```

Output:

```text
Roads
Buildings
Trees
Lane Guides
Road Borders
```

Instead of manually drawing roads, everything is generated mathematically.

---

# How Roads Become Real Roads

Every road begins as a simple centerline.

```text
A────────B
```

The `Envelope` class expands it into a polygon.

```text
Centerline

──────────

↓

Road Polygon

██████████
```

Rounded intersections are automatically generated.

This is computational geometry rather than image-based drawing.

---

# Building Generation

Buildings are created entirely from road geometry.

## Algorithm

1. Create offset envelopes around roads.
2. Union overlapping polygons.
3. Generate guide segments.
4. Divide guides into lots.
5. Remove overlapping buildings.
6. Create final buildings.

This prevents buildings from intersecting roads or each other.

---

# Tree Generation

Trees are placed using randomized sampling.

Each candidate tree must satisfy three rules.

Reject if:

- Inside a road
- Inside a building
- Too close to another tree

This creates a natural-looking environment while keeping roads clear.

---

# Lane Guides

Lane guides are invisible navigation paths.

They are generated from half-width road envelopes.

Future AI vehicles will use these paths for:

- Lane following
- Path planning
- Autonomous navigation

---

# Traffic Marking System

One of the biggest architectural improvements is the modular marking system.

Instead of every editor implementing its own logic, all editors inherit from a common base class.

```text
MarkingEditor
     │
     ├── Stop
     ├── Crossing
     ├── Parking
     ├── Light
     ├── Start
     ├── Target
     └── Yield
```

Every editor shares:

- Mouse handling
- Road detection
- Preview rendering
- Placement logic

Only the marking creation changes.

This makes adding new editor tools extremely easy.

---

# Toolbar Guide

| Button | Purpose |
|---------|----------|
| 🌐 | Road Graph Editor |
| 🛑 | Stop Sign |
| ⚠️ | Yield Sign |
| 🚶 | Crosswalk |
| 🅿️ | Parking Area |
| 🚦 | Traffic Light |
| 🚙 | Vehicle Start Position |
| 🎯 | Target Destination |
| 💾 | Save World |
| 📁 | Load World |
| 🗑️ | Clear World |

Only one editor is active at a time.

When a new tool is selected, all other editors automatically disable themselves.

---

# Traffic Light Logic

Traffic lights synchronize automatically.

Workflow:

```text
Find Lights
     │
     ▼
Find Nearby Intersections
     │
     ▼
Group Lights
     │
     ▼
Compute Timing
     │
     ▼
Switch States
```

For **N** traffic lights,

<math block value="Cycle=N(G+Y)"/>

where:

- **G** = Green duration
- **Y** = Yellow duration

This creates coordinated intersections without manually programming every light.

---

# Save & Load System

The entire world is serialized into JSON.

Workflow:

```text
World Object
      │
JSON.stringify()
      │
      ▼
.world File
      │
      ▼
localStorage Backup
```

Saved data includes:

- Roads
- Buildings
- Trees
- Traffic markings
- Camera zoom
- Camera position

The project can be closed and reopened without losing progress.

---

# Mathematical Foundations

This project introduces many concepts used directly in robotics and autonomous driving.

## Graph Theory

Road networks are represented as

<math block value="G=(V,E)"/>

where:

- **V** = vertices (points)
- **E** = edges (road segments)

This is exactly how navigation algorithms represent maps.

---

## Vector Translation

Moving an object by

<math value="T=(dx,dy)"/>

gives

<math block value="P'=P+T"/>

Camera movement performs the opposite transformation.

---

## Coordinate Transformation

The viewport continuously converts between:

```text
Screen Coordinates
        ↓
World Coordinates
```

This same idea appears in:

- ROS TF
- SLAM
- OpenGL
- MuJoCo
- Computer Vision

---

## Dot Product

Used for:

- nearest road detection
- projections
- lane calculations

Formula:

<math block value="\\vec u\\cdot\\vec v=u_xv_x+u_yv_y"/>

---

## Hashing

The graph generates a numerical fingerprint.

Instead of comparing every road every frame, one hash comparison determines whether regeneration is necessary.

This significantly improves performance.

---

# Technologies Used

- Vanilla JavaScript (ES6)
- HTML5 Canvas
- Object-Oriented Programming
- Computational Geometry
- Graph Theory
- Browser APIs
  - LocalStorage
  - FileReader
  - Canvas API

No external rendering libraries or game engines are used.

---


# What this project covers


- Event-driven programming
- Rendering loops
- Camera transformations
- Graph-based road modeling
- Procedural environment generation
- Computational geometry
- Collision-friendly road generation
- Modular editor architecture
- Serialization and persistence
- Real-world software design patterns used in robotics and autonomous driving systems

Although the project looks visually simple, its underlying architecture mirrors many of the foundational ideas used in professional robotics software, simulation engines, and autonomous vehicle research.

