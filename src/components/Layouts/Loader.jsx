import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
      <div className="min-h-screen min-w-full flex items-center justify-center z-50">
          <CircularProgress />
      </div>
  );
};

export default Loader;
