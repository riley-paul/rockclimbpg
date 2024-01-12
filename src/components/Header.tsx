import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  X,
  ChevronUp,
  ChevronDown,
  Mountain,
  MountainSnow,
  MountainSnowIcon,
} from "lucide-react";
import React from "react";
import { NavMenu } from "./NavMenu";

interface Props {
  pathname: string;
}

export const Header: React.FC<Props> = (props) => {
  const { pathname = "" } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-card text-foreground shadow z-50 border-b">
      <header
        className={cn(
          "container flex flex-col md:flex-row md:justify-between gap-4",
          open && "pb-4 md:pb-0"
        )}
      >
        <div className="flex justify-between items-center">
          <a href="/">
            <h1 className="text-2xl font-bold flex items-center h-16">
              <Mountain className="inline mr-2 h-6 w-6 text-primary" />
              RockClimbPG
            </h1>
          </a>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden"
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        <ul
          className={cn(
            "flex gap-3 flex-col",
            { hidden: !open },
            "md:flex md:flex-row md:items-center"
          )}
        >
          <NavMenu pathname={pathname} />
        </ul>
      </header>
    </div>
  );
};
