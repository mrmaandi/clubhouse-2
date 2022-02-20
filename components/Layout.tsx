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

      <main className="overflow-hidden">
        <div className="flex flex-column flex-1">
          <div className="flex">
            <div
              className="flex flex-grow"
              style={{ backgroundColor: "var(--surface-100)" }}
            >
              <SideMenu />
            </div>
            <div className="flex flex-column w-full">
              <div className="flex border-bottom-2 border-200">
                <TopBar />
              </div>
              {children}
            </div>
          </div>
        </div>
        <div className="flex h-5rem">
          <PlayerBar />
        </div>
      </main>
    </>
  );
};

export default Layout;
