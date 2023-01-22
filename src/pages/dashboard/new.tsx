import Head from "next/head";
import { DashboardLayout } from "../../clients/layouts";
import DashboardBody from "../../clients/components/Dashboard";
import { NewBody } from "../../clients/components/New";


export default function DashboardNew() {
  return (
    <DashboardLayout>
      <Head>
        <title>
          New / Habit Pilot
        </title>
      </Head>
      <NewBody />
    </DashboardLayout>
  );
}
