import React, { useEffect, useState } from "react";
import Button from "../FormElements/Button";
import "./ImageUpload.css";
import { useRef } from "react";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        };
        fileReader.readAsDataURL(file)
    },[file])

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if ((event.target.files && event, event.target.files.length === 1)) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      fileIsValid = true;
      setIsValid(true);
    } else {
      fileIsValid = false;
      setIsValid(false);
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,png,jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl}alt="Preview" />}
          {!previewUrl &&<p>Please import a image.</p> }
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
