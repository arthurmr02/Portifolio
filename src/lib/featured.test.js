import { describe, expect, it } from 'vitest';
import { selectFeaturedRepos } from './featured';

const repos = ['a', 'b', 'c', 'd', 'e'].map((name, id) => ({ id, name }));

describe('selectFeaturedRepos', () => {
  it('usa exatamente os destaques escolhidos, na ordem marcada', () => {
    const result = selectFeaturedRepos(repos, ['d', 'b']);
    expect(result.map((r) => r.name)).toEqual(['d', 'b']);
  });

  it('ignora destaques de repositórios que não existem mais e compara sem diferenciar maiúsculas', () => {
    const result = selectFeaturedRepos(repos, ['removido', 'C']);
    expect(result.map((r) => r.name)).toEqual(['c']);
  });

  it('sem destaques, mostra os mais recentes (primeiros da lista já ordenada)', () => {
    expect(selectFeaturedRepos(repos, []).map((r) => r.name)).toEqual(['a', 'b', 'c']);
    expect(selectFeaturedRepos(repos, ['removido']).map((r) => r.name)).toEqual([
      'a',
      'b',
      'c',
    ]);
  });
});
