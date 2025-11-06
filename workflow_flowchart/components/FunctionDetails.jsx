import { useCallback, useEffect, useState, useRef } from "react"



export default function FunctionDetails({ node, subgraphs }) {
    // console.log(`mapping component ${node.id}`) 
    const { label, status, type, id, description, input, output, functions, group } = node
    const [showAdvanced, setShowAdvanced] = useState(false);
    const subgraphsById = Object.fromEntries(
        subgraphs.map(group => [group.id, group])
    );
    const [height, setHeight] = useState("0px");
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const statusClass = {
        functional: 'functional',
        inProgress: 'in-progress',
        notStarted: 'not-started'
    }[status] || 'not-started';

    const statusTextMap = {
        functional: 'Functional',
        inProgress: 'In Progress',
        notStarted: 'To Be Implemented'
    };
    const statusText = statusTextMap[status] || 'To Implement';

    const statusColorMap = {
        'Functional': '#10b981',     // green
        'In Progress': '#fbbf24',    // yellow
        'To Be Implemented': '#f87171'    // red
    };
    const statusColor = statusColorMap[statusText] || '#ffffff';

    useEffect(() => {
        if (contentRef.current) {
            const newHeight = contentRef.current.scrollHeight;
            setHeight(`${newHeight}px`);
        }
    }, [showAdvanced]);

    // Recalculate height on window resize
    useEffect(() => {
        const handleResize = () => {

            if (contentRef.current) {
                const newHeight = contentRef.current.scrollHeight;
                setHeight(`${newHeight}px`);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const jumpToNode = useCallback((e) => {

        e.preventDefault()
        const nodeId = node.id
        const styleId = `[id^="flowchart-${nodeId}-"]`
        const targetElement = document.querySelector(styleId)
        console.log(targetElement)
        if (targetElement) {
            // Over jump a bit for "padding"
            const extraJump = window.innerHeight * 0.15;
            console.log(extraJump)
            // Calculate absolute position of the target element
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            // Final scroll position (Target Position - Offset)
            const finalScrollPosition = targetPosition - extraJump;
            // Smoothly scroll to the calculated position
            window.scrollTo({
                top: finalScrollPosition,
                behavior: 'smooth'
            });
        }
    }, [node])
    return (
        <section id={`${id.toLowerCase()}-details`}>
            <h3 className={statusClass}>{label}</h3>
            <div className="detail-section-wrapper">

                <div className="advanced-toggle-container">
                    <label className="advanced-toggle">
                        <input
                            type="checkbox"
                            checked={showAdvanced}
                            onChange={(e) => setShowAdvanced(e.target.checked)}
                        />
                        <span className="checkmark"><i className="fa-solid fa-check"></i></span>
                        <span className="toggle-label">Show Advanced Details</span>
                    </label>
                </div>
                <div
                    ref={containerRef}
                    className="detail-section-container"
                    style={{ height }}
                >
                    <div ref={contentRef} className="detail-section relative">
                        <DetailRow label="Status" value={statusText} style={{ color: statusColor }} />
                        <DetailRow label="Category" value={(
                            <span><i className={`fa-solid ${subgraphsById[group].icon.substring(3)}`}></i> {subgraphsById[group].label}</span>
                        )}
                            style={{ color: statusColor }}
                        />
                        <DetailRow label="Type" value={type} />
                        <DetailRow label="Node ID" value={id} style={{color: statusColor}} />
                        <DetailRow label="Description" value={description} />
                        <FunctionsList label="Functions" items={functions} showAdvanced={showAdvanced} />
                        <DetailRowList label="Inputs" items={input} showMetadata={true} listClass="input-list" showAdvanced={showAdvanced} />
                        <DetailRowList label="Outputs" items={output} listClass="output-list" showAdvanced={showAdvanced} />
                        <a onClick={jumpToNode} className="back-link">↑ Back to diagram</a>
                        <a href={`#${id.toLowerCase()}-details`} className="back-to-top">↑ Back to Top</a>
                    </div>
                </div>
            </div>
        </section >
    );
}



const ParamLabel = ({ name, description }) => {
    return (
        <>
            <strong>{name}</strong> &nbsp;—&nbsp; <span className="paramDesc">{description}</span>
        </>
    )
}

const DetailRow = ({ label, value, style = {}, className = '' }) => {
    return (
        <div className={`detail-row ${className}`}>
            <span className="detail-label">{label}:</span>
            <span className="detail-value" style={style}>{value}</span>
        </div>
    )
}

const PropertyList = ({ properties, indent = 0, colorType = 'default' }) => {
    if (!properties || !properties.length) return null;

    const borderColors = {
        input: '#60a5fa',
        output: '#a78bfa',
        default: '#374151'
    };

    return (
        <ul className="nested-list" style={{ marginLeft: `max(2dvw, ${indent * 20}px)` }}>
            {properties.map((prop, idx) => (
                <li key={idx} className="nested-item" style={{ borderLeftColor: borderColors[colorType] }}>
                    <code className="property-name">{prop.name}</code>
                    <span className="property-type"> ({prop.type})</span>
                    {prop.optional && <span className="optional"> [Optional]</span>}
                    {prop.example && <span className="property-example"> Ex. {JSON.stringify(prop.example)}</span>}
                    {prop.description && <div className="property-description">{prop.description}</div>}
                    {prop.items && (
                        <div className="property-items">
                            Items: <code>{prop.items.type}</code>
                            {prop.items.example && <span className="property-example"> Example: {JSON.stringify(prop.items.example)}</span>}
                        </div>
                    )}
                    {prop.properties && <div className="nested-list-wrapper"><PropertyList properties={prop.properties} indent={indent + 1} colorType={colorType} /></div>}
                </li>
            ))}
        </ul>
    );
};

const FunctionsList = ({ label, items, showAdvanced = false }) => {
    const borderColors = {
        input: '#fdba74',
        output: '#ea580c'
    };

    return (
        <div className="detail-row">
            <span className="detail-label">{label}:</span>
            <span className="detail-value tech-list">
                {items && items.length ? (
                    <ul className="tech-list">
                        {items.map((item, idx) => (
                            <li key={idx}>
                                <ParamLabel name={item.name} description={item.description} />
                                {showAdvanced && (
                                    <div className="advanced-wrapper">
                                        {item.input && item.input.length > 0 && (
                                            <div className="advanced-section">
                                                <span className="advanced-label">Inputs:</span>
                                                <ul className="nested-list">
                                                    {item.input.map((inp, inpIdx) => (
                                                        <li key={inpIdx} className="nested-item" style={{ borderLeftColor: borderColors.input }}>
                                                            <code className="property-name">{inp.name}</code>
                                                            <span className="property-type"> ({inp.type})</span>
                                                            {inp.description && <div className="property-description">{inp.description}</div>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {item.output && item.output.length > 0 && (
                                            <div className="advanced-section">
                                                <span className="advanced-label">Outputs:</span>
                                                <ul className="nested-list">
                                                    {item.output.map((out, outIdx) => (
                                                        <li key={outIdx} className="nested-item" style={{ borderLeftColor: borderColors.output }}>
                                                            <code className="property-name">{out.name}</code>
                                                            <span className="property-type"> ({out.type})</span>
                                                            {out.description && <div className="property-description">{out.description}</div>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    'None'
                )}
            </span>
        </div>
    )
}

const DetailRowList = ({ label, items, listClass = '', showAdvanced = false }) => {
    return (
        <div className="detail-row">
            <span className="detail-label">{label}:</span>
            <span className={`detail-value ${listClass}`}>
                {items && items.length ? (
                    <ul className={listClass}>
                        {items.map((item, idx) => (
                            <li key={idx}>
                                <ParamLabel name={item.name} description={item.description} />
                                {showAdvanced && item.properties && (
                                    <PropertyList properties={item.properties} indent={1} colorType={listClass === 'input-list' ? 'input' : listClass === 'output-list' ? 'output' : 'default'} />
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    'None'
                )}
            </span>
        </div>
    )
}


