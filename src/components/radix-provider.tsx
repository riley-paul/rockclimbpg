import React from "react";
import { Theme, type ThemeProps } from "@radix-ui/themes";
import { useAppearance } from "@/lib/use-theme";

const RadixProvider: React.FC<ThemeProps> = (props) => {
  const appearance = useAppearance();
  return <Theme accentColor="grass" appearance={appearance} {...props} />;
};

export default RadixProvider;
