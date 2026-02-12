import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser'; // Importing the missing function
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
export const config = {
    platform: 'com.jsm.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,

}

export const client = new Client();

client 
        .setEndpoint(config.endpoint!)
        .setProject(config.projectID!)
        .setPlatform(config.platform!)

export const avatar = new Avatars(client); // this will allow us to generate user avatars based on their email or name, which can be used in our app to display user profiles or icons
export const account = new Account(client); // this will allow us to create sessions, manage users, and handle authentication in our app


export async function login() {
    try {
      const redirectUri = Linking.createURL("/");
  
      const response = await account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri
      );
      if (!response) throw new Error("Create OAuth2 token failed");
  
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );
      if (browserResult.type !== "success")
        throw new Error("Create OAuth2 token failed");
  
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed");
  
      const session = await account.createSession(userId, secret);
      if (!session) throw new Error("Failed to create session");
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

export async function logout() {
    try {
        await account.deleteSession("current");
        return true;
    } catch (error) {
        console.error("Logout error:", error);
        return false;
    }
}
export async function getCurrentUser(  _params: Record<string, string | number>
) { 
    try {
        const response = await account.get();
        if(response.$id){
            const userAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString(),
            }
        }
    } catch (error) {
        console.error("Get user error:", error);
        return null;
    }
}