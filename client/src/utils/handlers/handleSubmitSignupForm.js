import axiosInstance from "../../axios/axiosInstance";

export default async function handleSubmitSignupForm(
  data,
  setIsLoading,
  setUser,
  navigate,
  showToast
) {
  try {
    setIsLoading(true);

    const response = await axiosInstance.post("/users/signup", {
      ...data,
    });
    if (response.status === 201) {
      setUser(response.data);
      showToast(undefined, "Account created successfully", "success");
      navigate("/");
    }
  } catch (error) {
    showToast(
      undefined,
      error.response.data.message || "Something went Wrong",
      "error"
    );
  } finally {
    setIsLoading(false);
  }
}
