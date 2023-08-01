"use client";
import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import { CLOSING_TIME, INTERVAL, OPENINING_TIME } from "../helpers/config";

export default function Calendar() {
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });

  const getTimes = () => {
    if (!date.justDate) return;
    const { justDate } = date;
    const beginning = add(justDate, { hours: OPENINING_TIME });
    const end = add(justDate, { hours: CLOSING_TIME });
    const interval = INTERVAL;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }
    return times;
  };

  const times = getTimes();
  return (
    <div>
      {date.justDate ? (
        <div>
          {times?.map((time, i) => (
            <div key={`time-${i}`}>
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
}
