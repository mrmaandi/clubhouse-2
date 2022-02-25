import Head from "next/head";
import React from "react";
import PlayerBar from "../player/PlayerBar";
import SideMenu from "./SideMenu";

const MainLayout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Clubhouse</title>
      </Head>

      <main>
        <div className="flex flex-wrap">
          <SideMenu />
          <div className="flex flex-1 h-screen overflow-y-auto">{children}</div>
        </div>
      </main>
      <PlayerBar />
    </>
  );
};

export default MainLayout;
