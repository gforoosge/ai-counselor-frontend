import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import tsEslint from 'typescript-eslint';

export default [
  {
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    }
  },
  ...pluginVue.configs['flat/recommended'],
  {
    // root: true,
    rules: {
      'vue/valid-template-root': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index']
        }
      ]
    }
  },
  eslintPluginPrettier
];
