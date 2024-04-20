"use client";
import { Button } from "@/components/ui/button";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import React, { useEffect } from "react";

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

  const { user } = useKindeBrowserClient();

  useEffect(() => {}, [user]);

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link key={index} href={item.path}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        {user ? (
          <UserAvatar user={user} />
        ) : (
          <LoginLink>
            <Button>Get Started</Button>
          </LoginLink>
        )}
      </div>
    </div>
  );
}

export default Header;
