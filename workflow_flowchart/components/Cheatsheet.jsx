import { allShapes, roleDefaults } from "../data/consts.mjs";
import { useState, useRef } from "react";

export default function CheatSheet() {
    const [expanded, setExpanded] = useState(false);
    const cheatSheetRef = useRef(null);
    const sectionsRef = useRef([]);

    const scrollToSection = (index) => {
        if (sectionsRef.current[index]) {
            sectionsRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToTop = () => {
        if (cheatSheetRef.current) {
            cheatSheetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="cheat-sheet" ref={cheatSheetRef}>
            <h2
                onClick={() => setExpanded(prev => !prev)}
                style={{ color: expanded ? '#ffffff' : '#9ca3af' }}
            >
                <span className={`arrow ${expanded ? 'expanded' : ''}`}>▶</span>
                Shapes Cheat Sheet
            </h2>

            <div className={`cheat-sheet-content ${expanded ? 'show' : 'hide'}`}>
                <h3 ref={el => sectionsRef.current[0] = el}>All Shapes

                    <button
                        onClick={() => scrollToSection(1)}
                        className="blue-button absoluteCheatSheet"
                    >
                        Next Section →
                    </button>
                </h3>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Semantic Name</th>
                                <th>Shape Name</th>
                                <th>Short Name</th>
                                <th>Description</th>
                                <th>Aliases</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allShapes.map(shape => (
                                <tr key={shape.shortName}>
                                    <td style={{ fontWeight: '700' }}>{shape.semanticName}</td>
                                    <td>{shape.shapeName}</td>
                                    <td><span className='highlighted'>{shape.shortName}</span></td>
                                    <td style={{ color: '#be95be', fontWeight: '600' }}>{shape.description}</td>
                                    <td>
                                        {shape.aliases.map((alias, i) => (
                                            <span key={i}>
                                                <span className="highlighted">{alias}</span>
                                                <span className={i < shape.aliases.length - 1 ? 'highlighted-commas' : ''} />
                                            </span>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h3 ref={el => sectionsRef.current[1] = el}>Role Defaults

                    <button onClick={scrollToTop} className="blue-button absoluteCheatSheet">Back to Top ↑</button>
                </h3>
                <div className="table-wrapper">
                    <table>
                        <colgroup>
                            <col style={{ width: '50%' }} />
                            <col style={{ width: '50%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Shape</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(roleDefaults).map(([role, shape]) => (
                                <tr key={role}>
                                    <td>{role}</td>
                                    <td><code>{shape}</code></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={() => {
                        setExpanded(false); // collapse
                        cheatSheetRef.current?.scrollIntoView(); // scroll up
                    }}
                    className="collapse-button"
                >
                    Collapse
                </button>
            </div>
        </div>
    );
}
