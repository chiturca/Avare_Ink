"use client";
import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import tattooSizes, {
  CLOSING_TIME,
  INTERVAL,
  OPENINING_TIME,
} from "../../helpers/config";
import "./Calendar.css";
import { Popover, Button } from "@nextui-org/react";

export default function Calendar() {
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
    selectedSize: "",
  });

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
  return (
    <div>
      <select
        className="text-cyan-200 bg-gray-900"
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

      {date.justDate && date.selectedSize ? (
        <div>
          {date.dateTime ? (
            <>
              <ReactCalendar
                minDate={new Date()}
                view="month"
                className="REACT-CALENDAR"
                onClickDay={(date) =>
                  setDate((prev) => ({
                    ...prev,
                    justDate: date,
                    dateTime: null,
                  }))
                }
                tileContent={({ date }) => (
                  <div>
                    {date.justDate &&
                    date.justDate.toDateString() === date.toDateString() ? (
                      <div>
                        <p>
                          Selected Date: {format(date.justDate, "MMMM d, yyyy")}
                        </p>
                        <p>
                          Selected Size: {tattooSizes[date.selectedSize]?.size}
                        </p>
                        <p>Available Time Slots:</p>
                        {times?.map((time, i) => (
                          <div key={`time-${i}`}>
                            <button
                              type="button"
                              onClick={() =>
                                setDate((prev) => ({ ...prev, dateTime: time }))
                              }
                            >
                              {format(time, "kk:mm")}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              />
              <p>
                Selected Date: {format(date.justDate, "MMMM d, yyyy")}
                <br />
                Selected Size: {tattooSizes[date.selectedSize].size}
                <br />
                Selected Time: {format(date.dateTime, "kk:mm")}
                <br />
                Duration: {tattooSizes[date.selectedSize].duration}
              </p>
            </>
          ) : (
            <div>
              <p>Selected Date: {format(date.justDate, "MMMM d, yyyy")}</p>
              <p>Selected Size: {tattooSizes[date.selectedSize].size}</p>
              <Popover placement="bottom" showArrow={true}>
                <Popover.Trigger>
                  <button className="p-1 px-3 bg-black">
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
            </div>
          )}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          view="month"
          className="REACT-CALENDAR"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date, dateTime: null }))
          }
        />
      )}
    </div>
  );
}
