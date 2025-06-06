function LoadingScreen({children}:any) {
  return (
    <div className="absolute w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-100000 flex justify-center items-center backdrop-blur-2xl text-[2em]">
        {children}  </div>
  );
}

export default LoadingScreen;
