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
          <div className="flex h-screen ">
            <div
              className="flex flex-grow"
              style={{ backgroundColor: "var(--surface-100)" }}
            >
              <SideMenu />
            </div>
            <div className="flex flex-column w-full h-screen">
              <div className="flex border-bottom-2 border-200">
                <TopBar />
              </div>
              <div className="flex">
                <div className="p-4 w-25rem overflow-y-scroll" style={{ height: 'calc(100vh - 5rem)' }}>
                  <ContextMenu />
                </div>
                <div
                  className="flex flex-1 border-left-2 border-200"
                  style={{ backgroundColor: "var(--surface-0)" }}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="sticky bottom-0">
            <PlayerBar />
        </div> */}
      </main>
    </>
  );
};

export default Layout;
