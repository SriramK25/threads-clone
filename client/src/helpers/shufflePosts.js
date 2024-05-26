export default function shufflePost(post = []) {
  const postslength = post.length;

  //   GUARD
  if (!postslength) return [];

  //   STORE THE GENERATED UNIQUE RANDOM NUMBERS
  const logs = [];

  //   STORE POSTS
  const shuffledPosts = [];
  let i = true;

  while (i) {
    const randomNum = Math.floor(Math.random() * postslength);
    if (!logs.includes(randomNum)) {
      logs.push(randomNum);
      shuffledPosts.push(post[randomNum]);
    }
    if (shuffledPosts.length === postslength) {
      i = false;
    }
  }
  return shuffledPosts;
}
