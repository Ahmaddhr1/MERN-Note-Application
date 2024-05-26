const storeInsession = (key,value) => {
    return sessionStorage.setItem(key,value);
}
const lookInsession = (key) => {
    return sessionStorage.getItem(key);
}

const removeFromsession = (key) => {
    return sessionStorage.removeItem(key);
}

export {storeInsession, lookInsession, removeFromsession}