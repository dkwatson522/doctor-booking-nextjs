import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const Menu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Explore",
      path: "/explore",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link href={item.path}>
              <li
                className="hover:text-primary cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                key={index}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}

export default Header;
