import { useEffect } from "react";

useEffect(() => {
    fetch("http://localhost:3000/users")
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
        console.error("Error fetching users:", error);
      })
      .finally(() => {});
  }, []);

 const users = () => {
   return (
     <div id = "account-page">
        
      </div>
   )
 }
 
 export default test
 