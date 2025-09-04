import type { LinkInfo } from "@/lib/types";
import React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";

import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import { Button, Card, IconButton, Link, Portal, Text } from "@radix-ui/themes";
import { getIsActiveUrl } from "@/lib/utils";
import { ACCENT_COLOR } from "@/lib/constants";
import RadixProvider from "./radix-provider";

type Props = { pathname: string; linkInfos: LinkInfo[] };

const DesktopNavMenu: React.FC<Props> = ({ pathname, linkInfos }) => {
  return (
    <NavigationMenu.Root className="relative hidden sm:block">
      <NavigationMenu.List className="flex list-none items-baseline gap-6">
        {linkInfos.map((linkInfo) => {
          const isActive = getIsActiveUrl(linkInfo.url, pathname);
          if (linkInfo.children) {
            return (
              <NavigationMenu.Item key={linkInfo.url}>
                <NavigationMenu.Trigger className="group flex items-center justify-between gap-1">
                  <NavigationMenu.Link asChild>
                    <Link
                      size="2"
                      href={linkInfo.url}
                      color={isActive ? ACCENT_COLOR : "gray"}
                    >
                      {linkInfo.label}
                    </Link>
                  </NavigationMenu.Link>
                  <Text color={isActive ? ACCENT_COLOR : "gray"}>
                    <ChevronDownIcon
                      className="relative size-3 transition-transform ease-in group-data-[state=open]:-rotate-180"
                      aria-hidden
                    />
                  </Text>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-0 left-0 w-full min-w-[250px] p-4 sm:w-auto">
                  <ul className="grid gap-2">
                    {linkInfo.children.map((child) => {
                      const isActive = getIsActiveUrl(child.url, pathname);
                      return (
                        <li key={child.url} className="w-full">
                          <NavigationMenu.Link
                            asChild
                            color={isActive ? ACCENT_COLOR : "gray"}
                          >
                            <Button
                              asChild
                              variant="ghost"
                              className="w-full! justify-start! text-left!"
                            >
                              <a href={child.url}>{child.label}</a>
                            </Button>
                          </NavigationMenu.Link>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={linkInfo.url}>
              <NavigationMenu.Link asChild>
                <Link
                  size="2"
                  href={linkInfo.url}
                  color={isActive ? ACCENT_COLOR : "gray"}
                >
                  {linkInfo.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          );
        })}

        <NavigationMenu.Indicator className="data-[state=hidden]:animate-out fade-out data-[state=visible]:animate-in fade-in top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="bg-gray-6 relative top-[70%] size-2.5 rotate-45" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute top-full left-0 flex w-full justify-center perspective-[2000px]">
        <Card asChild size="2">
          <NavigationMenu.Viewport className="data-[state=closed]:animate-out fade-out data-[state=open]:animate-in fade-in relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </Card>
      </div>
    </NavigationMenu.Root>
  );
};

const MobileNavMenu: React.FC<Props> = ({ linkInfos, pathname }) => {
  return (
    <div className="block sm:hidden">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <IconButton variant="surface" aria-label="Menu">
            <MenuIcon className="size-4" />
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Portal>
          <RadixProvider>
            <Dialog.Overlay className="fixed inset-0" />
            <Dialog.Content className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fade-in fade-out fixed inset-0 top-1 overflow-auto outline-none">
              <header className="container2 fixed right-0 flex h-20 items-center justify-end">
                <Dialog.Close asChild>
                  <IconButton variant="soft" color="gray" radius="full">
                    <XIcon className="size-4" />
                  </IconButton>
                </Dialog.Close>
              </header>
              <article className="container2 py-6">
                <ul className="grid gap-2">
                  {linkInfos.map((linkInfo) => {
                    const isActive = getIsActiveUrl(linkInfo.url, pathname);
                    return (
                      <li className="">
                        <Button
                          variant="ghost"
                          asChild
                          className="flex-1 justify-start! text-left!"
                          color={isActive ? ACCENT_COLOR : "gray"}
                        >
                          <a href={linkInfo.url}>{linkInfo.label}</a>
                        </Button>
                        {linkInfo.children && (
                          <ul className="border-gray-6 mt-1 ml-1 grid gap-1 border-l pl-4">
                            {linkInfo.children.map((child) => {
                              const isActive = getIsActiveUrl(
                                child.url,
                                pathname,
                              );
                              return (
                                <li className="w-full" key={child.url}>
                                  <Button
                                    asChild
                                    variant="ghost"
                                    color={isActive ? ACCENT_COLOR : "gray"}
                                  >
                                    <a href={child.url}>{child.label}</a>
                                  </Button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Dialog.Content>
          </RadixProvider>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

const NavMenu: React.FC<Props> = (props) => {
  return (
    <>
      <DesktopNavMenu {...props} />
      <MobileNavMenu {...props} />
    </>
  );
};

export default NavMenu;
