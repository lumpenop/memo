import { isFirstRender, increase } from '~/screen/menu/MenuFunc.ts';

test('isFirstRender', () => {
  expect(isFirstRender(true, jest.fn())).toBe(true);
});

test('increase', () => {
  expect(increase('a')).toBe('a1');
});
