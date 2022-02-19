import React from "react";

const MainContent = ({ children }: any) => {
  return (
    <div
      className="flex flex-1 h-full border-left-2 border-200"
      style={{ backgroundColor: "var(--surface-0)" }}
    >
      {children}
    </div>
  );
};

export default MainContent;
