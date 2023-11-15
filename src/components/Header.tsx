import { getCollection } from "astro:content";
import { Button, buttonVariants } from "./ui/button";
import type { Link } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  X,
  ChevronUp,
  ChevronDown,
  Mountain,
  MountainSnow,
  MountainSnowIcon,
} from "lucide-react";
import React from "react";

const areas = await getCollection("climbingAreas");

const links: Link[] = [
  { name: "Home", link: "/", selected: (pathname) => pathname === "/" },
  {
    name: "Climbing Areas",
    link: "/areas",
    selected: (pathname) => pathname.startsWith("/areas"),
    children: areas.map((area) => ({
      name: area.data.title,
      link: `/areas/${area.slug}`,
      selected: (pathname) => pathname.startsWith(`/areas/${area.slug}`),
    })),
  },
  {
    name: "Resources",
    link: "/resources",
    selected: (pathname) => pathname.startsWith("/resources"),
  },
  {
    name: "Contact",
    link: "/contact",
    selected: (pathname) => pathname.startsWith("/contact"),
  },
];

const PageLink: React.FC<{ link: Link; pathname: string }> = ({
  link,
  pathname,
}) => (
  <li
    className={cn(
      "relative group h-full px-2 border-l-2 md:border-b-2 md:border-l-0 border-transparent flex items-center text-muted-foreground hover:border-muted-foreground transition-colors",
      link.selected(pathname) &&
        "border-primary text-foreground hover:border-primary"
    )}
  >
    <a href={link.link}>{link.name}</a>
    {link.children && (
      <div className="absolute top-16 -left-2 hidden md:group-hover:flex bg-card shadow gap-1 flex-col py-2 min-w-[12rem] rounded-md text-muted-foreground z-[100000]">
        {link.children.map((child) => (
          <a
            key={child.link}
            href={child.link}
            className={cn(
              "w-full px-4 py-1 border-l-2 border-transparent hover:border-muted-foreground transition-colors",
              child.selected(pathname) &&
                "border-primary hover:border-primary text-foreground"
            )}
          >
            {child.name}
          </a>
        ))}
      </div>
    )}
  </li>
);

interface Props {
  pathname: string;
}

export const Header: React.FC<Props> = (props) => {
  const { pathname = "" } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-card text-foreground shadow z-50">
      <header
        className={cn(
          "container flex flex-col md:flex-row md:justify-between gap-4",
          open && "pb-4 md:pb-0"
        )}
      >
        <div className="flex justify-between items-center">
          <a href="/">
            <h1 className="text-2xl font-bold flex items-center h-16">
              <Mountain className="inline mr-2 h-6 w-6 text-primary" />
              RockClimbPG
            </h1>
          </a>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden"
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        <ul
          className={cn(
            "flex gap-3 flex-col",
            { hidden: !open },
            "md:flex md:flex-row md:items-center"
          )}
        >
          {links.map((link) => (
            <PageLink key={link.name} link={link} pathname={pathname} />
          ))}
        </ul>
      </header>
    </div>
  );
};
