import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";

function DoctorDetail({ doctor }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
        {/* Doctor Image */}
        <div>
          <Image
            src={doctor.attributes?.image?.data?.attributes?.url}
            alt="doctor-image"
            width={200}
            height={200}
            className="rounded-lg w-full h-[280px] object-cover"
          />
        </div>
        {/* Doctor Info */}
        <div className="col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline">
          <h2 className="font-bold text-2xl">{doctor.attributes?.name}</h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <GraduationCap />
            <span>
              {doctor.attributes?.years_of_experience} Years of Experience
            </span>
          </h2>
          <h2 className="text-md flex gap-2 text-gray-500">
            <MapPin />
            <span>{doctor.attributes?.address}</span>
          </h2>
          <h2 className="text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary">
            {doctor.attributes?.category?.data?.attributes?.name}
          </h2>

          <Button
            className="mt-3 rounded-full"
            onClick={() => console.log("Book Appointment")}
          >
            Book Appointment
          </Button>
        </div>
      </div>

      <div className="p-3 border-[1px] rounded-lg mt-5">
        <h2 className="font-bold text-[20px]">About Me</h2>
        <p className="text-gray-500 tracking-wide mt-2">
          {doctor?.attributes?.about}
        </p>
      </div>
    </>
  );
}

export default DoctorDetail;
