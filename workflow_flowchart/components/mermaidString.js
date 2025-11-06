import { allShapes, roleDefaults, mapping } from "../data/consts.mjs";

export const generateMermaid = (diagramData) => {
    let str = "flowchart TB\n\n";

    // Group services by their group
    const servicesByGroup = {};
    diagramData.services?.forEach(service => {
        if (!servicesByGroup[service.group]) {
            servicesByGroup[service.group] = [];
        }
        servicesByGroup[service.group].push(service);
    });
    const edgesBySubgraph = {};
    const regularEdges = [];

    diagramData.edges.forEach((edge) => {
        if (edge.subgraph) {
            if (!edgesBySubgraph[edge.subgraph]) {
                edgesBySubgraph[edge.subgraph] = [];
            }
            edgesBySubgraph[edge.subgraph].push(edge);
        } else {
            regularEdges.push(edge);
        }
    });

    diagramData.groups?.forEach(group => {
        const services = servicesByGroup[group.id];
        if (!services || services.length === 0) return;


        //icon is not rendered, its jsut a string name, TO FIX
        const groupLabel = group.icon
            ? `"${group.icon} ${group.label}"`
            : `"${group.label}"`;
        const dirStr = group.direction ? `direction ${group.direction}` : "direction LR"
        str += `    subgraph ${group.id}[${groupLabel}]\n        ${dirStr}\n`;

        services.forEach(service => {
            // Determine shape: explicit shape > type default > rectangle
            let shapeTemplate;
            if (service.shapealias) {
                shapeTemplate = service.shapealias
            } else if (service.role && roleDefaults[service.role]) {
                shapeTemplate = roleDefaults[service.type];
            } else {
                shapeTemplate = allShapes.rectangle;
            }
            // console.log(shapeTemplate)   
            // If service has an icon, use icon shape syntax
            if (service.icon) {
                const form = getFormFromShape(service.shape || service.type);
                str += `        ${service.id}:::${service.status}@{ icon: "${service.icon}", form: "${form}", label: "${service.label}", pos: "b" }\n`;
            } else {
                str += `        ${service.id}:::${service.status}@{ shape: ${shapeTemplate}, label: "${service.label}", pos: "b" }\n`;
            }
        });

        const subgraphEdges = edgesBySubgraph[group.id]
        console.log(subgraphEdges)
        if (subgraphEdges && subgraphEdges.length > 0) {
            console.log("adding a subgraphedge")
            subgraphEdges.forEach(edge => {
                const label = edge.label ? ` |${edge.label}|` : '';
                str += `    ${edge.from} --> ${label} ${edge.to}\n`;
            })
        }

        str += `    end\n\n`;
    });


    if (regularEdges && regularEdges.length > 0) {
        regularEdges.forEach(edge => {
            const label = edge.label ? ` |${edge.label}|` : '';
            str += `    ${edge.from} --> ${label} ${edge.to}\n`;
        });
        str += "\n";
    }

    //subgraph group edges
    if (diagramData.groupEdges && diagramData.groupEdges.length > 0) {
        diagramData.groupEdges.forEach(groupEdge => {
            const label = groupEdge.label ? ` |${groupEdge.label}|` : '';
            str += `    ${groupEdge.from} ---> ${label} ${groupEdge.to}\n`;
        });
        str += "\n";
    }

    // Add click callbacks for each service
    diagramData.services?.forEach(service => {
        const detailsId = `${service.id.toLowerCase()}-details`;
        str += `    click ${service.id} href "#${detailsId}"\n`;
    });


    console.log(str)
    return str;
};

// Helper to map shape/type to icon form
const getFormFromShape = (shapeOrType) => {
    return mapping[shapeOrType] || 'rounded';
};
