import { serverIP } from "../utils/GlobalConstants"

export function handleLogin(username,password) {
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
export function uploadFile(id) {
  
    return fetch(`${serverIP}/api/edges/search/findByAopId?aopId=${id}`, {
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