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

let storageMock = new LocalStorageMock()

beforeEach(() => {
    initialize();
    Object.defineProperty(window, 'localStorage', {
        value: storageMock,
        writable: true
    })
});
