module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['expo-router/babel', { root: './app' }],
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@components': './src/presentation/components',
            '@screens': './src/presentation/screens',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@domain': './src/domain',
            '@core': './src/core',
            '@data': './src/data',
            '@i18n': './src/i18n',
            '@shared': './src/shared',
            '@stores': './src/presentation/stores'
          },
        },
      ],
    ],
  };
}; 