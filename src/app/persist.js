export const loadState = (key = "cart") => {
    try {
        const serialized = localStorage.getItem(key);
        return serialized ? JSON.parse(serialized) : undefined;
    } catch {
        return undefined;
    }
};


export const saveState = (state, key = "cart") => {
    try {
        localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
        console.warn("LocalStorage kaydı başarısız:", err);
    }
};


