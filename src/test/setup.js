import '@testing-library/jest-dom/vitest';

// O jsdom não implementa estas APIs do navegador; versões mínimas bastam para os testes.
window.scrollTo = () => {};
window.matchMedia ??= (query) => ({
  matches: false,
  media: query,
  addEventListener: () => {},
  removeEventListener: () => {},
});
