import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useHttp from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const UpdatePlace = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, errorHandler } = useHttp();
  const [place, setPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getPlace = async () => {
      const responseData = await sendRequest(
        `http://localhost:5000/api/places/${placeId}`
      );
      if (responseData) {
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      }
      setPlace(responseData);
    };
    getPlace();
  }, [setFormData, sendRequest, placeId]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
  try {
    await sendRequest(
      `http://localhost:5000/api/places/${placeId}`,
      "PATCH",
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
      {
        "content-type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );
    history.push(`/${auth.userID}/places`)
  } catch (error) {
    
  }
  };

  if (!place) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        {place && (
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
        )}
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </>
  );
};

export default UpdatePlace;
