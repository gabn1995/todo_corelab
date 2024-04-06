import Cookies from "js-cookie";

const BASEAPI = 'http://localhost:8000/api';

let token = Cookies.get('token');

const apiFetch = async (method: string, endpoint: string, body?: {}) => {
    const res = await fetch(BASEAPI + endpoint, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();
    return json;
}

export const login = async (email: string, password: string) => {
    const json = await apiFetch(
        'POST',
        '/auth/login',
        { email, password }
    );
    
    return json;
}

export const register = async (name: string, email: string, password: string) => {
    const json = await apiFetch(
        'POST',
        '/user',
        { name,email, password }
    );
    
    return json;
}

export const me = async () => {
    const json = await apiFetch('POST', '/auth/me', {});
    return json;
}

export const createNote = async (title: string, body: string, favorite?: boolean) => {
    const dataUser = await me();
    let user_id = '';
    
    if(!dataUser.user){
        window.location.href = '/';
        return;
    }
    
    user_id = dataUser.user.id
    
    const json = await apiFetch(
        'POST',
        '/todo',
        { title, body, user_id, favorite}
    );
    
    return json;
}

export const readNotes = async () => {
    const json = await apiFetch('GET', '/todos');
    return json;  
}

export const changeFavorite = async (id: number) => {
    const json = await apiFetch('PUT', `/todo/${id}/favorite`);
    return json; 
}

export const editNote = async (id: number, title: string, body: string) => {
    const dataUser = await me();
    let user_id = '';
    
    if(!dataUser.user){
        window.location.href = '/';
        return;
    }
    
    user_id = dataUser.user.id

    const json = await apiFetch(
        'PUT',
        `/todo/${id}`,
        { title, body, user_id }
    );
    return json; 
}

export const changeColor= async (id: number, color: string) => {
    const json = await apiFetch('PUT', `/todo/${id}/color`, {color});
    return json; 
}

export const deleteNote = async (id: number) => {
    const json = await apiFetch('DELETE', `/todo/${id}`);
    return json; 
}