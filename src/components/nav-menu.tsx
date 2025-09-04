import type { LinkInfo } from "@/lib/types";
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import { Button, Card, Link } from "@radix-ui/themes";

type Props = { pathname: string; linkInfos: LinkInfo[] };

const NavMenu: React.FC<Props> = ({ pathname, linkInfos }) => {
  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="flex list-none items-baseline gap-6">
        {linkInfos.map((linkInfo) => {
          if (linkInfo.children) {
            return (
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="group flex items-center justify-between gap-1">
                  <NavigationMenu.Link asChild>
                    <Link size="2" href={linkInfo.url}>
                      {linkInfo.label}
                    </Link>
                  </NavigationMenu.Link>
                  <ChevronDownIcon
                    className="text-accent-10 relative size-3 transition-transform ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-0 left-0 w-full min-w-[250px] p-4 sm:w-auto">
                  <ul className="grid gap-2">
                    {linkInfo.children.map((child) => (
                      <li className="w-full">
                        <NavigationMenu.Link asChild key={child.url}>
                          <Button
                            asChild
                            variant="ghost"
                            className="w-full! justify-start! text-left!"
                          >
                            <a href={child.url}>{child.label}</a>
                          </Button>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link size="2" href={linkInfo.url}>
                  {linkInfo.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          );
        })}

        <NavigationMenu.Indicator className="data-[state=hidden]:animate-out fade-out data-[state=visible]:animate-in fade-in top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="bg-background border-gray-7 relative top-[70%] size-2.5 rotate-45 border" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute top-full left-0 flex w-full justify-center perspective-[2000px]">
        <Card asChild size="2">
          <NavigationMenu.Viewport className="data-[state=closed]:animate-out fade-out data-[state=open]:animate-in fade-in bg-panel-solid relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </Card>
      </div>
    </NavigationMenu.Root>
  );
};

export default NavMenu;
