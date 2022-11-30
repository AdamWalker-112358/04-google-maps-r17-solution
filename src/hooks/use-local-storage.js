import { useState } from 'react';

export default function useLocalStorage(initialState, key) {

    const localStorageValue = JSON.parse(window.localStorage.getItem(key))
    const [state, setState] = useState(localStorageValue ?? initialState)
    
    function setLocalStorage(value) {
        window.localStorage.setItem(key, JSON.stringify(value))
        setState(value)
    }

    return [state, setLocalStorage]
}

