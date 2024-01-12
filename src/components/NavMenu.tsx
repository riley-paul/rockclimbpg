import { links, type Link } from "@/config/links";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Props {
  pathname: string;
}

export const NavMenu: React.FC<Props> = (props) => {
  const { pathname } = props;

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-col items-start md:flex-row">
        {links.map((link) => (
          <NavigationMenuItem>
            {link.children ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    "border-b-4 border-transparent hover:border-muted-foreground",
                    link.active(pathname) && "border-primary"
                  )}
                >
                  {link.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[300px] py-4">
                    {link.children.map((child) => (
                      <li>
                        <a href={child.link}>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "border-l-4 border-transparent hover:border-muted-foreground w-full justify-normal",
                              child.active(pathname) && "border-primary"
                            )}
                          >
                            {child.name}
                          </NavigationMenuLink>
                        </a>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <a href={link.link}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "border-b-4 border-transparent hover:border-muted-foreground",
                    link.active(pathname) && "border-primary"
                  )}
                >
                  {link.name}
                </NavigationMenuLink>
              </a>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
