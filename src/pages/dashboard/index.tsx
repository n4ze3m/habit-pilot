import Head from "next/head";

import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useAuth } from "../../clients/context/Auth";



export default function Dashboard() {
  const {user} = useAuth()
  return (
    <>
      <p>
        [<Link href="/">Home</Link>] | [
        <Link href="/protected-page">server-side RLS</Link>]
      </p>

      {JSON.stringify(user)}
    </>
  );
}
