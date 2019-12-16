import { serverIP } from "../utils/GlobalConstants"
export function fetchEventInfo(id) {
    return fetch(`${serverIP}/api/events/${id}`, {
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
export function fetchEventRelativeAops(id) {
    return fetch(`${serverIP}/api/events/search/relativeAops?eventId=${id}`, {
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
export function fetchEventBioassaysInfo(id){
    return fetch(`${serverIP}/api/bioassays/search/findByEventId?id=${id}`, {
        method: 'GET',
        mode: "cors",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),

    }).then(res => res.json()).then((json) => {
        return json._embedded.bioassays
    }).catch((err) => {
        return err
    })
}