# Workflow Designer
PoC (good enough for personal use within VSC, directly pasting in your flowchart.json) for a Mermaid-based tech stack architecture flowchart generator. 

Change the flowchart.json accordingly. The example includes all functionalities for converting to function / component details and flowchart nodes.

Some Notes:
- Lots of unecessary iconify-js modules that I didn't end up using, skim through the package.json
- Click on nodes in the diagram to scroll to the detailed function information. Back to diagram takes you back to the same node.
- Tried my best to make the CSS responsive, and added a lot of animations to smooth out size readjustments.
- Color scheme and font selection needs work, but I ain't gonna do it. I think this app is a good demonstration of css and javascript usage in other areas.
- Seriously read up on some Mermaid documentation if you want to play with the JSON more deeply
Heres the VSC copilot generated overview:

# Workflow Flowchart Visualization App

A React-based application for visualizing and managing complex e-commerce workflows with interactive diagrams and detailed service information.

## Features

### 1. Interactive Architecture Diagram
- Visualizes the complete e-commerce workflow architecture
- Groups services by functional areas:

### 2. Service Visualization
- Displays services with:
  - Custom icons based on service type
  - Status indicators (in-progress, not-started)
  - Role classifications 
  - Detailed descriptions and functionality

### 3. Workflow Connections
- Shows relationships between services with labeled edges
- Groups related services into logical subgraphs
- Visualizes data flow between different workflow stages

### 4. Group Management
Each group represents a part of the workflow:

### 5. Technical Features
- Built with React and Vite
- Mermaid.js integration for diagram rendering
- Responsive design with mobile support
- Custom icon system with lookup functionality
- Component-based architecture
- API integration capabilities

### 6. UI Components
- Interactive Diagram View
- Function Details Panel
- Cheatsheet Component
- Icon Lookup System
- Mobile-optimized Layout

### 7. Data Management
- JSON-based configuration
- Service schema validation
- API hooks for data fetching
- Centralized state management

## Project Structure

```
src/
├── components/       # React components
├── data/            # JSON configuration files
├── all the stylesheets #cuz fuck you lol
└── main.jsx         # Application entry point
```

## Development

### Prerequisites
- Node.js
- npm/yarn
- Modern web browser

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Configuration

The application is configured through JSON files in the `data` directory:
- `flowchart.json`: Main workflow configuration
- `diagram.json`: Diagram layout settings
- `serviceSchema.json`: Service type definitions

## Mobile Support
- Responsive design adaptations
- Mobile-specific CSS
- Touch-friendly interactions


## Technologies Used
- React
- Vite
- Mermaid.js
- ESLint
- CSS Modules
