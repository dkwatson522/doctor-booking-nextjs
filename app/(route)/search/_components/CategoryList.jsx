"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const params = usePathname();
  const category = params.split("/")[2];
  useEffect(() => {
    getCategoryList();

    console.log(category);
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((response) => {
      setCategoryList(response.data);
    });
  };

  return (
    <div className="h-screen mt-5 flex flex-col">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList &&
              categoryList.map((item, index) => (
                <CommandItem key={index}>
                  <Link
                    href={"/search/" + item.attributes.name}
                    className={`p-2 flex gap-2
                text-[14px]
                text-blue-600
                items-center
                rounded-md cursor-pointer w-full
                ${category == item.attributes.name && "bg-blue-100"}
                `}
                  >
                    <Image
                      src={item.attributes?.icon?.data.attributes?.url}
                      alt="icon"
                      width={25}
                      height={25}
                    />
                    <label>{item.attributes.name}</label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
