module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
}
