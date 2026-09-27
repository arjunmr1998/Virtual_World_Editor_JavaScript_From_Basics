#  Virtual World Editor in Vanilla JavaScript

> Building a complete 2D world editor from scratch using **HTML5 Canvas** and **Vanilla JavaScript**  no game engine, no rendering libraries.

## 🎥 Demo

[![Watch Demo](car.png)](Virtual_World_with_markings.mp4)

*Click the image to download the full demo.*

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
| 🌍 World Editing | <img src="Virtual_World_with_marking_gif.gif" width="380"> |
| 🚦 Traffic Lights | <img src="traffic_light.gif" width="380"> |
| 💾 Save & Load | Included in the World Editing demo |
| 🎥 Camera Controls | Included in the World Editing demo |

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


---

# Acknowledgement

A special thanks to **Radu Mariescu-Istodor** for creating the incredible **FreeCodeCamp** tutorial that inspired this project.

I followed the tutorial as a learning resource, but my goal throughout the project was to understand the underlying mathematics, computational geometry, rendering pipeline, and software architecture behind every feature rather than simply reproducing the code. Working through this project helped me build a much stronger intuition for concepts that directly relate to robotics, autonomous driving, and simulation.

📺 **Original Tutorial:** <Link ref_id=https://www.youtube.com/watch?v=5iHejdqYIa8/>





---

# 📚 More Info – Code Architecture & Internal Working

This section is a technical deep dive into how the project is structured internally. Rather than treating the editor as a collection of independent files, the project follows a layered architecture where each JavaScript file has a single responsibility. The overall design is similar to robotics software, where perception, mapping, planning, and visualization are separated into independent modules.

---

# High-Level Code Flow

Every frame follows the same pipeline.

```text
Browser
   │
   ▼
index.html
   │
   ▼
Load World
   │
   ▼
Viewport (Camera)
   │
   ▼
Active Editor
   │
   ▼
Graph Update
   │
   ▼
World Generation
   │
   ▼
Render Loop
```

Instead of redrawing everything blindly, the editor first checks whether the road graph changed. Only then is the expensive world generation process executed.

---

# File-by-File Breakdown

## `index.html`

This file acts as the **application controller**.

### Responsibilities

- Creates the HTML Canvas.
- Restores saved worlds.
- Creates the viewport.
- Creates every editor tool.
- Starts the animation loop.
- Handles Save, Load, and Clear.

### Important Variables

| Variable | Purpose |
|----------|---------|
| `world` | Complete environment |
| `graph` | Mathematical road network |
| `viewport` | Camera system |
| `tools` | Stores every editor |
| `oldGraphHash` | Detects map changes |

### Main Functions

#### `animate()`

Runs continuously at approximately **60 FPS**.

Workflow:

```text
Reset Camera
      │
Hash Check
      │
Generate World
      │
Draw Roads
      │
Draw Buildings
      │
Draw Trees
      │
Draw Markings
      │
Draw Editor Preview
```

This resembles the update-render loop used in game engines.

---

#### `setMode(mode)`

Switches between editor tools.

Example:

```text
Graph Editor

↓

Traffic Light Editor

↓

Parking Editor
```

Only one editor remains active at any time.

---

#### `save()`

Exports the complete world.

```text
World Object
      │
JSON.stringify()
      │
      ▼
.world File
```

The world is also backed up inside browser LocalStorage.

---

#### `load()`

Restores a previously exported world.

Workflow:

```text
.world File

↓

JSON.parse()

↓

World.load()
```

---

## `viewport.js`

The viewport behaves like a virtual camera.

Instead of moving every road individually, the camera transforms the coordinate system.

### Main Responsibilities

- Pan
- Zoom
- Mouse coordinate conversion
- Camera transformations

### Important Functions

#### `getMouse()`

Converts

```text
Screen Coordinates

↓

World Coordinates
```

Without this conversion, clicking would become inaccurate after zooming.

---

#### `reset()`

Resets canvas transformations every frame.

Without resetting:

```text
Frame 1

translate(10)

Frame 2

translate(10)

Total = 20
```

Eventually every object would disappear.

---

# Mathematical Foundation

Camera transformation:

<math block value="P_{screen}=P_{world}-T"/>

where

- <math value="T"/> = camera movement

This is identical to OpenGL and ROS coordinate transformations.

---

## `graph.js`

The graph is the mathematical backbone of the editor.

Instead of storing roads as images, roads become a graph.

<math block value="G=(V,E)"/>

where

- <math value="V"/> = Points
- <math value="E"/> = Segments

### Internal Structure

```text
Graph

├── points[]
└── segments[]
```

### Major Functions

#### `tryAddPoint()`

Adds a new point while preventing duplicates.

#### `tryAddSegment()`

Creates a road between two points.

#### `removePoint()`

Deletes a point and every connected road.

#### `removeSegment()`

Deletes one road.

#### `dispose()`

Clears the entire graph.

#### `hash()`

Generates a fingerprint of the graph.

Instead of comparing every point every frame, one hash comparison detects changes.

---

## `world.js`

This is the procedural world generation engine.

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
Traffic Lights
```

This file contains the largest amount of computational geometry.

---

### `generate()`

The master generation function.

Workflow:

```text
Graph

↓

Road Envelopes

↓

Polygon Union

