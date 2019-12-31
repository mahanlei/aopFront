import { serverIP } from "../utils/GlobalConstants"

export function fetchAopInfo(id) {
    return fetch(`${serverIP}/api/aops/${id}`, {
        method: 'GET',
        mode: "cors",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),

    }).then(res => res.json()).then((json) => {
        return json
    }).catch((err) => {
        return err
    })
}
export function fetchAopNodes(id) {
    const temp = [
        {
            "id":904,
            "sourceId":177,
            "sourceTitle":"N/A, Mitochondrial dysfunction 1",
            "targetId":889,
            "targetTitle":"Impaired, Proteostasis"
        },
        {
            "id":905,
            "sourceId":889,
            "sourceTitle":"Impaired, Proteostasis",
            "targetId":890,
            "targetTitle":"Degeneration of dopaminergic neurons of the nigrostriatal pathway"
        },
        {
            "id":906,
            "sourceId":188,
            "sourceTitle":"N/A, Neuroinflammation",
            "targetId":890,
            "targetTitle":"Degeneration of dopaminergic neurons of the nigrostriatal pathway"
        },
        {
            "id":907,
            "sourceId":890,
            "sourceTitle":"Degeneration of dopaminergic neurons of the nigrostriatal pathway",
            "targetId":188,
            "targetTitle":"N/A, Neuroinflammation"
        },
        {
            "id":908,
            "sourceId":177,
            "sourceTitle":"N/A, Mitochondrial dysfunction 1",
            "targetId":890,
            "targetTitle":"Degeneration of dopaminergic neurons of the nigrostriatal pathway"
        },
        {
            "id":910,
            "sourceId":890,
            "sourceTitle":"Degeneration of dopaminergic neurons of the nigrostriatal pathway",
            "targetId":896,
            "targetTitle":"Parkinsonian motor deficits"
        },
        {
            "id":933,
            "sourceId":888,
            "sourceTitle":"Binding of inhibitor, NADH-ubiquinone oxidoreductase (complex I)",
            "targetId":887,
            "targetTitle":"Inhibition, NADH-ubiquinone oxidoreductase (complex I)"
        },
        {
            "id":934,
            "sourceId":887,
            "sourceTitle":"Inhibition, NADH-ubiquinone oxidoreductase (complex I)",
            "targetId":177,
            "targetTitle":"N/A, Mitochondrial dysfunction 1"
        }
    ]
    return fetch(`${serverIP}/api/edges/search/findByAopId?aopId=${id}`, {
        method: 'GET',
        mode: "cors",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),

    }).then(res => res.json()).then((json) => {
        return temp
    }).catch((err) => {
        return err
    })
}