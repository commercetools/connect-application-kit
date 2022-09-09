const objectTemplate = {
    name: 'object',
    type: 'template'
};

describe('Test suite for Object Template', () => {
    test(`Object is named 'object'`, () => {
        expect(objectTemplate.name).toBe('object');
    })

    test(`Object is of type 'template'`, () => {
        expect(objectTemplate.type).toBe('template');
    })
})