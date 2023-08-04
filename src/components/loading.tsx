import BarLoader from "react-spinners/BarLoader";

function LoadingComponent(props: any) {
  const { loading, color } = props;

  return (
    <div className="sweet-loading">
      <BarLoader
        color={color}
        loading={loading}
        cssOverride={{}}
        height={4}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingComponent;
