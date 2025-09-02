import type { CollectionEntry } from "astro:content";
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

export const getAreaInfo = (
  areaData: CollectionEntry<"climbingAreas">["data"],
): { label: string; value: string }[] => {
  const result = [];
  if (areaData.distance_km && areaData.distance_time) {
    result.push({
      label: "Distance from PG",
      value: `${areaData.distance_km}km (${areaData.distance_time})`,
    });
  }
  if (areaData.nearest_town) {
    result.push({ label: "Nearest Town", value: areaData.nearest_town });
  }
  if (areaData.type) {
    result.push({ label: "Climbing Type", value: areaData.type });
  }
  if (areaData.climbs) {
    result.push({ label: "Climbs", value: areaData.climbs });
  }
  if (areaData.height) {
    result.push({ label: "Height", value: areaData.height });
  }
  if (areaData.hike_duration) {
    result.push({ label: "Hike", value: areaData.hike_duration });
  }
  return result;
};

export const getLinkInfos = () => {
  const linkInfos: LinkInfo[] = [
    {
      url: "/",
      label: "Home",
      isActive: (pathname) => pathname === "/",
    },
    {
      url: "/areas",
      label: "Climbing Areas",
      isActive: (pathname) => pathname.startsWith("/areas"),
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
