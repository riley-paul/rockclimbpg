import { themeAtom } from "@/lib/use-theme";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { LaptopIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import React from "react";
import RadixProvider from "./radix-provider";

const options = [
  { mode: "system", name: "System", icon: LaptopIcon },
  { mode: "light", name: "Light", icon: SunIcon },
  { mode: "dark", name: "Dark", icon: MoonIcon },
];

const ThemePicker: React.FC = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <RadixProvider asChild>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="soft">
            <SunMoonIcon className="size-4" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="bottom" align="end">
          <DropdownMenu.RadioGroup
            value={theme}
            onValueChange={(v) => setTheme(v as any)}
          >
            {options.map(({ mode, name, icon: Icon }) => (
              <DropdownMenu.RadioItem key={mode} value={mode}>
                <Icon className="size-4 opacity-70" />
                <span>{name}</span>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </RadixProvider>
  );
};

export default ThemePicker;
