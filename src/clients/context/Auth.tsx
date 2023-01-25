import firebaseApp from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import React from "react";
import { useRouter } from "next/router";
import { Loading } from "../components/Common/Loading";
import { api } from "../../utils/api";
import Head from "next/head";

interface AuthContextType {
  user: User | null;
  googleLogin: ({
    popup,
  }: {
    popup: boolean;
  }) => Promise<UserCredential>;
  emailPasswordLogin: ({
    email,
    password,
    signup,
  }: {
    email: string;
    password: string;
    signup: boolean;
  }) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const auth = getAuth(firebaseApp);
export const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const useAuthHome = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const noAuthRoutes = ["/", "/auth"];

  const { mutateAsync: checkUser } = api.user.isLoggedIn.useMutation();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await checkUser();
        if (!data) {
          await signOut(auth);
          setUser(null);
          setLoading(false);
          return;
        } else {
          setUser(user);
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);

        if (!noAuthRoutes.includes(router.pathname)) {
          router.push("/auth");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const googleLogin = async ({
    popup,
  }: {
    popup: boolean;
  }) => {
    return popup
      ? await signInWithPopup(auth, new GoogleAuthProvider())
      : await signInWithRedirect(auth, new GoogleAuthProvider());
  };

  const logout = async () => {
    router.push("/");
    setUser(null);
    await signOut(auth);
  };

  const emailPasswordLogin = async ({
    email,
    password,
    signup,
  }: {
    email: string;
    password: string;
    signup: boolean;
  }) => {
    if (signup) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(response.user);
      return response;
    }
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (!response.user.emailVerified) {
      throw new Error("Email not verified");
    }
    return response;
  };

  const value = { user, googleLogin, emailPasswordLogin, logout };

  return (
    <AuthContext.Provider value={value}>
      {noAuthRoutes.includes(router.pathname)
        ? (
          children
        )
        : !loading
        ? (
          children
        )
        : (
          <>
            <Head>
              <title>Loading...</title>
            </Head>
            <Loading />
          </>
        )}
    </AuthContext.Provider>
  );
};
