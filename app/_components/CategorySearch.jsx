"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

function CategorySearch() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((response) => {
      setCategoryList(response.data);
    });
  };

  return (
    <div className="mb-10 px-5 flex flex-col items-center gap-4">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <h2 className="text-gray-500 text-xl">
        Search Your Doctor and Book Appointment in one click
      </h2>

      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </div>
      {/* Display list of Categories */}
      <div className="grid grid-cols-3 md:grid-cols-6">
        {categoryList.length > 0
          ? categoryList.map(
              (category, index) =>
                index < 6 && (
                  <Link
                    href={`/search/${category.attributes?.name}`}
                    key={index}
                    className="flex flex-col items-center text-center gap-2 p-5 bg-blue-50 m-2 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:scale-110 transition duration-300 ease-in-out"
                  >
                    <Image
                      src={category.attributes?.icon?.data?.attributes?.url}
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <label className="text-blue-600 text-small">
                      {category.attributes?.name.split("_").join(" ")}
                    </label>
                  </Link>
                )
            )
          : // Skeleton Loading Effect
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 w-[130px] h-[130px] m-2 rounded-lg"
              ></div>
              // </div>
            ))}
      </div>
    </div>
  );
}

export default CategorySearch;
