"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { isPast } from "date-fns";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState(); // ["10:00 AM", "11:00 AM", "12:00 PM"
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    // AM Times
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    // PM Times
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }

    setTimeSlot(timeList);
  };

  const isPastDate = (day) => {
    return day < new Date();
  };

  const saveBooking = () => {
    const data = {
      data: {
        doctor: doctor.id,
        username: user.given_name + " " + user.family_name,
        email: user.email,
        date: date,
        time: selectedTimeSlot,
        note: note,
      },
    };
    console.log("Data", data);

    GlobalApi.bookAppointment(data).then((response) => {
      console.log("Appointment Booked", response);
      if (response) {
        toast("Appointment Confirmation sent to your email.");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="mt-3 rounded-full"
          onClick={() => console.log("Book Appointment")}
        >
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
              {/* Calendar */}
              <div className="flex flex-col gap-3 items-baseline">
                <h2 className="flex gap-2 items-center">
                  <CalendarDays className="text-primary h-5 w-5" />
                  Select Date
                </h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={isPastDate}
                />
              </div>
              {/* Time Slot */}
              <div className="mt-3 md:mt-0">
                <h2 className="flex gap-2 items-center mb-3">
                  <Clock className="text-primary h-5 w-5" />
                  Select Time Slot
                </h2>
                <div className="grid grid-cols-3 gap-2 rounded-lg border p-5">
                  {timeSlot?.map((item, index) => (
                    <h2
                      onClick={() => setSelectedTimeSlot(item.time)}
                      className={`p-2 border cursor-pointer text-center rounded-full hover:bg-primary hover:text-white ${
                        item.time == selectedTimeSlot && "bg-primary text-white"
                      }`}
                    >
                      {item.time}
                    </h2>
                  ))}
                </div>
              </div>
              <Textarea
                className="mt-3"
                placeholder="Note"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <>
              <Button
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                type="button"
                variant="outline"
              >
                Close
              </Button>
              <Button
                onClick={() => saveBooking()}
                type="button"
                disabled={!(date && selectedTimeSlot)}
              >
                Submit
              </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
