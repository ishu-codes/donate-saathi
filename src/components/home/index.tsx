import NewDonation from "./NewDonation";
import BottomLeft from "./BottomLeft";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";

export default function Home() {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-8">
      <div className="w-auto h-full col-span-2 bg-card rounded-2xl">
        <TopLeft />
      </div>
      <div className="w-auto row-span-2 bg-card rounded-2xl">
        <TopRight />
      </div>
      <div className="w-auto bg-card rounded-2xl">
        <BottomLeft />
      </div>
      <div className="w-auto bg-card rounded-2xl">
        <NewDonation />
      </div>
    </div>
  );
}
