import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const userID = useParams().userId;
  const {isLoading, error, sendRequest, errorHandler} = useHttp();
  const [data,setData] = useState([])
  useEffect(()=>{
    const getData = async () => {
      const responseData =  await sendRequest(`http://localhost:5000/api/places/user/${userID}`);
      setData(responseData)
    }
    getData();    
  },[sendRequest,userID])
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler}/>
     {isLoading &&  <LoadingSpinner center asOverLay/>}
      <PlaceList items={data} />
    </>
  );
};

export default UserPlaces;
