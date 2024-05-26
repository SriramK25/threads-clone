import ClockLoader from "react-spinners/ClockLoader";

function Loader({ isLoading = false }) {
  return (
    <ClockLoader
      loading={isLoading}
      color="white"
      size={20}
      cssOverride={{ position: "absolute", right: "30%" }}
    />
  );
}

export default Loader;
