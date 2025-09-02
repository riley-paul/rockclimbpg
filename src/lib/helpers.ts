import { getCollection, type CollectionEntry } from "astro:content";
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

export const getClimbingAreas = async () => {
  const climbingAreas = await getCollection("climbingAreas");
  return climbingAreas.sort((a, b) => a.data.distance_km - b.data.distance_km);
};

export const getAreaInfo = (
  areaData: CollectionEntry<"climbingAreas">["data"],
): { label: string; value: string }[] => {
  const result = [];
  result.push({
    label: "Distance from PG",
    value: `${areaData.distance_km}km (${areaData.distance_time})`,
  });
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

export const getLinkInfos = async () => {
  const climbingAreas = await getClimbingAreas();
  const resources = await getResources();

  const linkInfos: LinkInfo[] = [
    {
      url: "/",
      label: "Home",
    },
    {
      url: "/areas",
      label: "Climbing Areas",
      children: climbingAreas.map((area) => ({
        url: `/areas/${area.slug}`,
        label: area.data.title,
      })),
    },
    {
      url: "/resources",
      label: "Resources",
      children: resources.map((res) => ({
        url: res.path,
        label: res.name.replace(/_/g, " ").replace(".pdf", ""),
      })),
    },
    {
      url: "/contact",
      label: "Contact",
    },
  ];
  return linkInfos;
};
