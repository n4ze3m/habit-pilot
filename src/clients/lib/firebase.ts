import { initializeApp, getApps } from "firebase/app";


const firebaseCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}


const app = getApps().length ? getApps()[0] : initializeApp(firebaseCredentials);

export default app