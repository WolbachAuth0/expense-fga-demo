const languageDefinition = {
  'comment': {
    pattern: /^\s*#.*/,
  },
  'keyword': /\b(type|relations|define|and|or|but not|from|as|model|schema|condition)\b/,
  'type': {
    pattern: /(\btype\s+)\w+/i,
    lookbehind: true,
    greedy: true,
  },
  'relation': {
    pattern: /(\bdefine\s+)\w+/i,
    lookbehind: true,
    greedy: true,
  },
  'directly-assignable': /\[.*]|self/,
  'condition': {
    pattern: /(\bcondition\s+)\w+/i,
    lookbehind: true,
    greedy: true,
  },
  "condition-params": {
    pattern: /\(.*\)\s*{/,
    inside: {
      "condition-param": /\b(\w+)\s*:/i,
      "condition-param-type": /\b(string|int|map|uint|list|timestamp|bool|duration|double|ipaddress)\b/,
    },
  },
}
export default languageDefinition