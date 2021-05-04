import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
});

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
        this.store[key] = value.toString();
    }
    removeItem(key) {
        delete this.store[key];
    }
}

const localStorage = new LocalStorageMock();

// jest test environment expects these to exist
window.localStorage = localStorage