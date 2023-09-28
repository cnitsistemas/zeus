import PuffLoader from "react-spinners/PuffLoader";

function LoadingComponent({
  loading,
  color,
}: {
  loading: boolean;
  color: string;
}) {
  return (
    <div className="sweet-loading">
      <PuffLoader
        color={color}
        loading={loading}
        cssOverride={{}}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingComponent;
