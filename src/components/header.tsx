import React from "react";
import Logo from "./logo";
import ThemePicker from "./theme-picker";

const Header: React.FC = () => {
  return (
    <header className="container2 flex h-16 items-center justify-between">
      <Logo />
      <section className="flex items-center gap-2">
        <ThemePicker />
      </section>
    </header>
  );
};

export default Header;
