import { NextPage } from "next";
import Head from "next/head";
import LoginBody from "../clients/components/Login";

const Auth: NextPage = () => {
  return (
    <>
      <Head>
        <title>Auth / Habit Pilot</title>
      </Head>
      <LoginBody />
    </>
  );
};

export default Auth;