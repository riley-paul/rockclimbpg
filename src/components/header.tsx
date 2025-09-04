import React from "react";
import Logo from "./logo";
import { Link } from "@radix-ui/themes";
import type { LinkInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import NavMenu from "./nav-menu";

const getIsActive = (url: string, pathname: string) => {
  if (url === "/") return pathname === "/";
  return pathname.startsWith(url);
};

const NavLink: React.FC<{ link: LinkInfo; pathname: string }> = ({
  link: { url, label, children },
  pathname,
}) => {
  const isActive = getIsActive(url, pathname);
  return (
    <Link
      size="2"
      href={url}
      color={isActive ? undefined : "gray"}
      className={cn(!isActive && "opacity-70!")}
    >
      <span className="flex items-center gap-1">
        {label}
        {children && <ChevronDownIcon className="size-3" />}
      </span>
    </Link>
  );
};

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
    </>
  );
};

export default Header;
