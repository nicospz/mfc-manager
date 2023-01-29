import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  require: ["ts-node/register", "dotenv/config"],
  schema: "http://localhost:8080/graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "src/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-operations",
        "typescript-react-apollo",
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
