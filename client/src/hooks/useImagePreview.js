// LOCAL FILES
import useToaster from "./useToaster";

// REACT HOOKS
import { useState } from "react";

function useImagePreview() {
  // LOCAL VARIABLES
  const showToast = useToaster();

  // REACT HOOK VARIABLES
  const [imageURL, setImageURL] = useState("");

  function handleFileChange(e) {
    // GET FILE DATA FROM EVENT
    const file = e.target.files[0];

    // CHECK IF THERE'S A FILE AND THE UPLAODED FILE IS AN IAMGE
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      // READ(PARSE) IMAGE AS BASE 64 STRING
      reader.readAsDataURL(file);

      // AFTER READING UPDATE STATE
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
    } else {
      // IF FILE TYPE IS NOT AN IMAGE, SHOW ERROR TOAST
      showToast("Invalid file", "Please upload a image file", "error");
    }
  }

  return { imageURL, handleFileChange, setImageURL };
}

export default useImagePreview;
