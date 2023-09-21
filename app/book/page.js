import React from "react";
import Scheduler from "../components/Calendar/Scheduler";
import Card from "../components/ui/Card";
import { SizeList } from "../helpers/SizeList";

export default function Book() {
  return (
    <div className="min-h-screen">
      <h2 className="text-center text-2xl mb-2">
        What is the size of your tattoo?
      </h2>
      <div className="grid text-center lg:grid-cols-4 lg:text-left lg:pt-0">
        {SizeList.map((item, index) => {
          return (
            <Card
              key={index}
              href={item.href}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
      <p className="text-center mb-4">
        Your approximate duration of appointment will be calculated based on
        your tattoo size. Please pick the option below the calendar based on
        your availability.
        <br />
        For learning the exact price table, please contact me through +90 000
        000 0000
      </p>
      <div className="mb-64">
        <Scheduler />
      </div>
    </div>
  );
}
