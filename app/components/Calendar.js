"use client";
import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";

export default function Calendar() {
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });

  console.log(date.dateTime);
  const getTimes = () => {
    if (!date.justDate) return;
    const { justDate } = date;
    const beginning = add(justDate, { hours: 10 });
    const end = add(justDate, { hours: 18 });
    const interval = 60;

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
