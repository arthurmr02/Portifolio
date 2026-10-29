import { describe, expect, it } from 'vitest';
import { formatRelativeDate } from './formatDate';
import { formatRepoName } from './formatRepoName';
import { languageShare } from './languageShare';

describe('formatRelativeDate', () => {
  const now = new Date('2026-10-29T12:00:00Z').getTime();
  const ago = (ms) => new Date(now - ms).toISOString();

  it('descreve datas em português', () => {
    expect(formatRelativeDate(ago(10_000), now)).toBe('agora mesmo');
    expect(formatRelativeDate(ago(3 * 3600_000), now)).toBe('há 3 horas');
    expect(formatRelativeDate(ago(3 * 86400_000), now)).toBe('há 3 dias');
    expect(formatRelativeDate(ago(86400_000), now)).toBe('ontem');
  });
});

describe('formatRepoName', () => {
  it('troca hífens e sublinhados por espaços', () => {
    expect(formatRepoName('meu-app_legal')).toBe('meu app legal');
  });
});

describe('languageShare', () => {
  it('calcula porcentagens ordenadas e agrupa as menores que 1% em "Outras"', () => {
    const shares = languageShare({ CSS: 100, JavaScript: 900, Shell: 1 });
    expect(shares.map((s) => s.language)).toEqual(['JavaScript', 'CSS', 'Outras']);
    expect(shares[0].percent).toBeCloseTo(89.91, 1);
    expect(shares.reduce((sum, s) => sum + s.percent, 0)).toBeCloseTo(100);
  });

  it('devolve lista vazia sem dados', () => {
    expect(languageShare({})).toEqual([]);
    expect(languageShare(undefined)).toEqual([]);
  });
});
