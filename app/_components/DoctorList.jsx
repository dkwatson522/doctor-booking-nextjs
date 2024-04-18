import Image from "next/image";
import React from "react";

function DoctorList({ doctorList, heading = "Popular Doctors" }) {
  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl">{heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
        {/* Display list of Doctors */}
        {doctorList.length > 0
          ? doctorList.map((doctor, index) => (
              <div
                key={index}
                className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-lg transition duration-300 ease-in-out"
              >
                <Image
                  src={doctor.attributes?.image?.data?.attributes?.url}
                  alt="doctor"
                  width={500}
                  height={200}
                  className="h-[200px] w-full rounded-lg object-cover"
                />
                <div className="mt-3 gap-1 items-baseline flex flex-col">
                  {doctor.attributes?.categories?.data.map(
                    (category, index) => (
                      <h2
                        key={index}
                        className="text-[10px] text-primary bg-blue-100 p-1 rounded-full"
                      >
                        {category?.attributes.name}
                      </h2>
                    )
                  )}
                </div>
                <h2 className="font-bold text-lg">{doctor.attributes?.name}</h2>
                <h2 className="text-primary text-sm">
                  {doctor.attributes?.years_of_experience} Years of Experience
                </h2>
                <h2 className="text-gray-500 text-sm">
                  {doctor.attributes?.address}
                </h2>

                <h2 className="p-2 border-[1px] rounded-full mt-2 text-center text-primary cursor-pointer hover:bg-primary hover:text-white transition duration-300 ease-in-out text-[11px]">
                  Book Now
                </h2>
              </div>
            ))
          : // Skeleton Loading Effect
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-lg transition duration-300 ease-in-out"
              >
                <div className="animate-pulse h-[200px] w-full rounded-lg bg-gray-200"></div>
                <div className="mt-3 gap-1 items-baseline flex flex-col">
                  <div className="animate-pulse text-[10px] text-primary bg-blue-100 p-1 rounded-full"></div>
                </div>
                <div className="animate-pulse h-4 bg-gray-200 w-1/2 mt-2"></div>
                <div className="animate-pulse h-4 bg-gray-200 w-1/2 mt-2"></div>
                <div className="animate-pulse h-4 bg-gray-200 w-1/2 mt-2"></div>
                <div className="animate-pulse h-4 bg-gray-200 w-1/2 mt-2"></div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default DoctorList;
