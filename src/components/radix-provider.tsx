import React from "react";
import { Theme, type ThemeProps } from "@radix-ui/themes";
import { ACCENT_COLOR } from "@/lib/constants";

const RadixProvider: React.FC<ThemeProps> = (props) => {
  return (
    <Theme
      accentColor={ACCENT_COLOR}
      grayColor="gray"
      appearance="dark"
      radius="large"
      panelBackground="solid"
      className="bg-[url('/bg/topography.svg')]"
      {...props}
    />
  );
};

export default RadixProvider;
