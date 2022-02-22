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

      <main>
        <div className="flex">
          <SideMenu />
          <div className="flex flex-1 h-screen overflow-y-auto">{children}</div>
        </div>
      </main>
      {/*         <div className="flex h-5rem">
          <PlayerBar />
        </div> */}
    </>
  );
};

export default Layout;
