import Button from "./Button";
export default function ErrorPage() {
  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-center gap-10 bg-antiflash-white'>
      <div className='fixed left-0 top-0'>
        <p className='text-2xl xl:text-3xl p-4'>
          Flow<span className='font-bold text-raspberry'>Suite</span>
        </p>
      </div>
      <img src='/server-down.svg' alt='' className='h-96' />
      <p className='text-4xl'>Something Went Wrong!</p>
      <div className='w-48'>
        <Button style={"submit"} onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    </div>
  );
}
