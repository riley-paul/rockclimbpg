import { getCollection } from "astro:content";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Link } from "@/lib/types";

export const Header: React.FC<{ pathname: string; links: Link[] }> = ({
  pathname,
  links,
}) => (
  <header className="bg-card border-b shadow px-6 py-4 flex justify-between items-center">
    <a href="/">
      <h1 className="text-xl">RockClimbPG</h1>
    </a>
    <div className="flex gap-3">
      {links.map((link) =>
        link.children ? (
          <DropdownMenu>
            <a href={link.link}>
              <Button>
                <DropdownMenuTrigger>{link.name}</DropdownMenuTrigger>
              </Button>
            </a>
            <DropdownMenuContent>
              {link.children.map((child) => (
                <a href={child.link}>
                  <DropdownMenuItem>{child.name}</DropdownMenuItem>
                </a>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a href={link.link}>
            <Button variant={link.selected(pathname) ? "default" : "secondary"}>
              {link.name}
            </Button>
          </a>
        )
      )}
    </div>
  </header>
);
