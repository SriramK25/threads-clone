import axiosInstance from "../../axios/axiosInstance";

export default async function handleReply(
  event,
  setIsLoading,
  postId,
  setReplies,
  replyInputRef
) {
  event.preventDefault();
  try {
    setIsLoading(true);
    const response = await axiosInstance.post(`/posts/reply/${postId}`, {
      replyText: event.target[0].value,
    });

    if (response.status === 201) {
      setReplies((currentReplies) => [response.data.reply, ...currentReplies]);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
    replyInputRef.current.value = "";
    replyInputRef.current.blur();
  }
}
