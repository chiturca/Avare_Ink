import React from "react";
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
          Small: 1x1 Maximum the size of a postage stamp or smaller (1hour
          appointment)
        </li>
        <li>
          Small: 2x2 Maximum about the size of a business card (2hours
          appointment)
        </li>
        <li>
          Medium: 4x4 Maximum about the size of your palm (4hours appointment)
        </li>
        <li>
          Large: 6x6 Maximum about the size of both hands placed together
          (6hours appointment)
        </li>
        <li>
          Extra Large+ : 8x8+ Half sleeves and other XL (8hours appointment)
        </li>
      </ul>
      {/* <div className="flex justify-center"> */}
      <Scheduler />
      {/* </div> */}
    </div>
  );
}
