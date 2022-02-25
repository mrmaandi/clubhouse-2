import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../components/layout/MainLayout";
import { RecoilRoot } from "recoil";
import { ParallaxProvider } from "react-scroll-parallax";

export const AMAZON_URL =
  "https://clubhouse-sample-flips.s3.eu-north-1.amazonaws.com";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ParallaxProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ParallaxProvider>
    </RecoilRoot>
  );
}

export default MyApp;
