"use client";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useTranslations } from "next-intl";
import { UserAuth } from "../../api/AuthContext";
import { db } from "../../../../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { add, format, parse, startOfWeek, getDay, startOfDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CLOSING_TIME, INTERVAL, OPENINING_TIME } from "./config";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import "./Scheduler.css";
import Card from "../ui/Card";
import CModal from "./CModal";

function parseDuration(duration) {
  if (typeof duration !== "string") {
    return {};
  }

  const [amount, unit] = duration.split(" ");
  switch (unit) {
    case "hours":
      return { minutes: parseInt(amount) * 60 };
    default:
      return {};
  }
}

export default function Scheduler() {
  const t = useTranslations("sizelist");
  const { user } = UserAuth();
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
    selectedSize: "",
  });
  const [events, setEvents] = useState([]);
  const [eventsFromFirestore, setEventsFromFirestore] = useState([]);

  const tattooSizes = {
    xsmall: {
      size: "XSmall",
      duration: "1 hour",
      description: `${t("XSmall")}`,
    },
    small: { size: "Small", duration: "2 hours", description: `${t("Small")}` },
    medium: {
      size: "Medium",
      duration: "4 hours",
      description: `${t("Medium")}`,
    },
    large: { size: "Large", duration: "6 hours", description: `${t("Large")}` },
    extraLarge: {
      size: "XLarge+",
      duration: "8 hours",
      description: `${t("XLarge")}`,
    },
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
        const appointmentData = snapshot.docs.map((doc) => doc.data());
        setEventsFromFirestore(appointmentData);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAppointmentCreate = async () => {
    if (!date.dateTime || !date.selectedSize) {
      alert("Please pick an hour from the slot first.");
      return;
    }

    const defaultTime = new Date(date.dateTime).setHours(24, 0, 0, 0);
    const selectedTime = date.dateTime.getTime();

    if (selectedTime === defaultTime) {
      alert("you need to pick an hour from the slot");
    }

    const newAppointment = {
      title: `${user.displayName} (${
        tattooSizes[date.selectedSize]?.size
      }) ${format(date.dateTime, "kk:mm")} - ${format(
        add(
          date.dateTime,
          parseDuration(tattooSizes[date.selectedSize]?.duration)
        ),
        "kk:mm"
      )} `,
      start: Timestamp.fromDate(date.dateTime),
      end: Timestamp.fromDate(
        add(
          date.dateTime,
          parseDuration(tattooSizes[date.selectedSize]?.duration)
        )
      ),
      size: date.selectedSize,
    };
    await addDoc(collection(db, "appointments"), newAppointment);

    setEvents([...events, newAppointment]);
    setEventsFromFirestore([...eventsFromFirestore, newAppointment]);
    setDate((prev) => ({
      ...prev,
      dateTime: null,
      selectedSize: "",
    }));
  };

  useEffect(() => {
    const getAppointments = async () => {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      const appointmentData = querySnapshot.docs.map((doc) => doc.data());
      setEvents(appointmentData);
    };

    getAppointments();
  }, []);

  const getTimes = () => {
    if (!date.justDate || !date.selectedSize) return;

    const { justDate, selectedSize } = date;
    const now = new Date();
    const beginning =
      startOfDay(justDate).getTime() === startOfDay(now).getTime()
        ? add(now, { hours: Math.max(now.getHours() + 1, OPENINING_TIME) })
        : add(justDate, { hours: OPENINING_TIME });
    const end = add(justDate, { hours: CLOSING_TIME });
    const interval = INTERVAL;
    const duration =
      parseDuration(tattooSizes[selectedSize]?.duration)?.minutes || 0;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      const slotEnd = add(i, { minutes: duration });

      const isSlotAvailable = !eventsFromFirestore.some(
        (event) =>
          (i >= event.start.seconds * 1000 && i <= event.end.seconds * 1000) ||
          (slotEnd >= event.start.seconds * 1000 &&
            slotEnd <= event.end.seconds * 1000)
      );

      if (isSlotAvailable) {
        times.push(i);
      }
    }
    return times;
  };

  const times = getTimes();
  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const generatedEvents = date.selectedSize
    ? [
        {
          id: events.length + 1,
          title: `Tattoo (${tattooSizes[date.selectedSize]?.size}) ${format(
            date.dateTime,
            "kk:mm"
          )} - ${format(
            add(
              date.dateTime,
              parseDuration(tattooSizes[date.selectedSize]?.duration)
            ),
            "kk:mm"
          )} `,
          start: date.dateTime,
          end: add(
            date.dateTime,
            parseDuration(tattooSizes[date.selectedSize]?.duration)
          ),
          size: date.selectedSize,
        },
      ]
    : [];

  if (generatedEvents.length > 0) {
    generatedEvents[0].end = add(
      generatedEvents[0].start,
      parseDuration(tattooSizes[date.selectedSize]?.duration)
    );
  }

  const handleSizeSelect = (selectedSize) => {
    setDate((prev) => ({ ...prev, selectedSize }));
  };

  return (
    <div className="min-h-max">
      {user ? (
        <>
          {date.justDate && (
            <div>
              <p>Selected Date: {format(date.justDate, "MMMM d, yyyy")}</p>
              <p>Select Tattoo Size:</p>
                <div className="grid text-center lg:flex lg:flex-wrap lg:justify-center lg:text-left lg:pt-0">
                {Object.keys(tattooSizes).map((size) => (
                  <Card
                    key={size}
                    title={tattooSizes[size].size}
                    description={tattooSizes[size].description}
                    onClick={() => handleSizeSelect(size)}
                    className={
                      size === date.selectedSize
                        ? "text-cyan-500"
                        : ""
                    }
                  />
                ))}
                </div>
              {date.selectedSize && (
                <>
                  <p>Selected Size: {tattooSizes[date.selectedSize]?.size}</p>
                  <p>Duration: {tattooSizes[date.selectedSize].duration}</p>
                  <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                      <button className="p-2 px-3 m-5 rounded-md text-cyan-200 bg-gray-900">
                        Available Time Slots
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="dark">
                      {times?.map((time, i) => (
                        <div key={`time-${i}`}>
                          <button
                            className="p-1 px-2  hover:text-sky-200 hover:shadow-lg hover:scale-110"
                            type="button"
                            onClick={() =>
                              setDate((prev) => ({ ...prev, dateTime: time }))
                            }
                          >
                            {format(time, "kk:mm")}
                          </button>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                  {date.dateTime && (
                    <>
                      <p>Selected Time: {format(date.dateTime, "kk:mm")}</p>
                      <button
                        onClick={handleAppointmentCreate}
                        className="p-2 m-5 rounded-md text-cyan-200 bg-gray-900"
                        disabled={!date.dateTime}
                      >
                        Create Appointment
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {generatedEvents.length > 0 && (
            <div>
              <h2>Generated Events:</h2>
              <ul>
                {generatedEvents.map((event) => (
                  <li key={event.id}>
                    {event.title} - {format(event.start, "MMMM d, yyyy kk:mm")}{" "}
                    to {format(event.end, "kk:mm")}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <br />
        </>
      ) : (
        <CModal />
      )}

      <div className="static h-min mt-4">
        <Calendar
          className="dark h-screen"
          localizer={localizer}
          events={[
            ...events.map((event) => ({
              id: event.id,
              title: event.title,
              start: event.start.toDate(),
              end: event.end.toDate(),
              size: event.size,
            })),
            eventsFromFirestore,
          ]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable={true}
          onSelectSlot={(slotInfo) => {
            if (user) {
              const { start } = slotInfo;
              const now = startOfDay(new Date());

              if (start < now) {
                alert("Please select a future date and time.");
                return;
              }

              const selectedDuration =
                date.selectedSize && tattooSizes[date.selectedSize]
                  ? tattooSizes[date.selectedSize].duration
                  : "0 hours";

              const end = add(start, parseDuration(selectedDuration));

              const newEvent = {
                id: events.length + 1,
                title: `Appointment`,
                start,
                end,
                size: date.selectedSize,
              };

              setEventsFromFirestore([...eventsFromFirestore, newEvent]);

              setDate((prev) => ({
                ...prev,
                justDate: new Date(start),
                dateTime: new Date(start),
                selectedSize: "",
              }));
            } else {
              alert(
                "Please log in to your Google account to create a new appointment."
              );
            }
          }}
        />
      </div>
    </div>
  );
}
