module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'rules': {
    'max-len': ['error', { 'code': 100 }],
  },
};
