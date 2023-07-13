/**
 * @jest-environment jsdom
 */

test('my first test', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

