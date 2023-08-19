"use client";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { add, format } from "date-fns";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import tattooSizes, {
  CLOSING_TIME,
  INTERVAL,
  OPENINING_TIME,
} from "../../helpers/config";
import { Popover } from "@nextui-org/react";
import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

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

export default function Scheduler(props) {
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
    selectedSize: "",
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
        const appointmentData = snapshot.docs.map((doc) => doc.data());
        setEvents(appointmentData);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAppointmentCreate = async () => {
    await addDoc(collection(db, "appointments"), {
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
    });
  };

  const getTimes = () => {
    if (!date.justDate || !date.selectedSize) return;

    const { justDate, selectedSize } = date;
    const beginning = add(justDate, { hours: OPENINING_TIME });
    const end = add(justDate, { hours: CLOSING_TIME });
    const interval = INTERVAL;
    const duration = tattooSizes[selectedSize].duration;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
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

  return (
    <>
      <button onClick={handleAppointmentCreate}>Create Appointment</button>

      {date.justDate && (
        <div>
          <p>Selected Date: {format(date.justDate, "MMMM d, yyyy")}</p>
          <select
            className="p-2 m-5 rounded-md text-cyan-200 bg-gray-900"
            onChange={(e) =>
              setDate((prev) => ({ ...prev, selectedSize: e.target.value }))
            }
          >
            <option value="">Select Tattoo Size</option>
            {Object.keys(tattooSizes).map((size) => (
              <option key={size} value={size}>
                {tattooSizes[size].size}
              </option>
            ))}
          </select>
          {date.selectedSize && (
            <>
              <p>Selected Size: {tattooSizes[date.selectedSize]?.size}</p>
              <p>Duration: {tattooSizes[date.selectedSize].duration}</p>
              <Popover placement="bottom" showArrow={true}>
                <Popover.Trigger>
                  <button className="p-2 px-3 m-5 rounded-md text-cyan-200 bg-gray-900">
                    Available Time Slots
                  </button>
                </Popover.Trigger>
                <Popover.Content>
                  {times?.map((time, i) => (
                    <div key={`time-${i}`}>
                      <button
                        className="p-1 px-3 bg-black"
                        type="button"
                        onClick={() =>
                          setDate((prev) => ({ ...prev, dateTime: time }))
                        }
                      >
                        {format(time, "kk:mm")}
                      </button>
                    </div>
                  ))}
                </Popover.Content>
              </Popover>
              {date.dateTime && (
                <p>Selected Time: {format(date.dateTime, "kk:mm")}</p>
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
                {event.title} - {format(event.start, "MMMM d, yyyy kk:mm")} to{" "}
                {format(event.end, "kk:mm")}
              </li>
            ))}
          </ul>
        </div>
      )}
      <br />

      <div className="h-48">
        <Calendar
          localizer={localizer}
          events={[...events, ...generatedEvents]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable={true}
          onSelectSlot={(slotInfo) => {
            const { start } = slotInfo;

            const selectedDuration =
              date.selectedSize && tattooSizes[date.selectedSize]
                ? tattooSizes[date.selectedSize].duration
                : "0 hours";

            const end = add(start, parseDuration(selectedDuration));

            setEvents([...events, generatedEvents]);

            setDate((prev) => ({
              ...prev,
              justDate: new Date(start),
              dateTime: new Date(start),
              selectedSize: "",
            }));
          }}
        />
      </div>
    </>
  );
}