↓

Road Borders

↓

Buildings

↓

Trees

↓

Lane Guides
```

---

### `#generateLaneGuides()`

Creates invisible center paths.

These will later become navigation lanes for AI vehicles.

---

### `#generateBuildings()`

One of the most interesting algorithms.

Workflow:

1. Expand roads.
2. Create guide polygons.
3. Split guides into lots.
4. Remove overlaps.
5. Create buildings.

Conceptually:

```text
Road

██████████

↓

Building Lots

[] [] []

↓

Buildings
```

---

### `#generateTrees()`

Uses randomized sampling.

Every candidate tree is tested.

Reject if:

- Inside roads
- Inside buildings
- Too close to another tree

This creates realistic vegetation without manual placement.

---

### `#updateLights()`

Synchronizes traffic lights.

Workflow:

```text
Find Lights

↓

Find Intersections

↓

Group Lights

↓

Cycle States
```

For

<math value="N"/> lights,

cycle duration becomes

<math block value="Cycle=N(G+Y)"/>

where

- <math value="G"/> = green duration
- <math value="Y"/> = yellow duration

---

### `draw()`

Responsible for layered rendering.

Rendering order:

1. Roads
2. Markings
3. Road Borders
4. Buildings
5. Trees

Sorting buildings and trees by camera distance creates a pseudo-3D depth effect.

---

# Primitive Geometry Classes

These files form the mathematical foundation of the editor.

---

## `point.js`

Represents

<math value="(x,y)"/>

Every object in the editor ultimately depends on points.

Used by:

- Roads
- Buildings
- Trees
- Traffic Lights

---

## `segment.js`

Represents one road.

### Important Functions

#### `length()`

Computes

<math block value="\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"/>

#### `directionVector()`

Returns the unit direction vector.

#### `distanceToPoint()`

Finds the shortest distance between a point and a road.

This function is heavily used for snapping editor tools.

---

## `polygon.js`

One of the most powerful files.

Handles:

- Polygon unions
- Intersections
- Containment
- Distance calculations

This is the computational geometry engine behind roads and buildings.

---

## `envelope.js`

Transforms a simple line into a road.

Input:

```text
A────────B
```

Output:

```text
██████████
```

Rounded ends are generated automatically.

---

# Editor System

All marking editors inherit from a common base class.

```text
MarkingEditor

├── Stop
├── Crossing
├── Parking
├── Light
├── Start
├── Target
└── Yield
```

Instead of duplicating mouse logic, each editor only changes what gets created.

---

## `markingEditor.js`

Shared functionality includes:

- Mouse tracking
- Road snapping
- Preview rendering
- Placement logic

This follows object-oriented inheritance.

---

## Individual Editors

### `graphEditor.js`

Creates roads.

### `stopEditor.js`

Places stop signs.

### `crossingEditor.js`

Places pedestrian crossings.

### `parkingEditor.js`

Creates parking zones.

### `lightEditor.js`

Creates traffic lights.

### `startEditor.js`

Places vehicle spawn points.

### `targetEditor.js`

Places destination markers.

### `yieldEditor.js`

Places yield signs.

---

# Marking Classes

Each editor creates one marking object.

| Class | Purpose |
|---------|----------|
| `Stop` | Stop line |
| `Crossing` | Zebra crossing |
| `Parking` | Parking area |
| `Light` | Traffic signal |
| `Start` | Vehicle spawn |
| `Target` | Destination |
| `Yield` | Yield marking |

Every marking contains:

- Position
- Direction
- Width
- Height
- Draw function

This separation keeps rendering independent from editing.

---

# Utility Functions (`utils.js`)

These small mathematical functions are used everywhere.

### `distance()`

Euclidean distance.

<math block value="\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"/>

---

### `lerp()`

Linear interpolation.

<math block value="L(a,b,t)=a+t(b-a)"/>

Used for smooth positioning.

---

### `scale()`

Multiplies vectors.

Example:

```text
(3,4)

↓

×2

↓

(6,8)
```

---

### `add()`

Vector addition.

<math block value="(x_1+x_2,y_1+y_2)"/>

---

### `normalize()`

Converts any vector into a unit vector.

This is essential for road direction calculations.

---

### `getNearestPoint()`

Finds the closest graph point.

Used for snapping traffic lights and intersections.

---

### `getNearestSegment()`

One of the most frequently used functions.

Workflow:

```text
Mouse

↓

Distance to Every Segment

↓

Choose Minimum

↓

Snap Tool
```

This gives the editor a CAD-like snapping behavior.

---

# Mathematical Concepts Used

This project quietly teaches many concepts used in robotics.

## Graph Theory

Road network:

<math block value="G=(V,E)"/>

Used in:

- GPS
- A*
- RRT*

---

## Euclidean Distance

<math block value="\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"/>

Used for snapping.

---

## Linear Interpolation

<math block value="L(a,b,t)=a+t(b-a)"/>

Used for smooth positioning.

---

## Vector Normalization

Converts vectors into unit direction vectors.

Essential for:

- Road generation
- Lane guides
- Traffic markings

---

## Coordinate Frames

The viewport continuously transforms

```text
Screen Coordinates

↓

World Coordinates
```

This is the same concept used by:

- ROS TF
- SLAM
- MuJoCo
- Computer Vision

---


---





