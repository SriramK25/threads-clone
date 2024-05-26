// UTILITY LIBRARY
import { useRecoilValue } from "recoil";

// LOCAL FILES
import Signup from "../components/Signup";
import Login from "../components/Login";
import { authScreen } from "../atoms/authScreenAtom";

function AuthPage() {
  // LOCAL VARIABLES
  const authType = useRecoilValue(authScreen);

  return <>{authType === "login" ? <Login /> : <Signup />}</>;
}

export default AuthPage;
