import {
  Apple,
  Shirt,
  House,
  GraduationCap,
  BriefcaseMedical,
  Wallet,
  HandCoins,
} from "lucide-react";

export const DonationCategories = [
  { title: "food", icon: <Apple /> },
  { title: "clothing", icon: <Shirt /> },
  { title: "shelter", icon: <House /> },
  { title: "education", icon: <GraduationCap /> },
  { title: "medical", icon: <BriefcaseMedical /> },
  { title: "money", icon: <Wallet /> },
  { title: "other", icon: <HandCoins /> },
  { title: "poverty-alleviation", icon: <HandCoins /> },
  { title: "women-empowerment", icon: <HandCoins /> },
  { title: "children", icon: <HandCoins /> },
  { title: "disaster-relief", icon: <HandCoins /> },
] as const;

type DonationCategory = (typeof DonationCategories)[number]["title"];

type DonationStatus = "pending" | "confirmed" | "completed" | "failed";

export type Recepient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "individual" | "organization";
  address?: string;
};

export type Donation = {
  id: string;
  category: DonationCategory;
  message?: string;
  amount: string;
  date: string;
  recipients: Recepient[];
  status: DonationStatus;
};

export type NGO = {
  id: string;
  name: string;
  description: string;
  category: DonationCategory[];
  logo?: string;
  location: string;
  email: string;
  phone: string;
  website?: string;
};
