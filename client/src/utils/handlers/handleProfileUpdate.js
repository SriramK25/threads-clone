import axiosInstance from "../../axios/axiosInstance";

export default async function handleProfileUpdate(
  data,
  setIsLoading,
  userId,
  imageURL,
  showToast,
  navigate
) {
  try {
    setIsLoading(true);
    await axiosInstance.put(`users/update/${userId}`, {
      ...data,
      profilePic: imageURL,
    });

    showToast(undefined, "Profile Updates successfully", "success");
    navigate(-1);
  } catch (error) {
    showToast("Oops", "Something went wrong", "error");
  } finally {
    setIsLoading(false);
  }
}
