import Head from "next/head";
import React from "react";
import ContextMenu from "./ContextMenu";
import PlayerBar from "./PlayerBar";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";

const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Clubhouse</title>
      </Head>

      <div className="flex flex-column justify-content-between h-screen">
        <div className="flex" style={{ gap: "2em" }}>
          <SideMenu />
          <main className="flex flex-column flex-1">
            <TopBar />
            <div className="flex">
              <ContextMenu />
              <div className="flex flex-1">{children}</div>
            </div>
          </main>
        </div>
        <PlayerBar />
      </div>
    </>
  );
};

export default Layout;
