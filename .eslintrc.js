module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:@next/next/recommended",
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:storybook/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  overrides: [],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: "./",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  plugins: ["react", "unused-imports", "@typescript-eslint", "import"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        multilineDetection: "brackets",
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "import/order": "error",
    "promise/param-names": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    semi: ["error", "always"],
    "unused-imports/no-unused-imports": "error",
    "import/no-unresolved": "error",
    "@typescript-eslint/consistent-type-imports": "off",
    "@next/next/no-img-element": "off",
    "import/no-named-as-default-member": "off",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "indent": ["error", 2]
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["./tsconfig.json", "./server/tsconfig.json"],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/internal-regex": "^@",
  },
};
