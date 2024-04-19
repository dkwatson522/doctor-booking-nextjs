"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctors().then((response) => {
      // console.log(response.data);
      setDoctorList(response.data);
    });
  };

  return (
    <div>
      {/* Hero */}
      <Hero />
      {/* Search bar + Category Search */}
      <CategorySearch />
      {/* Popular Doctor List */}
      <DoctorList doctorList={doctorList}/>
    </div>
  );
}
