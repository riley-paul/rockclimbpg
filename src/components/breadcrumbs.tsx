import { Button, Link } from "@radix-ui/themes";
import React from "react";

const Breadcrumbs: React.FC = () => {
  return (
    <article className="container2 flex items-center gap-2">
      <Link href="/" size="1" color="gray">
        Home
      </Link>
    </article>
  );
};

export default Breadcrumbs;
