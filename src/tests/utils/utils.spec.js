import { mergeName } from "../../utils/utils";

describe('utils tests', () => {
    it('mergeName', () => {
        const user = { name: 'huso', lastName: 'husic' }

        expect(mergeName(user)).toBe('huso husic');
    })

    it('dummy test', () => {

        expect('test').toBe('te');
    })
})