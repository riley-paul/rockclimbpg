import React from "react";
import Logo from "./logo";
import { Link } from "@radix-ui/themes";
import type { LinkInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";

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
    <header className="from-gray-1 sticky top-0 bg-linear-to-b/shorter to-transparent">
      <div className="from-accent-10 to-accent-8 h-1 w-full bg-linear-to-r"></div>
      <article className="container2 flex h-20 items-center justify-between gap-6">
        <Logo />
        <NavigationMenu.Root>
          <NavigationMenu.List className="flex items-center gap-6">
            {linkInfos.map((link) => {
              if (link.children) {
                return (
                  <NavigationMenu.Item className="relative" key={link.url}>
                    <NavigationMenu.Trigger>
                      <NavLink link={link} pathname={pathname} />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-0 left-0">
                      hello
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                );
              }

              return (
                <NavigationMenu.Item key={link.url} asChild>
                  <NavLink link={link} pathname={pathname} />
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </article>
    </header>
  );
};

export default Header;
