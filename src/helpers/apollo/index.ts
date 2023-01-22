import * as Realm from "realm-web";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const APP_ID = process.env.NEXT_PUBLIC_MONGO_DB_APP_ID as string;
// Add your Realm App ID
export const graphqlUri = `https://ap-southeast-1.aws.realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
// Local apps should use a local URI!
// const graphqlUri = `https://us-east-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// const graphqlUri = `https://eu-west-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// const graphqlUri = `https://ap-southeast-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// Connect to your MongoDB Realm app
const app = new Realm.App(APP_ID);
// Gets a valid Realm user access token to authenticate requests
export async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. Tokens must be refreshed after
    // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
    await app.currentUser.refreshAccessToken();
  }
  return app?.currentUser?.accessToken;
}
// Configure the ApolloClient to connect to your app's GraphQL endpoint
export const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUri,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      const headers = options?.headers as Record<string, string>;
      if (accessToken && headers) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      return await fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});
