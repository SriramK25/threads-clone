import axiosInstance from "../../axios/axiosInstance";

export default async function handleLike(postId, setLike, showToast, navigate) {
  try {
    const response = await axiosInstance.post(`/posts/like/${postId}`);

    if (response.status === 200) {
      setLike((like) => ({
        ...like,
        isLiked: !like.isLiked,
        count: !like.isLiked ? like.count + 1 : like.count - 1,
      }));
    }
  } catch (error) {
    showToast(undefined, error.response.data.message, "error");
    navigate("/auth");
  }
}
