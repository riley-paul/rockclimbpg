import { Heading } from "@radix-ui/themes";
import { MountainSnowIcon } from "lucide-react";
import React from "react";

const Logo: React.FC = () => {
  return (
    <a href="/" className="flex items-center gap-1.5">
      <MountainSnowIcon className="text-accent-10 size-6" />
      <Heading size="4"> Rock Climb PG </Heading>
    </a>
  );
};

export default Logo;
