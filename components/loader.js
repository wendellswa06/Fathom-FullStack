const Loader = ({ isLoading }) => {
  return (
    <div
      style={{ zIndex: "100000", display: isLoading ? "" : "none", top: "-20px" }}
      className="absolute left-0 h-full w-full flex items-center justify-center"
    >
      <div className="loader">Loading...</div>
    </div>
  );
};

export default Loader;
