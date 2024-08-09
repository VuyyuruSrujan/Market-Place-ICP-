import { AuthClient } from "@dfinity/auth-client";

// that is the url of the webapp for the internet identity. 
const IDENTITY_PROVIDER = "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943#authorize";
const MAX_TTL = 7 * 24 * 60 * 60 * 1000 * 1000 * 1000;
export async function getAuthClient() {
    return await AuthClient.create();
}


export async function logout() {
    const authClient = window.auth.client;
    authClient.logout();
    window.location.reload();
}