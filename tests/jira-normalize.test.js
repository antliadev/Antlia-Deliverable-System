import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeIssue } from '../lib/jiraService.js';

test('normalizeIssue persists raw changelog with authors and due date changes', () => {
  const normalized = normalizeIssue({
    id: '24721',
    key: 'ETF-31',
    fields: {
      summary: 'FR_03 Consulta Preços Ativos no SAC',
      status: { id: '10007', name: 'Testes', statusCategory: { name: 'Em andamento' } },
      project: { id: '10602', key: 'ETF', name: 'BNP - ETF Maps' },
      issuetype: { id: '10139', name: 'Desenvolvimento Avulso' },
      priority: { id: '3', name: 'Medium' },
      assignee: { accountId: 'william-id', displayName: 'William Fagotto' },
      created: '2026-03-04T20:09:02.575-0300',
      updated: '2026-09-30T14:53:08.826-0300',
      duedate: '2026-09-25',
      comment: { comments: [] },
    },
    changelog: {
      histories: [
        {
          id: '148076',
          created: '2026-09-24T23:46:12.078-0300',
          author: { accountId: 'william-id', displayName: 'William Fagotto' },
          items: [{ field: 'duedate', fieldId: 'duedate', from: '2026-09-24', fromString: '2026-09-24 00:00:00.0', to: '2026-09-25', toString: '2026-09-25 00:00:00.0' }],
        },
      ],
    },
  }, { baseUrl: 'https://antliaprojetos.atlassian.net' });

  assert.equal(normalized.status_name, 'Testes');
  assert.equal(normalized.raw_changelog.histories.length, 1);
  assert.equal(normalized.raw_changelog.histories[0].author.accountId, 'william-id');
  assert.equal(normalized.raw_changelog.histories[0].items[0].fieldId, 'duedate');
  assert.equal(normalized.raw_changelog.histories[0].items[0].fromString, '2026-09-24 00:00:00.0');
});
