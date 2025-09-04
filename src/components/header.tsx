import React from "react";
import Logo from "./logo";
import type { LinkInfo } from "@/lib/types";
import NavMenu from "./nav-menu";

const Header: React.FC<{ pathname: string; linkInfos: LinkInfo[] }> = ({
  pathname,
  linkInfos,
}) => {
  return (
    <>
      <div className="from-accent-10 to-accent-8 sticky top-0 h-1 w-full bg-linear-to-r"></div>
      <header className="container2 border-accent-5 flex h-20 items-center justify-between gap-6 border-b">
        <Logo />
        <NavMenu pathname={pathname} linkInfos={linkInfos} />
      </header>
    </>
  );
};

export default Header;
