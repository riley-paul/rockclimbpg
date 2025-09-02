import type { LinkInfo } from "./types";

export const getResources = async () => {
  const resources = Object.keys(
    import.meta.glob("../../public/resources/*.pdf", {
      eager: true,
    }),
  );
  const filenames = resources.map((res) => ({
    path: res.replace("../../public", ""),
    name: res.replace(/^.*[\\\/]/, ""),
  }));
  return filenames;
};

export const getLinkInfos = () => {
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
  return linkInfos;
};
