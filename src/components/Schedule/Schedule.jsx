"use client";
import { useEffect, useState } from "react";

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState({});
  console.log(scheduleData);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          "https://anizen-server.onrender.com/api/schedules"
        );
        const data = await response.json();

        // Group schedule data by day
        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.day]) {
            acc[item.day] = [];
          }
          acc[item.day].push({
            time: item.time,
            title: item.title,
            type: item.type,
          });
          return acc;
        }, {});

        // Ensure all days of the week are represented
        const daysOfWeek = [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ];

        // Add empty arrays for days with no schedules
        daysOfWeek.forEach((day) => {
          if (!groupedData[day]) {
            groupedData[day] = [];
          }
        });

        setScheduleData(groupedData);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);
  const getCurrentDay = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentDay());

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-blue-500">
        Estimated Schedule/Timing
      </h1>
      <p className="text-sm text-gray-400 mb-6 text-center">
        Please note that the timings provided below are taken from the internet.
        They do not necessarily indicate the exact time of indexing for each
        title.
      </p>

      {/* Weekday Selector */}
      <div className="flex gap-4 flex-wrap justify-center mb-6">
        {Object.keys(scheduleData).map((day) => (
          <button
            key={day}
            className={`px-5 py-3 rounded-lg text-lg transition-all duration-300 ${
              selectedDay === day
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                : "bg-gray-700 hover:bg-gray-600 text-gray-200"
            } hover:scale-105`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Display */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          {selectedDay} Schedule
        </h2>
        {scheduleData[selectedDay]?.length > 0 ? (
          scheduleData[selectedDay].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg mb-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <p className="text-yellow-400 font-semibold text-xl">
                {new Date(`1970-01-01T${item.time}:00`).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>

              <p className="text-lg text-white font-semibold">{item.title}</p>
              <p className="text-sm text-gray-400 italic">{item.type}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">
            No schedule available for {selectedDay}.
          </p>
        )}
      </div>
    </div>
  );
}
