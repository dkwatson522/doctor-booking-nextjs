import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import CancelAppointment from "./CancelAppointment";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

function BookingList({ bookingList, expired, updateRecord }) {
  const onDeleteBooking = (booking) => {
    GlobalApi.cancelAppointment(booking.id).then((response) => {
      if (response) {
        toast("Booking Deleted Successfully!");
        updateRecord();
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col">
        {bookingList &&
          bookingList.map((booking, index) => (
            <div
              key={index}
              className="flex gap-4 items-center border p-5 m-3 rounded-lg"
            >
              <Image
                src={
                  booking.attributes.doctor?.data?.attributes?.image?.data
                    ?.attributes?.url
                }
                alt="doctor-image"
                width={70}
                height={70}
                className="rounded-full h-[70px] w-[70px] object-cover"
              />
              <div className="flex flex-col gap-2 w-full">
                <h2 className="font-bold text-[18px] flex justify-between items-center">
                  {booking.attributes.doctor?.data?.attributes?.name}
                  {!expired && (
                    <CancelAppointment
                      onContinueClick={() => onDeleteBooking(booking)}
                    />
                  )}
                </h2>
                <h2 className="flex gap-2 text-gray-500">
                  <MapPin className="text-primary h-5 w-5" /> Address:{" "}
                  {booking.attributes.doctor?.data?.attributes?.address}
                </h2>
                <h2 className="flex gap-2">
                  <Calendar className="text-primary h-5 w-5" /> Date:{" "}
                  {moment(booking.attributes.date).format("DD-MMM-YYYY")}
                </h2>
                <h2 className="flex gap-2">
                  <Clock className="text-primary h-5 w-5" />
                  Time: {booking.attributes.time}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BookingList;
