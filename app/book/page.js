import React from "react";
import Calendar from "../components/Calendar/Calendar";
import Scheduler from "../components/Calendar/Scheduler";

export default function Book() {
  return (
    <div>
      <p>
        Your approximate duration of appointment will be calculated based on
        your tattoo size. Please pick the option based on your availablity.
        <br />
        For learning the exact price table, please contact me through +90 000
        000 0000
      </p>
      <h2>What is the size of your tattoo?</h2>
      <ul>
        <li>
          Small: 2x2 Maximum about the size of a business card (2hour
          appointment)
        </li>
        <li>
          Medium: 4x4 Maximum about the size of your palm (4hour appointment)
        </li>
        <li>
          Large: 6x6 Maximum about the size of both hands placed together (6hour
          appointment)
        </li>
        <li>
          Extra Large+ : 8x8+ Half sleeves and other XL (8hour appointment)
        </li>
      </ul>
      {/* <div className="flex justify-center"> */}
      {/* <Calendar /> */}
      <Scheduler />
      {/* </div> */}
    </div>
  );
}
