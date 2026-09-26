# 🌍 World Editor – No Library Self Driving Car (Learning Notes)

This project is part of my journey toward Robotics, Autonomous Vehicles, and AI. Instead of using game engines like Unity or Three.js, everything is built from scratch using **HTML Canvas** and **Vanilla JavaScript**.

At this stage, the project implements a **World Editor**, where roads are represented as mathematical graphs and converted into a navigable world.

---

# Project Workflow

The execution flow looks like this.

```
Browser
   │
   ▼
index.html
   │
   ▼
Canvas (600×600)
   │
   ▼
Viewport (Camera)
   │
   ▼
Graph Editor (Mouse Interaction)
   │
   ▼
Graph (Road Network)
   │
   ▼
World (Road Generation)
   │
   ▼
Render Loop (60 FPS)
```

The browser continuously redraws the world while allowing the user to create and edit roads interactively.

---

# Project Structure

```
project/
│
├── index.html
├── styles.css
│
├── js/
│   ├── world.js
│   ├── graphEditor.js
│   ├── viewport.js
│   ├── math/
│   │    ├── graph.js
│   │    └── utils.js
│   │
│   ├── primitives/
│   │    ├── point.js
│   │    ├── segment.js
│   │    ├── polygon.js
│   │    └── envelope.js
│   │
│   └── items/
│        ├── building.js
│        └── tree.js
```

Each file has a single responsibility, similar to how robotics software separates localization, planning, perception, and control.

---

# Step-by-Step Execution Flow

## Step 1: Create the Canvas

```javascript
myCanvas.width = 600;
myCanvas.height = 600;
```

The canvas becomes the drawing surface.

Coordinate system:

```
(0,0)
  ●────────────► X
  │
  │
  ▼
  Y
```

Unlike traditional mathematics:

- X increases right.
- Y increases downward.

---

## Step 2: Create Drawing Context

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

## Step 3: Load Saved Graph

```javascript
const graphString = localStorage.getItem("graph");
```

The browser stores previously created roads.

### Serialization

Objects cannot be stored directly.

```
Graph Object
     │
JSON.stringify()
     │
     ▼
Text
```

When loading:

```
Text
 │
JSON.parse()
 │
 ▼
Graph Object
```

This process is called **serialization**.

---

## Step 4: Create Graph

```javascript
const graph =
graphInfo ? Graph.load(graphInfo)
          : new Graph();
```

This means:

- if saved data exists → restore it
- otherwise → create an empty graph

Memory structure:

```
graph
├── points[]
└── segments[]
```

---

## Step 5: Create World

```javascript
const world = new World(graph);
```

The graph only stores mathematical roads.

Example:

```
A────────B
```

The world transforms this into:

- road width
- lane boundaries
- buildings
- trees

Conceptually:

```
Graph

A──────B


World

🌳
██████████
- - - - -
██████████
      🏠
```

---

## Step 6: Create Viewport

```javascript
const viewport = new Viewport(myCanvas);
```

The viewport is the camera.

Instead of moving every object, the camera moves.

Real-world analogy:

- Unity Camera
- MuJoCo Camera
- ROS visualization camera

---

## Step 7: Create Graph Editor

```javascript
const graphEditor =
new GraphEditor(viewport, graph);
```

The editor receives:

- viewport
- graph

Responsibilities:

- detect mouse clicks
- create points
- connect segments
- delete elements

Screen coordinates are converted into world coordinates.

---

## Step 8: Save Initial Graph State

```javascript
let oldGraphHash = graph.hash();
```

A hash is a fingerprint of the graph.

Example:

```
A──B──C
```

Hash:

```
483829
```

After adding a road:

```
A──B──C──D
```

Hash changes.

This allows efficient change detection.

---

# The Animation Loop

The heart of the project.

```javascript
animate();
```

Inside:

```javascript
requestAnimationFrame(animate);
```

The browser calls this approximately:

```
60 times / second
```

Frame time:

<math value="\\frac{1}{60}=16.67\\text{ ms}"/>

Each frame performs:

```
Reset camera
      │
Check graph changes
      │
Generate world if needed
      │
Draw world
      │
Draw editor
      │
Next frame
```

This is exactly how game engines work.

---

# How `animate()` Works

## 1. Reset Viewport

```javascript
viewport.reset();
```

