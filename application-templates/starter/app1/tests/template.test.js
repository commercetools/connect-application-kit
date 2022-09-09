const objectTemplate = {
    name: 'object app 1',
    type: 'template app 1'
};

describe('Test suite for Object Template 1', () => {
    test(`Object is named 'object app 1'`, () => {
        expect(objectTemplate.name).toBe('object app 1');
    })

    test(`Object is of type 'template app 1'`, () => {
        expect(objectTemplate.type).toBe('template app 1');
    })
})