export const allShapes = [
    { semanticName: "Process", shapeName: "Rectangle", shortName: "rect", description: "Standard process shape", aliases: ["proc", "process", "rectangle"] },
    { semanticName: "Event", shapeName: "Rounded Rectangle", shortName: "rounded", description: "Represents an event", aliases: ["event"] },
    { semanticName: "Terminal Point", shapeName: "Stadium", shortName: "stadium", description: "Terminal point", aliases: ["terminal", "pill"] },
    { semanticName: "Subprocess", shapeName: "Framed Rectangle", shortName: "fr-rect", description: "Subprocess", aliases: ["subprocess", "subproc", "framed-rectangle", "subroutine"] },
    { semanticName: "Database", shapeName: "Cylinder", shortName: "cyl", description: "Database storage", aliases: ["db", "database", "cylinder"] },
    { semanticName: "Start", shapeName: "Circle", shortName: "circle", description: "Starting point", aliases: ["circ"] },
    { semanticName: "Odd", shapeName: "Odd", shortName: "odd", description: "Odd shape", aliases: [] },
    { semanticName: "Decision", shapeName: "Diamond", shortName: "diam", description: "Decision-making step", aliases: ["decision", "diamond"] },
    { semanticName: "Prepare Conditional", shapeName: "Hexagon", shortName: "hex", description: "Preparation or condition step", aliases: ["hexagon", "prepare"] },
    { semanticName: "Data Input/Output", shapeName: "Lean Right", shortName: "lean-r", description: "Represents input or output", aliases: ["lean-right", "in-out"] },
    { semanticName: "Data Input/Output", shapeName: "Lean Left", shortName: "lean-l", description: "Represents output or input", aliases: ["lean-left", "out-in"] },
    { semanticName: "Priority Action", shapeName: "Trapezoid Base Bottom", shortName: "trap-b", description: "Priority action", aliases: ["priority", "trapezoid-bottom"] },
    { semanticName: "Manual Operation", shapeName: "Trapezoid Base Top", shortName: "trap-t", description: "Represents a manual task", aliases: ["manual", "trapezoid-top"] },
    { semanticName: "Stop", shapeName: "Double Circle", shortName: "dbl-circ", description: "Represents a stop point", aliases: ["double-circle"] },
    { semanticName: "Text Block", shapeName: "Text Block", shortName: "text", description: "Text block", aliases: ['-'] },
    { semanticName: "Card", shapeName: "Notched Rectangle", shortName: "notch-rect", description: "Represents a card", aliases: ["card", "notched-rectangle"] },
    { semanticName: "Lined/Shaded Process", shapeName: "Lined Rectangle", shortName: "lin-rect", description: "Lined process shape", aliases: ["lined-rectangle", "lined-proc", "lin-proc", "shaded-process"] },
    { semanticName: "Start", shapeName: "Small Circle", shortName: "sm-circ", description: "Small starting point", aliases: ["start", "small-circle"] },
    { semanticName: "Stop", shapeName: "Framed Circle", shortName: "fr-circ", description: "Stop point", aliases: ["stop", "framed-circle"] },
    { semanticName: "Fork/Join", shapeName: "Filled Rectangle", shortName: "fork", description: "Fork or join in process flow", aliases: ["join"] },
    { semanticName: "Collate", shapeName: "Hourglass", shortName: "hourglass", description: "Represents a collate operation", aliases: ["hourglass"] },
    { semanticName: "Comment", shapeName: "Curly Brace", shortName: "brace", description: "Adds a comment", aliases: ["comment", "brace-l"] },
    { semanticName: "Comment Right", shapeName: "Curly Brace", shortName: "brace-r", description: "Adds a comment", aliases: [] },
    { semanticName: "Comment with braces on both sides", shapeName: "Curly Braces", shortName: "braces", description: "Adds a comment", aliases: [] },
    { semanticName: "Com Link", shapeName: "Lightning Bolt", shortName: "bolt", description: "Communication link", aliases: ["com-link", "lightning-bolt"] },
    { semanticName: "Document", shapeName: "Document", shortName: "doc", description: "Represents a document", aliases: ["doc", "document"] },
    { semanticName: "Delay", shapeName: "Half-Rounded Rectangle", shortName: "delay", description: "Represents a delay", aliases: ["half-rounded-rectangle"] },
    { semanticName: "Direct Access Storage", shapeName: "Horizontal Cylinder", shortName: "h-cyl", description: "Direct access storage", aliases: ["das", "horizontal-cylinder"] },
    { semanticName: "Disk Storage", shapeName: "Lined Cylinder", shortName: "lin-cyl", description: "Disk storage", aliases: ["disk", "lined-cylinder"] },
    { semanticName: "Display", shapeName: "Curved Trapezoid", shortName: "curv-trap", description: "Represents a display", aliases: ["curved-trapezoid", "display"] },
    { semanticName: "Divided Process", shapeName: "Divided Rectangle", shortName: "div-rect", description: "Divided process shape", aliases: ["div-proc", "divided-rectangle", "divided-process"] },
    { semanticName: "Extract", shapeName: "Triangle", shortName: "tri", description: "Extraction process", aliases: ["extract", "triangle"] },
    { semanticName: "Internal Storage", shapeName: "Window Pane", shortName: "win-pane", description: "Internal storage", aliases: ["internal-storage", "window-pane"] },
    { semanticName: "Junction", shapeName: "Filled Circle", shortName: "f-circ", description: "Junction point", aliases: ["junction", "filled-circle"] },
    { semanticName: "Lined Document", shapeName: "Lined Document", shortName: "lin-doc", description: "Lined document", aliases: ["lined-document"] },
    { semanticName: "Loop Limit", shapeName: "Trapezoidal Pentagon", shortName: "notch-pent", description: "Loop limit step", aliases: ["loop-limit", "notched-pentagon"] },
    { semanticName: "Manual File", shapeName: "Flipped Triangle", shortName: "flip-tri", description: "Manual file operation", aliases: ["manual-file", "flipped-triangle"] },
    { semanticName: "Manual Input", shapeName: "Sloped Rectangle", shortName: "sl-rect", description: "Manual input step", aliases: ["manual-input", "sloped-rectangle"] },
    { semanticName: "Multi-Document", shapeName: "Stacked Document", shortName: "docs", description: "Multiple documents", aliases: ["documents", "st-doc", "stacked-document"] },
    { semanticName: "Multi-Process", shapeName: "Stacked Rectangle", shortName: "st-rect", description: "Multiple processes", aliases: ["procs", "processes", "stacked-rect"] },
    { semanticName: "Paper Tape", shapeName: "Flag", shortName: "flag", description: "Paper tape", aliases: ["paper-tape"] },
    { semanticName: "Stored Data", shapeName: "Bow Tie Rectangle", shortName: "bow-rect", description: "Stored data", aliases: ["stored-data", "bow-tie-rectangle"] },
    { semanticName: "Summary", shapeName: "Crossed Circle", shortName: "cross-circ", description: "Summary", aliases: ["summary", "crossed-circle"] },
    { semanticName: "Tagged Document", shapeName: "Tagged Document", shortName: "tag-doc", description: "Tagged document", aliases: ["tag-doc", "tagged-document"] },
    { semanticName: "Tagged Process", shapeName: "Tagged Rectangle", shortName: "tag-rect", description: "Tagged process", aliases: ["tagged-rectangle", "tag-proc", "tagged-process"] }
];


