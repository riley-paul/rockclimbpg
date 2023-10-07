import { getCollection } from "astro:content";
import { Button, buttonVariants } from "./ui/button";
import type { Link } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MoreHorizontal, X, ChevronUp, ChevronDown, Mountain, MountainSnow, MountainSnowIcon } from "lucide-react";
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
  <li className="relative group">
    <a
      href={link.link}
      className={cn(
        "w-full",
        buttonVariants({
          variant: link.selected(pathname) ? "default" : "secondary",
        })
      )}
    >
      {link.name}
    </a>
    {link.children && (
      <div className="absolute hidden md:group-hover:flex bg-card shadow border gap-1 flex-col p-1 min-w-[10rem] rounded-md">
        {link.children.map((child) => (
          <a
            key={child.link}
            href={child.link}
            className={cn(
              buttonVariants({
                variant: child.selected(pathname) ? "secondary" : "ghost",
              }),
              "w-full justify-start"
            )}
          >
            {child.name}
          </a>
        ))}
      </div>
    )}
  </li>
);

export const Header: React.FC<{ pathname: string }> = ({ pathname = "" }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="bg-card border-b shadow px-6 py-4 flex justify-center flex-col md:flex-row md:item-center md:justify-between gap-4">
      <div className="flex justify-between items-center">
        <a href="/">
          <h1 className="text-2xl font-bold my-2 flex items-center">
            <Mountain className="inline mr-2 h-6 w-6"/>
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
  );
};
