const objectTemplate = {
    name: 'object app 2',
    type: 'template app 2'
};

describe('Test suite for Object Template 2', () => {
    test(`Object is named 'object app 2'`, () => {
        expect(objectTemplate.name).toBe('object app 2');
    })

    test(`Object is of type 'template app 2'`, () => {
        expect(objectTemplate.type).toBe('template app 2');
    })
})