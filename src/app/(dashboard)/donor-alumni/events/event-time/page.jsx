"use client";
import Button from "@/src/components/ui/button/Button";
import Checkbox from "@/src/components/ui/input/Checkbox";
import { Calendar, PlusCircle } from "lucide-react";
import React, { useState } from "react";

import toast from "react-hot-toast";
import { TimeSlots } from "./TimeSlots";

const EventTime = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [newTimeSlot, setNewTimeSlot] = useState({
    eventId: "",
    startTime: "",
    endTime: "",
    date: "",
    maxParticipants: "",
  });

  // Sample events data
  const events = [
    {
      id: "event-1",
      title: "HCL Foundation",
      description: "Join us for an evening of fundraising and entertainment",
      category: "Fundraiser",
      organizer: "Charity Foundation",
      image: "🎭",
    },
  ];

  // Sample available time slots grouped by event
  const availableTimeSlots = [
    {
      id: "slot-1",
      eventId: "event-1",
      date: "2024-02-15",
      startTime: "18:00",
      endTime: "22:00",
      maxParticipants: 200,
      location: "Grand Ballroom",
    },
    {
      id: "slot-2",
      eventId: "event-1",
      date: "2024-02-16",
      startTime: "19:00",
      endTime: "23:00",
      maxParticipants: 200,
      location: "Grand Ballroom",
    },
  ];

  // Events that allow custom time slot creation
  const eventsWithCustomSlots = [
    {
      id: "event-5",
      title: "HCL Foundation",
      description: "One-on-one yoga sessions with certified instructors",
      category: "Wellness",
      organizer: "Yoga Studio",
      image: "🧘",
    },
  ];

  const handleSlotSelection = (slotId) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleTimeSlot = () => {
    toast.success(`Time slot Booked successfully`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTimeSlot((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEventById = (eventId) => {
    return (
      events.find((event) => event.id === eventId) ||
      eventsWithCustomSlots.find((event) => event.id === eventId)
    );
  };

  const getSlotsByEvent = (eventId) => {
    return availableTimeSlots.filter((slot) => slot.eventId === eventId);
  };
  const [formData, setFormData] = useState({
    timeslotsEnteries: [],
  });

  const handleTimeSlotsEntriesChange = (updatedEntries) => {
    setFormData((prev) => ({
      ...prev,
      timeslotsEnteries: updatedEntries,
    }));

    // Clear time slots entries errors when entries are modified
    // if (errors.timeslotsEnteries) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     timeslotsEnteries: "",
    //   }));
    // }
  };

  // if (activeTab == "add") {
  //   if (eventsWithCustomSlots) {
  //     toast.success("select the event to enter the time slots");
  //   }
  // }

  return (
    <div className="w-full h-full dark:text-white/90 ">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center justify-start flex-col space-x-4 -mt-0">
          <div>
            <h1 className="sm:text-xl text-md font-bold text-brand-500">
              Events Time Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from available time slots or create custom slots for your
              events
            </p>
          </div>
        </div>
        {/* Tab Switcher */}
        <div className="flex sm:mb-0 gap-5 sm:flex-row flex-col mb-5">
          <Button
            className={`px-2 py-2 font-medium text-sm transition-colors ${
              activeTab === "available"
                ? "border-b-2 border-brand-500"
                : "text-gray-500 dark:text-white/90 hover:text-white/90 dark:hover:text-white/90 "
            }`}
            onClick={() => setActiveTab("available")}
          >
            <Calendar /> Choose Available Slots
          </Button>
          <Button
            className={`px-2 py-2 font-medium text-sm transition-colors ${
              activeTab === "add"
                ? "border-b-2 border-brand-500"
                : "text-gray-500 dark:text-white/90 hover:text-white/90 dark:hover:text-white/90"
            }`}
            onClick={() => setActiveTab("add")}
          >
            <PlusCircle /> Add Custom Slots
          </Button>
        </div>
      </div>

      {/* Available Time Slots Tab */}
      {activeTab === "available" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-md font-semibold text-brand-600 dark:text-brand-400">
                Available Event Time Slots
              </h2>
            </div>
            {/* {selectedSlots.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {selectedSlots.length} slot(s) selected
              </span>
            )} */}
          </div>

          {/* Events with Available Slots */}
          {events.map((event) => {
            const eventSlots = getSlotsByEvent(event.id);
            if (eventSlots.length === 0) return null;

            return (
              <div
                key={event.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* <div className="text-3xl">{event.image}</div> */}
                  <div>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {event.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                        {event.category}
                      </span>
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                        Organized by: {event.organizer}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {eventSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedSlots.includes(slot.id)
                          ? "border-brand-500 bg-brand-300/20 dark:bg-brand-300/20 dark:border-brand-400"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      onClick={() => handleSlotSelection(slot.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {slot.startTime} - {slot.endTime}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(slot.date)}
                          </p>
                        </div>

                        <Checkbox
                          checked={selectedSlots.includes(slot.id)}
                          onChange={() => {}}
                        />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">
                            Location:
                          </span>
                          <span>{slot.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {selectedSlots.length > 0 && (
            <div className="flex justify-end">
              <Button
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-medium flex items-center gap-2"
                onClick={() => {
                  handleTimeSlot();
                }}
              >
                <span>Confirm {selectedSlots.length} Slot(s)</span>
                <span>→</span>
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Add Custom Time Slots Tab */}
      {activeTab === "add" && (
        <div className="space-y-3">
          <div>
            <h2 className="text-md font-semibold mb-2 text-brand-600 dark:text-brand-400">
              Create Custom Time Slots
            </h2>
          </div>

          {/* Events that allow custom slots */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {eventsWithCustomSlots.map((event) => (
              <div
                key={event.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  newTimeSlot.eventId === event.id
                    ? "border-brand-500 bg-brand-300/20 dark:bg-brand-300/20 dark:border-brand-400"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
                onClick={() =>
                  setNewTimeSlot((prev) => ({ ...prev, eventId: event.id }))
                }
              >
                {/* <div className="text-2xl mb-2">{event.image}</div> */}
                <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {event.description}
                </p>
                <div className="flex gap-2">
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Slot Form */}
          {newTimeSlot.eventId && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg sm:-6 p-2">
              <TimeSlots
                onChange={handleTimeSlotsEntriesChange}
                timeslotsEnteries={formData.timeslotsEnteries}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventTime;
