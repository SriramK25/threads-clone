// UTILITY LIBRARY
import { atom } from "recoil";

const authScreen = atom({
  key: "authScreen",

  // DEFAULT STATE OF THE AUTH PAGE
  default: "login", // ONLY LOGIN & SIGNUP
});
export { authScreen };
