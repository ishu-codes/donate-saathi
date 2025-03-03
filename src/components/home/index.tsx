import TopLeft from "./TopLeft";

export default function Home() {
  return (
    <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-8">
      <div className="w-auto h-full col-span-2 bg-card rounded-2xl">
        <TopLeft />
      </div>
      <div className="w-auto row-span-2 bg-blue-300"></div>
      <div className="w-auto full bg-green-300"></div>
      <div className="w-auto bg-green-300"></div>
    </div>
  );
}
