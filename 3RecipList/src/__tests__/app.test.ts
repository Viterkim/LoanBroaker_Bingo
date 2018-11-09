import uuid from 'uuid-by-string';

test('Can generate a UUID', () => {
    expect(uuid('Test')).toBe("92AFB6EC-35D5-438D-AE3D-11E45DB44330");
})
