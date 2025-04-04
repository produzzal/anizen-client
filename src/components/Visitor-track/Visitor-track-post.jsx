"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TrackVisitor = () => {
  const router = useRouter();

  // Function to handle visitor tracking
  const trackVisitor = async () => {
    try {
      // Get the current date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      // Check if the user has already visited today
      const lastVisitDate = localStorage.getItem("lastVisitDate");

      if (lastVisitDate !== today) {
        // If the last visit date is not today, track the visitor
        const res = await fetch(
          "https://anizen-server.onrender.com/api/track-visitor",
          {
            method: "POST",
          }
        );

        if (res.ok) {
          console.log("Visitor tracked successfully");

          // Update the last visit date in localStorage to today
          localStorage.setItem("lastVisitDate", today);

          // Mark the user as visited today
          localStorage.setItem("visited", "true");
        } else {
          console.error("Failed to track visitor");
        }
      }
    } catch (error) {
      console.error("Error tracking visitor:", error);
    }
  };

  useEffect(() => {
    trackVisitor();
  }, [router.pathname]);

  return null; // No UI component, just triggers the POST request
};

export default TrackVisitor;
