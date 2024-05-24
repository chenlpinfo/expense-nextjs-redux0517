import CircularProgress from '@mui/material/CircularProgress';

export function Loading() {
  return (
    <div className='text-center m-8'>
      <div className='m-8 text-xl'>Loading...</div>;
      <CircularProgress />
    </div>
  );
}
