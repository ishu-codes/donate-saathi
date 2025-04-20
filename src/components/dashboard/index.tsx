import { useAuth } from "@/context/AuthContext";
import NewDonation from "./NewDonation";
import BottomLeft from "./BottomLeft";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import "./style.css";

export default function DashBoard() {
  const { user } = useAuth();
  const username = user?.email?.split("@")[0] || "Saathi";

  return (
    <div className="p-6 min-h-screen bg-secondary">
      {/* Welcome Section */}
      <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
        <h1 className="text-4xl font-bold text-secondary-foreground">
          Welcome back, {username}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Ready to make a difference today? Your generosity matters.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="w-full h-full grid grid-cols-3 gap-8">
        <div className="w-auto h-full col-span-2 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 animate-[scaleUp_0.4s_ease-out]">
          <TopLeft />
        </div>

        <div className="w-auto row-span-2 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 animate-[scaleUp_0.4s_ease-out_0.1s]">
          <TopRight />
        </div>

        <div className="w-auto bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 animate-[scaleUp_0.4s_ease-out_0.2s]">
          <BottomLeft />
        </div>

        <div className="w-auto bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 animate-[scaleUp_0.4s_ease-out_0.3s]">
          <NewDonation />
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {[
          { title: "Total Donations", value: "24", color: "blue" },
          { title: "Active Requests", value: "12", color: "green" },
          { title: "Lives Impacted", value: "156", color: "purple" },
          { title: "Success Rate", value: "92%", color: "orange" },
        ].map((stat) => (
          <div
            key={stat.title}
            className={`
              bg-card p-4 rounded-xl shadow-sm
              hover:shadow-md transition-all duration-300
              shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 animate-[scaleUp_0.4s_ease-out_0.3s]
            `}
          >
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p
              className={`text-2xl font-bold text-${stat.color}-600 animate-[pulse_2s_ease-in-out_infinite]`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
