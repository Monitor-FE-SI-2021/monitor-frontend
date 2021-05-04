import { initialize } from "@googlemaps/jest-mocks";

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
};

let storage;

beforeEach(() => {
    initialize();
    storage = window.localStorage;
    window.localStorage = new LocalStorageMock();
});

afterEach(() => {
    window.localStorage = storage
})

