import React from 'react'
import { useEffect } from "react";


useEffect(() => {
    fetch("http://localhost:3000/notifications")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFetchedProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      })
      .finally(() => {});
  }, []);

const notification = () => {
  return (
    <div>
      
    </div>
  )
}

export default notification
