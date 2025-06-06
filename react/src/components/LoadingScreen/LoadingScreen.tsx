function LoadingScreen() {
  return (
    <div className="absolute w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-100000 flex justify-center items-center backdrop-blur-2xl text-[2em]">
      <p>
        Loading... Pls wait... <br /> (maybe it's your internet speed, bruh...){" "}
        <br /> TIP: Just reload 5-6 times...
      </p>
    </div>
  );
}

export default LoadingScreen;
