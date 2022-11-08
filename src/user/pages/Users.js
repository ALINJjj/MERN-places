import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useHttp from "../../shared/hooks/http-hook";

import UsersList from "../components/UsersList";

const Users = () => {
  const [dataLoaded, setDataLoaded] = useState();


 

  // const USERS = [
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   }
  // ];

  const { isLoading, error, sendRequest, errorHandler } = useHttp();
  useEffect(() => {
    const getData = async () =>{
      try {
        const data = await sendRequest("http://localhost:5000/api/users",)
      setDataLoaded(data.users)
      } catch (error) {
        
      }
    }
    getData()
    
    // const sendRequest = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch("http://localhost:5000/api/users");
    //     const data = await response.json();
    //     if (!response.ok) {
    //       throw new Error(data.message);
    //     }
    //     setDataLoaded(data.users);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    //   setIsLoading(false);
    // };
    // sendRequest();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
        <ErrorModal error={error} onClear = {errorHandler} />
       {dataLoaded && !isLoading && <UsersList items = {dataLoaded}/>}
    </React.Fragment>
  );
};

export default Users;
