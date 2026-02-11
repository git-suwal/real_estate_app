import { Account, Client } from 'appwrite';

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('698a7641002001c7afd3'); // Your Project ID

export const account = new Account(client);

export default client;

