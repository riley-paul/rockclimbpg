import React from "react";
import Logo from "./logo";
import type { LinkInfo } from "@/lib/types";
import NavMenu from "./nav-menu";
import { Separator } from "@radix-ui/themes";
import { ACCENT_COLOR } from "@/lib/constants";

const Header: React.FC<{ pathname: string; linkInfos: LinkInfo[] }> = ({
  pathname,
  linkInfos,
}) => {
  return (
    <>
      <div className="from-accent-10 to-accent-8 sticky top-0 h-1 w-full bg-linear-to-r"></div>
      <header className="container2 flex h-20 items-center justify-between gap-6">
        <Logo />
        <NavMenu pathname={pathname} linkInfos={linkInfos} />
      </header>
      <div className="container2">
        <Separator size="4" color={ACCENT_COLOR} className="opacity-50" />
      </div>
    </>
  );
};

export default Header;
