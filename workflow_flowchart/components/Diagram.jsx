import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react'
import mermaid from "mermaid"
import { generateMermaid } from './mermaidString';






export default function Diagram({ diagramData }) {
    const containerRef = useRef(null);
    const diagramRef = useRef(null);
    const textRef = useRef(null);
    // '#64748b'
    const mermaidInit = () => {
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'dark',
            themeVariables: {
                darkMode: true,
                primaryColor: '#f0f9ff',
                primaryTextColor: '#0c4a6e',
                primaryBorderColor: '#0ea5e9',
                lineColor: 'gray',
                secondaryColor: '#fef3c7',
                tertiaryColor: '#f0fdf4',
                fontSize: '16px',
                fontWeight: '700',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
            },
            flowchart: {
                'useMaxWidth': true,
                'htmlLabels': true,
                'curve': 'basis',
                'nodeSpacing': 80,
                'rankSpacing': 125,
                'defaultRenderer': 'elk',
                'subGraphTitleMargin': {
                    'top': 15,
                },
                clusterBkg: '#000000',
                clusterBorder: '#374151',
                padding: 0,
            },
        });
        // Register each icon pack explicitly
        mermaid.registerIconPacks([
            {
                name: 'logos',
                loader: () => import('@iconify-json/logos').then((module) => module.icons),
            },
            {
                name: 'ri',
                loader: () => import('@iconify-json/ri').then((module) => module.icons),
            },
            {
                name: 'lucide',
                loader: () => import('@iconify-json/lucide').then((module) => module.icons),
            },
            {
                name: 'mdi',
                loader: () => import('@iconify-json/mdi').then((module) => module.icons),
            },
            {
                name: 'fa-solid',
                loader: () => import('@iconify-json/fa-solid').then((module) => module.icons),
            },
            {
                name: 'simple-icons',
                loader: () => import('@iconify-json/simple-icons').then((module) => module.icons),
            },
            {
                name: 'material-symbols',
                loader: () => import('@iconify-json/material-symbols').then((module) => module.icons),
            },
            {
                name: 'streamline-logos',
                loader: () => import('@iconify-json/streamline-logos').then((module) => module.icons),
            },
            {
                name: 'material-symbols-light',
                loader: () => import('@iconify-json/material-symbols-light').then((module) => module.icons),
            },
        ]);
    }

    const [showText, setShowText] = useState(false);
    const [height, setHeight] = useState("0px");

    const mermaidString = useMemo(() => {

        if (!diagramData) return "";
        return generateMermaid(diagramData);
    }, [diagramData]);

    // Generate mermaid string
    useLayoutEffect (mermaidInit, [])
    useLayoutEffect(() => {
        const renderDiagram = async () => {
            const id = `mermaid-${Date.now()}`;
            try {
                // The heavy lifting: rendering the SVG
                const { svg } = await mermaid.render(id, mermaidString);

                // Update the DOM element
                diagramRef.current.innerHTML = svg;

                // Apply post-render styles
                applyNodeStatusClasses(diagramData);
                addTextPadding();

                // Update height after rendering is complete
                setHeight(diagramRef.current.scrollHeight);
            } catch (err) {
                console.error('Mermaid render error:', err);
            }
        };
        if (!mermaidString || !diagramRef.current) return;
        if (!showText) {
             renderDiagram();
        }
        window.addEventListener('resize', async () => {
            const newHeight = showText
                ? textRef.current?.scrollHeight || 0
                : diagramRef.current?.scrollHeight || 0;
            setHeight(newHeight)
            containerRef.current.scrollHeight = newHeight
            if (!showText) {renderDiagram()}
        })
    }, [diagramData, mermaidString, showText]);

    useEffect(() => {
        const newHeight = showText
            ? textRef.current?.scrollHeight || 0
            : diagramRef.current?.scrollHeight || 0;
        setHeight(newHeight);
    }, [showText, mermaidString, diagramRef, textRef]);


    return (
        <div className="diagram-container min-h-[50vh]">
            <div className="flex justify-evenly gap-5 items-center sm:gap-0">
                <Legend />
                <button
                    className="blue-button w-[25%] min-h-[7vh]"
                    onClick={() => setShowText(prev => !prev)}
                >
                    {showText ? 'Show Diagram' : 'Show Mermaid Markdown'}
                </button>
            </div>

            <div
                ref={containerRef}
                className="container-mermaid transition-all duration-500 ease-in-out flex justify-center align-center"
                style={{ height: `${height}px` }}
            >
                <div
                    ref={diagramRef}
                    className="mermaid"
                    style={{ display: showText ? 'none' : 'flex' }}
                />
                <div
                    ref={textRef}
                    className="flex justify-center"
                    style={{ display: showText ? 'flex' : 'none' }}
                >
                    <pre className="text-left rounded-[20px] whitespace-pre-wrap p-5 bg-[#0f0f0f]">
                        {mermaidString}
                    </pre>
                </div>
            </div>
        </div>
    );
}


function Legend() {
    return (
        <>
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-color legend-working"></div>
                    <span>Functional</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color legend-in-progress"></div>
                    <span>In Progress</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color legend-not-started"></div>
                    <span>Not Started</span>
                </div>
            </div>
        </>
    )
}

function applyNodeStatusClasses(diagramData) {
    if (!diagramData) return;

    diagramData.services.forEach((service, i) => {

        // Select the <g> element for that node by selecting <a> by id and then finding child
        const queryString = `[id^="flowchart-${service.id}-"]`
        const nodeEl = document.querySelector(queryString)
        // console.log(nodeEl) 
        if (nodeEl) {
            nodeEl.classList.add(service.status); // e.g., "functional", "inProgress", "notStarted"
            // console.log(`applied ${service.status} for ${service.id}`)
        } else {
            console.warn('Node not found for', service.id);
        }
    });
}

function addTextPadding() {
    const foreignObjects = document.querySelectorAll('.icon-shape > g.label > foreignObject');
    const xOffset = 10;
    const yOffset = 10;

    foreignObjects.forEach(object => {
        const width = parseFloat(object.getAttribute('width'));
        const height = parseFloat(object.getAttribute('height'));
        const x = object.getAttribute('x');
        const y = object.getAttribute('y');
        object.setAttribute('width', width + xOffset);
        object.setAttribute('height', height + yOffset);
        object.setAttribute('x', x - xOffset / 2);
        object.setAttribute('y', y + yOffset / 2);

        const div = object.querySelector('div');
        if (div) {
            const didvwidth = parseFloat(getComputedStyle(div).width);
            const divHeight = parseFloat(getComputedStyle(div).height);

            div.style.width = `${didvwidth + xOffset}px`;
            div.style.height = `${divHeight + yOffset}px`;
            const span = div.querySelector('span');
            if (span) {
                // console.log(`adding artificial padding to nodeLabel: span ${span.textContent}`);
                // console.log('y', div.style.height)
                span.style.display = 'inline-block'
                span.style.width = `${div.style.width}`;
                span.style.height = `${div.style.height}`;
                span.style.textAlign = 'center';
            }
        }

    });
}