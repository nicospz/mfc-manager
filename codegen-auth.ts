/* eslint-disable @typescript-eslint/no-var-requires */
// This script is used to generate a valid access token for the Realm GraphQL API
import { Credentials, App } from "realm-web";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fs from "fs";

dotenv.config();

const app = new App(process.env.NEXT_PUBLIC_MONGO_DB_APP_ID as string);

const writeToEnv = async () => {
  await app.logIn(Credentials.anonymous());
  const accessToken = app?.currentUser?.accessToken;
  fs.readFile("./.env", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const envVar = process.env.REALM_TOKEN;
    if (accessToken && envVar) {
      const re = new RegExp(envVar, "g");
      const result = data.replace(re, accessToken);

      fs.writeFile("./.env", result, "utf8", function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

void writeToEnv();
