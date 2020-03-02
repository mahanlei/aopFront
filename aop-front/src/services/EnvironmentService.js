import { serverIP } from "../utils/GlobalConstants"

export function fetchAoInfo(queryName) {
    return fetch(`${serverIP}/api/events/findAOsByQueryName?queryName=${queryName}`, {
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

export function fetchAopList(AoId) {
    return fetch(`${serverIP}/api/aops/findByAOId/${AoId}`, {
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

export function fetchDiagnoseResult(params) {
    return fetch(`${serverIP}/api/tox/diagnose?size=${2000}`, {
        method: 'POST',
        mode: "cors",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
        body: JSON.stringify(params),
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}