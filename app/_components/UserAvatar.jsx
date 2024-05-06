import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

function UserAvatar({ user }) {
  const getInitials = (user) => {
    if (!user.family_name && !user.given_name) return "";

    return (
      user.given_name.charAt(0).toUpperCase() +
      user.family_name.charAt(0).toUpperCase()
    );
  };

  const userHasImage = user?.picture;
  const userInitials = getInitials(user);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {userHasImage ? (
            <Image
              src={user?.picture}
              alt="User picture"
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
              <span>{userInitials}</span>
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent>
          <ul className="flex flex-col gap-2">
            <Link
              href={"/my-booking"}
              className="cursur-pointer hover:bg-slate-100 p-2 rounded-md"
            >
              My Booking
            </Link>
            <li className="cursur-pointer hover:bg-slate-100 p-2 rounded-md">
              <LogoutLink> Logout </LogoutLink>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default UserAvatar;
