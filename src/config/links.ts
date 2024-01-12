import { getCollection } from "astro:content";

const areas = await getCollection("climbingAreas");

export interface Link {
  name: string;
  link: string;
  active: (pathname: string) => boolean;
  children?: Link[];
}

export const links: Link[] = [
  { name: "Home", link: "/", active: (pathname) => pathname === "/" },
  {
    name: "Climbing Areas",
    link: "/areas",
    active: (pathname) => pathname.startsWith("/areas"),
    children: areas.map((area) => ({
      name: area.data.title,
      link: `/areas/${area.slug}`,
      active: (pathname) => pathname.startsWith(`/areas/${area.slug}`),
    })),
  },
  {
    name: "Resources",
    link: "/resources",
    active: (pathname) => pathname.startsWith("/resources"),
  },
  {
    name: "Contact",
    link: "/contact",
    active: (pathname) => pathname.startsWith("/contact"),
  },
];
