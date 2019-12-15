import { serverIP } from "../utils/GlobalConstants"
export function fetchSearchResult(type, params) {
    return fetch(`${serverIP}/api/${type}/search/findByExample?size=${2000}`, {
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
export function fetchKEInfo(id) {
    return fetch(`${serverIP}/api/events/${id}`, {
        method: 'GET',
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
export function fetchKerSearchResult(params) {
    return fetch(`${serverIP}/api/edges/search/findByExample?size=${2000}`, {
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