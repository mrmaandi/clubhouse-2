import Head from "next/head";
import React from "react";
import ContextMenu from "./ContextMenu";
import MainContent from "./MainContent";
import PlayerBar from "./PlayerBar";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";

const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Clubhouse</title>
      </Head>

      <div className="flex flex-column h-screen">

          <div className="flex flex-1">
            <SideMenu />
            <main className="flex flex-column flex-1">
              <TopBar />
              <div className="flex flex-1">
                <ContextMenu />
                <MainContent>{children}</MainContent>
              </div>
            </main>
          </div>
        </div>
        <div className="flex">
            <PlayerBar />
        </div>
    </>
  );
};

export default Layout;
