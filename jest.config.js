module.exports = {
  modulePaths: [
    "<rootDir>"
  ],
  roots: ["./functions/src"],
  transform: {},
  transformIgnorePatterns: [
    'node_modules/(?!@react-native-community/google-signin|react-native|reactxp-webview|react-pose-core|animated-pose|@react-native-community/async-storage|@invertase/react-native-apple-authentication)',
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsConfig: {
        // allow js in typescript
        allowJs: true,
      },
    },
  },
};
