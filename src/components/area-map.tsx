import type { CollectionEntry } from "astro:content";
import React from "react";

type Props = {
  areaInfo: CollectionEntry<"climbingAreas">;
};

const AreaMap: React.FC<Props> = ({
  areaInfo: {
    data: { latitude, longitude },
  },
}) => {
  return (
    <iframe
      style={{ border: 0, width: "100%", height: "300px" }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${latitude},${longitude}&z=10&output=embed`}
    ></iframe>
  );
};

export default AreaMap;
