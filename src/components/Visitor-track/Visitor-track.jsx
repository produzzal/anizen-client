"use client";
import React, { useEffect, useState } from "react";

const VisitorStats = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [todaysVisitors, setTodaysVisitors] = useState(0);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch visitor stats from backend
  const fetchVisitorStats = async () => {
    try {
      const response = await fetch(
        "https://anizen-server.onrender.com/api/visitor-view"
      );
      const data = await response.json();
      console.log(data);
      setTotalVisitors(data.total);
      setTodaysVisitors(data.today);
      setLiveVisitors(data.live);
    } catch (error) {
      console.error("Error fetching visitor stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitorStats();
  }, []);

  if (loading) {
    return <div>Loading visitor stats...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Visitor Status
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium text-gray-600">Total Visitors:</p>
          <p className="text-xl font-semibold text-blue-600">{totalVisitors}</p>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium text-gray-600">Today's Visitors:</p>
          <p className="text-xl font-semibold text-green-600">
            {todaysVisitors}
          </p>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium text-gray-600">Live Visitors:</p>
          <p className="text-xl font-semibold text-orange-600">
            {liveVisitors}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorStats;
