import { serverIP } from "../utils/GlobalConstants"

export function fetchToxInfo(queryName) {
    return fetch(`${serverIP}/api/tox/${queryName}`, {
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

export function fetchKEandAO(bioassay,effect) {
    return fetch(`${serverIP}/api/events/findByBioassay?bioassay=${bioassay}&effect=${effect}`, {
        method: 'POST',
        mode: "cors",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}