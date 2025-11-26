import { useEffect } from "react";

useEffect(() => {
    fetch("http://localhost:3000/freelancers")
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
        console.error("Error fetching freelancers:", error);
      })
      .finally(() => {});
  }, []);

const freelancer = () => {
  return (
    <div id = "freelancer-page">
      
    </div>
  )
}

export default freelancer
