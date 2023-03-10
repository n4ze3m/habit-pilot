import Head from "next/head";
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
