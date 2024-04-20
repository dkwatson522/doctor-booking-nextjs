"use client";
import React, { useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

function DoctorSuggestionList({ doctor }) {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorsByCategory();
  }, []);

  const getDoctorsByCategory = () => {
    GlobalApi.getDoctorsByCategory(
      doctor.attributes?.category?.data?.attributes?.name
    ).then((response) => {
      const filteredDoctors = response.data.filter(
        (item) => item.id !== doctor.id
      );
      setDoctorList(filteredDoctors);
    });
  };

  return (
    <div className=" p-4 border-[1px] mt-5 md:ml-5 rounded-lg ">
      <h2 className="mb-3 font-bold">Suggestions</h2>

      {!doctorList.length > 0 ? (
        <h2>No other doctors</h2>
      ) : (
        doctorList.map((doctor, index) => (
          <Link
            href={"/details/" + doctor.id}
            className=" mb-4 p-3 shadow-sm w-full
            cursor-pointer hover:bg-slate-100
            rounded-lg flex items-center gap-3"
            key={index}
          >
            <Image
              src={doctor.attributes?.image?.data?.attributes?.url}
              alt="suggested-doctor"
              width={70}
              height={70}
              className="w-[70px] h-[70px] rounded-full object-cover"
            />
            <div className="mt-3 flex-col flex gap-1 items-baseline">
              <h2 className="text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary">
                {doctor.attributes.category?.data?.attributes?.name}
              </h2>
              <h2 className="font-medium text-sm">{doctor.attributes.name}</h2>
              <h2 className="text-primary text-xs flex gap-2">
                {doctor.attributes.years_of_experience} Years
              </h2>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default DoctorSuggestionList;
