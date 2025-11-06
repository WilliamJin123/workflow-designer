import { useState } from 'react'
import Diagram from './components/Diagram'
import FunctionDetails from './components/FunctionDetails'
import CheatSheet from './components/Cheatsheet'
import IconPickerModal from './components/IconLookup'

import { functionalRoles } from './data/consts.mjs'
import './styles.mermaid.css'
import jsonData from './data/flowchart.json'


function App() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [fontAwesomeOpen, setfontAwesomeOpen] = useState(false)
  return (
    <div className='main'>
      <h1>E-commerce AI Workflow</h1>

      <div className="note">
        💡 <strong>Tip:</strong> Click on nodes in the diagram to jump to detailed documentation below.
      </div>

      <div className="description">
        This workflow visualizes my e-commerce AI system that I am currently working on, showing the entire architecture in a well-styled flowchart.

        <p>This website includes detailed information for all:</p>
        <ul>
          <li>Functions</li>
          <li>Databases</li>
          <li>Workflow steps</li>
          <li>APIs and services</li>
          <li>AI modules and decision points</li>
          <li>User interactions and inputs</li>
        </ul>

        <p>
          The final goal is to create an MCP server, connect it to a separate application for an easy-to-use UI,
          and allow the user to prompt "make me a store" to generate top-tier results automatically.
        </p>
      </div>

      <h2 id="diagram">Workflow Diagram</h2>
      <Diagram diagramData={jsonData} />
      <CheatSheet />
      <div className='flex gap-[2dvw]'>
        <button className="blue-button min-w-[15dvw] " id="icon-btn" onClick={() => setPickerOpen(true)}>All Icons</button>
        <IconPickerModal
          isOpen={pickerOpen}
          URL={"https://icones.js.org/"}
          onClose={() => setPickerOpen(false)}
        /> 
        <button className="blue-button min-w-[15dvw] " id="icon-btn" onClick={() => setfontAwesomeOpen(true)}>Fontawesome Icons</button>
        <IconPickerModal
          isOpen={fontAwesomeOpen}
          URL={"https://icones.js.org/collection/fa7-solid"}
          onClose={() => setfontAwesomeOpen(false)}
        />
      </div>
      <h2>Component Details</h2>
      {jsonData.services
        .filter(component => (functionalRoles.includes(component.role) | component.icon !== ""))
        .map((component, i) => (
          <FunctionDetails key={component.id} node={component} subgraphs={jsonData.groups}/>
        ))}
    </div>

  )
}

export default App


