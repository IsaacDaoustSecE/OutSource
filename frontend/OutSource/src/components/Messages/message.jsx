
import { useEffect } from "react";

useEffect(() => {
    fetch("http://localhost:3000/messages")
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
        console.error("Error fetching messages:", error);
      })
      .finally(() => {});
  }, []);

const message = () => {
  return (
    <div id = "message-page">
      
    </div>
  )
}

export default message
