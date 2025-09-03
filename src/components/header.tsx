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
    <>
      <div className="from-accent-10 to-accent-8 sticky top-0 h-1 w-full bg-linear-to-r"></div>
      <header className="container2 flex h-20 items-center justify-between gap-6">
        <Logo />
        <NavigationMenu.Root className="relative flex items-center">
          <NavigationMenu.List className="flex list-none items-center justify-center gap-6">
            {linkInfos.map((link) => {
              if (link.children) {
                return (
                  <NavigationMenu.Item className="relative" key={link.url}>
                    <NavigationMenu.Trigger>
                      <NavLink link={link} pathname={pathname} />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content
                      className={cn(
                        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
                        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
                      )}
                    >
                      {link.children.map((child) => (
                        <NavLink
                          key={child.url}
                          link={child}
                          pathname={pathname}
                        />
                      ))}
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
          <div className="absolute top-full left-0 isolate z-50 flex justify-center">
            <NavigationMenu.Viewport className="origin-top-center bg-panel data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 rounded-3 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden border shadow md:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </NavigationMenu.Root>
      </header>
    </>
  );
};

export default Header;
