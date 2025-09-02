import React from "react";
import Logo from "./logo";
import { Link } from "@radix-ui/themes";

type LinkInfo = {
  url: string;
  label: string;
  isActive: (pathname: string) => boolean;
  children?: LinkInfo[];
};

const linkInfos: LinkInfo[] = [
  {
    url: "/",
    label: "Home",
    isActive: (pathname) => pathname === "/",
  },
  {
    url: "/resources",
    label: "Resources",
    isActive: (pathname) => pathname.startsWith("/resources"),
  },
  {
    url: "/contact",
    label: "Contact",
    isActive: (pathname) => pathname === "/contact",
  },
];

const NavLink: React.FC<{ link: LinkInfo }> = ({
  link: { url, label, isActive },
}) => {
  return (
    <Link size="2" href={url}>
      {label}
    </Link>
  );
};

const Header: React.FC = () => {
  return (
    <header className="container2 flex h-16 items-center justify-between">
      <Logo />
      <section className="flex items-center gap-6">
        {linkInfos.map((link) => (
          <NavLink key={link.url} link={link} />
        ))}
      </section>
    </header>
  );
};

export default Header;
