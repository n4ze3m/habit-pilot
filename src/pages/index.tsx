import { type NextPage } from "next";
import Head from "next/head";
import { HomeBody } from "../clients/components/Home";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Habit Pilot</title>
      </Head>
      <HomeBody />
    </>
  );
};

export default Home;
