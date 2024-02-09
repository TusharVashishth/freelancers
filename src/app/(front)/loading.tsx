export default function Loading() {
  return (
    <div className="flex justify-center items-center my-5">
      <div
        className={`animate-spin w-10 h-10 border-t-4 border-b-4 border-primary rounded-full`}
      ></div>
    </div>
  );
}
