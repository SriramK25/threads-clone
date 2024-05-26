// UTILITY LIBRARY
import { atom } from "recoil";

const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(localStorage.getItem("user-thread")) || null,
});
export { userAtom };

// USER IDS
// 6620b7fcb25a507bb9c6a794
// 6623ab1279b2e976ed590e43
// 6623ad0479b2e976ed590e80
// 661a4856764f9b603728702a
// 66211a9b55897d1809c10058
