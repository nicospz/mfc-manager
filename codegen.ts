import { graphqlUri } from "./src/helpers/apollo/index";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  require: ["ts-node/register", "dotenv/config"],
  schema: {
    [graphqlUri]: {
      headers: { Authorization: `Bearer ${process.env.REALM_TOKEN as string}` },
    },
  },
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
