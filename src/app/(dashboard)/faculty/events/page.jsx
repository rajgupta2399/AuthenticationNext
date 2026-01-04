import React from "react";
import EventTime from "./event-time/page";
import ViewEvents from "./view-events/page";

const page = () => {
  return (
    <div>
      <div className="mb-5">
        <EventTime />
      </div>
      <div>
        <ViewEvents />
      </div>
    </div>
  );
};

export default page;
