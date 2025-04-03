"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddSchedule() {
  const [schedule, setSchedule] = useState({
    day: "",
    time: "",
    title: "",
    type: "New Episode",
  });

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://anizen-server.onrender.com/api/schedules",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(schedule),
        }
      );

      if (res.ok) {
        toast.success("Schedule Added Successfully!");
        setSchedule({ day: "", time: "", title: "", type: "New Episode" });
        console.log(res);
      }
    } catch (err) {
      toast.error("Failed to Add Schedule");
      console.error("Error adding schedule:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg pt-10">
      <h2 className="text-xl font-semibold text-white mb-3">
        Add New Schedule
      </h2>

      {/* Day Selection Dropdown */}
      <div className="mb-3">
        <label htmlFor="day" className="text-white">
          Select Day
        </label>
        <select
          id="day"
          name="day"
          value={schedule.day}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="" disabled>
            Select Day
          </option>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Time Picker */}
      <div className="mb-3">
        <label htmlFor="time" className="text-white">
          Select Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={schedule.time}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Title Input */}
      <div className="mb-3">
        <label htmlFor="title" className="text-white">
          Anime Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={schedule.title}
          onChange={handleChange}
          placeholder="Enter Title"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Type (Readonly Default Value) */}
      <div className="mb-3">
        <label htmlFor="type" className="text-white">
          Type
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={schedule.type}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
          readOnly
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 px-4 py-2 rounded text-white"
      >
        Add Schedule
      </button>
      <ToastContainer />
    </form>
  );
}