Transforms are cleared before drawing.

Without resetting:

```
Frame 1
translate(10)

Frame 2
translate(10)

Total = 20
```

Eventually everything would disappear.

Reset prevents accumulated transformations.

---

## 2. Detect Graph Changes

```javascript
if(graph.hash()!=oldGraphHash){
    world.generate();
}
```

Instead of regenerating roads every frame, regeneration only happens when the graph changes.

This is an optimization.

---

## 3. Calculate Camera Position

```javascript
const viewPoint =
scale(viewport.getOffset(), -1);
```

This is one of the most important mathematical operations.

Suppose:

Camera moves

```
(+100,+50)
```

Objects must appear to move opposite.

```
(-100,-50)
```

General transformation equation:

<math value="P_{camera}=P_{world}-T"/>

where

- <math value="P_{world}"/> = object position
- <math value="T"/> = camera translation

This same equation appears in:

- Robotics
- SLAM
- OpenGL
- MuJoCo
- Computer Vision

---

## 4. Draw the World

```javascript
world.draw(ctx, viewPoint);
```

The world is rendered from the camera's perspective.

---

## 5. Draw Graph Editor

```javascript
graphEditor.display();
```

The editor is drawn last.

Rendering order:

```
Roads
Buildings
Trees
Editor Points
Selection
```

This is called layered rendering.

---

# Save Function

```javascript
save(){
 localStorage.setItem(...)
}
```

Workflow:

```
Graph
 │
JSON.stringify()
 │
 ▼
Browser Storage
```

Closing the browser does not lose the map.

---

# Dispose Function

```javascript
dispose(){
 graphEditor.dispose();
}
```

Purpose:

- clear temporary selections
- remove editor state

---

# Mathematical Foundations

## 1. Cartesian Coordinates

Each point has:

<math value="P=(x,y)"/>

Example:

```
(120,250)
```

---

## 2. Graph Theory

The road network is a mathematical graph.

<math value="G=(V,E)"/>

where

- <math value="V"/> = vertices (points)
- <math value="E"/> = edges (segments)

Example:

```
A────B
     │
     C
```

This same representation is used in:

- GPS road maps
- A* path planning
- RRT*
- Navigation meshes

---

## 3. Translation

Moving every object by

<math value="T=(dx,dy)"/>

gives

<math value="P'=P+T"/>

Camera movement performs the opposite transformation.

---

## 4. Coordinate Transformation

Viewport converts between:

```
Screen Coordinates
        ↓
World Coordinates
```

Example:

Mouse click:

```
(420,180)
```

After camera transformation:

```
(620,-50)
```

This conversion is fundamental in robotics frame transformations.

---

## 5. Hashing

Hashing converts the graph into a unique numerical fingerprint.

Purpose:

- detect changes
- avoid unnecessary computation

Instead of comparing every point manually, one hash comparison determines whether regeneration is needed.

---

# Why This Matters for Robotics

This project quietly teaches many concepts used in professional robotics software.

| Project | Robotics Equivalent |
|----------|---------------------|
| Graph | Road Network |
| Point | Waypoint |
| Segment | Road Edge |
| Viewport | Camera Frame |
| World | Environment Model |
| Animation Loop | Control Loop |
| Hash | Map Change Detection |
| LocalStorage | Saved Map |

Later topics like:

- ROS2
- MuJoCo
- SLAM
- RRT*
- A*
- MPC

all build upon these same mathematical foundations.

---

# Current Learning Progress

- [x] HTML Canvas
- [x] Rendering Loop
- [x] Local Storage
- [x] Graph Representation
- [x] Viewport Transformations
- [x] World Generation Pipeline
- [ ] Polygon Operations
- [ ] Envelope Generation
- [ ] Road Intersections
- [ ] Lane Markings
- [ ] AI Cars
- [ ] Sensor Simulation
- [ ] Neural Network Training

---

# Key Takeaways

By this stage of the project, the editor already implements several professional software engineering and robotics concepts:

- Event-driven rendering using `requestAnimationFrame`
- Persistent map storage through JSON serialization
- Graph-based road representation
- Camera-based coordinate transformations
- Efficient world regeneration using hashing
- Layered rendering architecture

Although the project appears simple visually, its underlying architecture mirrors many of the foundational ideas used in game engines, autonomous vehicles, and robotics simulation environments.