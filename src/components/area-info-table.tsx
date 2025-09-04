import { getAreaInfo } from "@/lib/helpers";
import { DataList } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import React from "react";

type Props = {
  areaInfo: CollectionEntry<"climbingAreas">;
};

const AreaInfoTable: React.FC<Props> = ({ areaInfo: { data } }) => {
  const info = getAreaInfo(data);
  return (
    <DataList.Root>
      {info.map(({ label, value }) => (
        <DataList.Item key={label}>
          <DataList.Label>{label}</DataList.Label>
          <DataList.Value>{value}</DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
};

export default AreaInfoTable;
