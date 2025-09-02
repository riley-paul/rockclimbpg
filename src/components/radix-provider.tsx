import React from "react";
import { Theme, type ThemeProps } from "@radix-ui/themes";

const RadixProvider: React.FC<ThemeProps> = (props) => {
  return (
    <Theme
      accentColor="grass"
      appearance="light"
      radius="large"
      className="bg-[url('/bg/topography-light.svg')]"
      {...props}
    />
  );
};

export default RadixProvider;
