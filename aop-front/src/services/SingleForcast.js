import { serverIP } from "../utils/GlobalConstants"

export function fetchToxInfo(params) {
    console.log(params)
    return fetch(`${serverIP}/api/tox/${params.name}?size=${params.size}&page=${params.page}&sort=${params.ac50Sort}&sort=${params.resSort}`, {
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

export function fetchToxReport(queryName) {
    return fetch(`${serverIP}/api/tox/report/${queryName}?size=${2000}`, {
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

export function fetchToxTableAll(queryName) {
    return fetch(`${serverIP}/api/tox/collect/${queryName}?size=${2000}`, {
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

export function fetchAllInfo(params) {
    console.log(params)
    return fetch(`${serverIP}/api/tox/all?size=${params.size}&page=${params.page}&sort=${params.ac50Sort}&sort=${params.resSort}`, {
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
