"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../../components/ui/table";
import Button from "@/src/components/ui/button/Button";

const Page = () => {
  const router = useRouter();

  // Sample data for travel detail registrations
  const travelRegistrationData = [
    {
      id: 1,
      name: "Prabhkirt",
      email: "prabh@test.com",
      dateOfArrival: "12-Nov-2024",
      timeOfArrival: "14:30",
      dateOfDeparture: "14-Nov-2024",
      timeOfDeparture: "11:00",
      pickupRequired: "Yes",
      pickupLocation: "Airport",
      dropOffRequired: "Yes",
      dropLocation: "Campus",
      numberOfDays: "3",
      numberOfPax: "2",
      currency: "USD",
      contributionAmount: "$600",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh@test.com",
      dateOfArrival: "15-Nov-2024",
      timeOfArrival: "16:45",
      dateOfDeparture: "18-Nov-2024",
      timeOfDeparture: "10:30",
      pickupRequired: "No",
      pickupLocation: "-",
      dropOffRequired: "Yes",
      dropLocation: "Hotel",
      numberOfDays: "4",
      numberOfPax: "1",
      currency: "USD",
      contributionAmount: "$400",
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@test.com",
      dateOfArrival: "10-Nov-2024",
      timeOfArrival: "09:15",
      dateOfDeparture: "12-Nov-2024",
      timeOfDeparture: "16:20",
      pickupRequired: "Yes",
      pickupLocation: "Railway Station",
      dropOffRequired: "No",
      dropLocation: "-",
      numberOfDays: "3",
      numberOfPax: "3",
      currency: "EUR",
      contributionAmount: "€900",
    },
    {
      id: 4,
      name: "Amit Patel",
      email: "amit@test.com",
      dateOfArrival: "18-Nov-2024",
      timeOfArrival: "20:00",
      dateOfDeparture: "20-Nov-2024",
      timeOfDeparture: "14:45",
      pickupRequired: "Yes",
      pickupLocation: "Others",
      pickupLocationOther: "City Center Bus Stand",
      dropOffRequired: "Yes",
      dropLocation: "Others",
      dropLocationOther: "Conference Venue",
      numberOfDays: "3",
      numberOfPax: "2",
      currency: "USD",
      contributionAmount: "$600",
    },
    {
      id: 5,
      name: "Neha Gupta",
      email: "neha@test.com",
      dateOfArrival: "20-Nov-2024",
      timeOfArrival: "11:30",
      dateOfDeparture: "22-Nov-2024",
      timeOfDeparture: "18:15",
      pickupRequired: "No",
      pickupLocation: "-",
      dropOffRequired: "No",
      dropLocation: "-",
      numberOfDays: "3",
      numberOfPax: "1",
      currency: "USD",
      contributionAmount: "$300",
    },
  ];

  const getPickupLocation = (item) => {
    if (item.pickupLocation === "Others" && item.pickupLocationOther) {
      return `${item.pickupLocation} (${item.pickupLocationOther})`;
    }
    return item.pickupLocation;
  };

  const getDropLocation = (item) => {
    if (item.dropLocation === "Others" && item.dropLocationOther) {
      return `${item.dropLocation} (${item.dropLocationOther})`;
    }
    return item.dropLocation;
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-brand-500">
              Travel Detail Registration Report
            </h1>
          </div>
        </div>

        <div className="sm:flex flex-row-reverse gap-5 hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
          >
            ← Back to Survey
          </button>
        </div>
        <div className="sm:hidden flex">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="overflow-hidden rounded-lg">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Arrival
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Departure
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Pickup
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Drop-off
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Duration
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Pax
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Amount
                  </TableCell>
                  {/* <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Actions
                  </TableCell> */}
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                {travelRegistrationData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TableCell className="px-6 py-2.5">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm text-nowrap text-center">
                          {item.name}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-2.5">
                      <div className="text-sm text-nowrap text-center text-gray-600 dark:text-gray-300">
                        {item.email}
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-2.5 text-center">
                      <div className="text-sm text-nowrap text-center text-gray-600 dark:text-gray-300">
                        {item.dateOfArrival}
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-2.5 text-center">
                      <div className="text-sm text-nowrap text-center text-gray-600 dark:text-gray-300">
                        {item.dateOfDeparture}
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-2.5 text-center">
                      <div className="text-sm text-nowrap text-center text-gray-600 dark:text-gray-300">
                        {getPickupLocation(item)}
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-2.5 text-center">
                      <div className="text-sm text-nowrap text-center text-gray-600 dark:text-gray-300">
                        {getDropLocation(item)}
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-2.5 text-center">
                      <div className="text-sm text-nowrap text-center text-gray-600 dark:text-gray-300">
                        {item.numberOfDays} days
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-2.5 text-center">
                      <div className="text-sm text-nowrap text-center text-gray-600 dark:text-gray-300">
                        {item.numberOfPax}
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-2.5 text-center">
                      <div className="text-sm text-nowrap text-center font-medium text-gray-900 dark:text-white">
                        {item.contributionAmount}
                      </div>
                    </TableCell>

                    {/* <TableCell className="px-6 py-2.5 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          View
                        </Button>
                        <Button size="sm" className="text-xs">
                          Edit
                        </Button>
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total {travelRegistrationData.length} travel registrations
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