export const roleDefaults = {
    start: 'circ',       // first alias of "Circle"
    end: 'double-circle',// first alias of "Double Circle"
    api: 'subprocess',   // first alias of "Framed Rectangle"
    database: 'db',      // first alias of "Cylinder"
    ai: 'hexagon',       // first alias of "Hexagon"
    decision: 'decision',// first alias of "Diamond"
    userInput: 'lean-right', // first alias of "Lean Right"
    output: 'lean-left', // first alias of "Lean Left"
    process: 'proc',     // first alias of "Rectangle"
    phase: 'event',      // first alias of "Rounded Rectangle"
    mcp: 'hexagon',      // first alias of "Hexagon"
    scraper: 'lean-right', // first alias of "Lean Right"
    webhook: 'com-link'  // first alias of "Lightning Bolt"
};

export const functionalRoles = ['api', 'ai', 'process', 'mcp', 'scraper', 'webhook'];

export const mapping = {
    // Explicit shapes
    rectangle: 'square',
    roundedRectangle: 'rounded',
    stadium: 'rounded',
    subroutine: 'square',
    cylindrical: 'rounded',
    circle: 'circle',
    hexagon: 'circle',
    rhombus: 'square',

    // Roles
    api: 'square',
    database: 'rounded',
    ai: 'circle',
    decision: 'square',
    process: 'square',
    phase: 'rounded',
    mcp: 'circle',
    scraper: 'square',
    webhook: 'square'
};

export const statuses = ['inProgress', 'notStarted', 'functional']
