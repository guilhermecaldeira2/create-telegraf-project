module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@cli': './src/cli',
          '@config': './src/config',
          '@commands': './src/commands',
          '@modules': './src/modules',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', './src/templates'],
};
