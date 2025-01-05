import pluginJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['src/**/*.{ts, js}'],
    rules: {
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreDeclarationSort: true,
          ignoreCase: true,
          memberSyntaxSortOrder: ['all', 'multiple', 'single', 'none'],
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
    languageOptions: { globals: globals.browser },
  },
  {
    ignores: ['dist/**/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
