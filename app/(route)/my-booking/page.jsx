"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { set } from "date-fns";

function MyBooking() {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    user && getUserBookingList();
  }, [user]);

  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email).then((response) => {
      setBookingList(response.data);
    });
  };

  const filterUserBookingList = (type) => {
    const result = bookingList.filter((booking) =>
      type === "upcoming"
        ? new Date(booking.attributes.date) >= new Date()
        : new Date(booking.attributes.date) <= new Date()
    );
    console.log(result);
    return result;
  };
  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-2xl">My Booking</h2>
      <div className="">
        <Tabs defaultValue="upcoming" className=" w-full mt-5">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <BookingList
              bookingList={filterUserBookingList("upcoming")}
              expired={false}
            />
          </TabsContent>
          <TabsContent value="past">
            <BookingList
              bookingList={filterUserBookingList("past")}
              expired={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MyBooking;
