import React from "react";
import Logo from "./logo";
import { Link } from "@radix-ui/themes";
import type { LinkInfo } from "@/lib/types";
import { getLinkInfos } from "@/lib/helpers";
import { cn } from "@/lib/utils";

const NavLink: React.FC<{ link: LinkInfo; pathname: string }> = ({
  link: { url, label, isActive },
  pathname,
}) => {
  const active = isActive(pathname);
  return (
    <Link
      size="2"
      href={url}
      color={active ? undefined : "gray"}
      className={cn(!active && "opacity-70!")}
    >
      {label}
    </Link>
  );
};

const Header: React.FC<{ pathname: string }> = ({ pathname }) => {
  const linkInfos = getLinkInfos();
  return (
    <header className="container2 flex h-20 items-center justify-between">
      <Logo />
      <section className="flex items-center gap-6">
        {linkInfos.map((link) => (
          <NavLink key={link.url} link={link} pathname={pathname} />
        ))}
      </section>
    </header>
  );
};

export default Header;
