function SlipPreview({ goBackFn }: { goBackFn: any }) {
  return (
    <div>
      <button onClick={goBackFn}>GO BACK</button>
    </div>
  );
}

export default SlipPreview;
