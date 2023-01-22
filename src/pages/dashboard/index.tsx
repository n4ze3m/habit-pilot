import Head from "next/head";

import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useAuth } from "../../clients/context/Auth";
import { DashboardLayout } from "../../clients/layouts";
import DashboardBody from "../../clients/components/Dashboard";



export default function Dashboard() {
  return (
    <DashboardLayout>
      <Head>
        <title>
          Dashboard / Habit Pilot
        </title>
      </Head>
      <DashboardBody />
    </DashboardLayout>
  );
}
