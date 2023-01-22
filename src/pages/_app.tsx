import { api } from "../utils/api";
import { Poppins } from "@next/font/google";
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});
import "../styles/globals.css";
import React from "react";
import { AppType } from "next/app";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthProvider } from "../clients/context/Auth";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59",
  );

  return {
    props: {},
  };
};

const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
        <style jsx global>
          {`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}
        </style>
        <MantineProvider
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
          emotionCache={myCache}
          theme={{
            colorScheme: "light",
            fontFamily: poppins.style.fontFamily,
          }}
        >
          <NotificationsProvider />
          <Component {...pageProps} />
        </MantineProvider>
      </AuthProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
