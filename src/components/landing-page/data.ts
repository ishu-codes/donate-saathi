import { NGO } from "@/interfaces";

export const categories = [
  {
    name: "No Child Orphaned",
    mission: "Mission",
    count: "₹25,65,503 raised, ₹24L left",
    donations: "1859 Donations",
    taxBenefits: "Tax Benefits Available",
    backgroundImage:
      "https://www.humanium.org/en/wp-content/uploads/2024/09/shutterstock_1315203182-1024x576.jpg",
  },
  {
    name: "Feed the Hungry",
    mission: "Mission",
    count: "Help feed those in need",
    donations: "donate a meal today!",
    taxBenefits: "Tax Benefits Available",
    backgroundImage:
      "https://food-ubc.b-cdn.net/wp-content/uploads/2022/04/AdobeStock_270993782-scaled.jpeg",
  },
  {
    name: "Protect Abandoned Elders",
    mission: "Mission",
    count: "Support elderly care",
    donations: "Pledge Monthly",
    taxBenefits: "Tax Benefits Available",
    backgroundImage:
      "https://india.unfpa.org/sites/default/files/styles/original/public/news/homepage_card_cover_1000_x_560_2_1.png?itok=v8cdIU9T",
  },
  // Add more categories as needed
];

export const steps = [
  {
    title: "Choose a Cause",
    description:
      "Browse through various causes and find what resonates with you.",
  },
  {
    title: "Start Campaign",
    description:
      "Create your campaign in minutes with our easy-to-use platform.",
  },
  {
    title: "Share & Raise",
    description:
      "Share your campaign with friends and family to maximize impact.",
  },
  {
    title: "Track Impact",
    description:
      "Monitor your campaign's progress and see the difference you make.",
  },
];

export const TESTIMONIALS = [
  {
    text: "DonateSaathi has made it incredibly easy for me to contribute to causes I care about. The transparency and impact tracking really sets them apart.",
    author: "John Doe",
    role: "Regular Donor",
    rating: 5,
    image: "/avatar-1.jpg",
  },
  {
    text: "I've been using this platform for my charitable giving, and it's been a wonderful experience. The process is smooth and the impact is visible.",
    author: "Jane Smith",
    role: "Monthly Contributor",
    rating: 5,
    image: "/avatar-2.jpg",
  },
  {
    text: "What stands out about DonateSaathi is their commitment to transparency. I can see exactly how my donations are making a difference.",
    author: "Mike Johnson",
    role: "Impact Investor",
    rating: 5,
    image: "/avatar-3.jpg",
  },
];

export const slides = [
  {
    id: 3,
    url: "https://stanfordbloodcenter.org/wp-content/uploads/2024/03/special-donations-banner.png",
    alt: "Donation campaign image 2",
  },
  {
    id: 1,
    url: "https://www.investopedia.com/thmb/SlThGdKuU_d6tVNShcUYodua0cM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1173117669-baa23a3889054f828aebc58f9de136b6.jpg",
    alt: "African children asking for food",
  },
  {
    id: 2,
    url: "https://www.contactspace.com/wp-content/uploads/person-making-a-donation-min-scaled.jpeg",
    alt: "Donation campaign image 1",
  },
  {
    id: 4,
    url: "https://static.vecteezy.com/system/resources/previews/039/379/808/non_2x/people-donate-food-tiny-characters-put-grocery-product-in-charity-box-volunteer-community-help-for-poor-holiday-food-drive-concept-vector.jpg",
    alt: "Donation campaign image 3",
  },
];

export const partners = [
  { name: "Latika Roy Memorial", logo: "/latika-logo.png" },
  { name: "Educo", logo: "/educo-logo.png" },
  { name: "Sethu Trust", logo: "/sethu-logo.png" },
  { name: "Marathwada Navnirman", logo: "/marathwada-logo.png" },
  { name: "Tomorrow's Foundation", logo: "/tomorrow-logo.png" },
  { name: "Simple Education", logo: "/simple-education-logo.png" },
];
export const NGOs: NGO[] = [
  {
    id: "1",
    name: "Akshaya Patra Foundation",
    description:
      "World's largest NGO-run school meal programme serving millions of children",
    category: ["food", "education"],
    location: "Bengaluru, Karnataka",
    email: "contact@akshayapatra.org",
    phone: "+91-80-2782-0700",
    website: "www.akshayapatra.org",
  },
  {
    id: "2",
    name: "Pratham",
    description:
      "Innovative learning solutions to improve quality of education",
    category: ["education"],
    location: "Mumbai, Maharashtra",
    email: "info@pratham.org",
    phone: "+91-22-2481-1919",
    website: "www.pratham.org",
  },
  {
    id: "3",
    name: "CRY - Child Rights and You",
    description:
      "Ensuring happy, healthy, and creative childhoods for Indian children",
    category: ["children", "education"],
    location: "Mumbai, Maharashtra",
    email: "support@cry.org",
    phone: "+91-22-2308-1040",
    website: "www.cry.org",
  },
  {
    id: "4",
    name: "Goonj",
    description: "Turning urban surplus into rural development opportunities",
    category: ["clothing", "disaster-relief"],
    location: "New Delhi, Delhi",
    email: "mail@goonj.org",
    phone: "+91-11-2616-1915",
    website: "www.goonj.org",
  },
  {
    id: "5",
    name: "Give India Foundation",
    description: "Bridging the gap between donors and credible NGOs",
    category: ["poverty-alleviation"],
    location: "Bangalore, Karnataka",
    email: "info@giveindia.org",
    phone: "+91-80-4090-6345",
    website: "www.giveindia.org",
  },
  {
    id: "6",
    name: "Smile Foundation",
    description: "Working for education, healthcare, and women empowerment",
    category: ["education", "medical", "women-empowerment"],
    location: "New Delhi, Delhi",
    email: "info@smilefoundationindia.org",
    phone: "+91-11-4310-7070",
    website: "www.smilefoundationindia.org",
  },
];

export const CAMPAIGNS = [
  {
    title: "Help Children Get Education",
    description:
      "Support underprivileged children with quality education and learning materials.",
    image:
      "https://www.unicefusa.org/sites/default/files/2023-02/UNI122739.jpg",
    raised: 75000,
    goal: 100000,
    daysLeft: 15,
  },
  {
    title: "Feed the Hungry",
    description:
      "Provide nutritious meals to families facing food insecurity in rural communities.",
    image:
      "https://ofhsoupkitchen.org/wp-content/uploads/2023/03/bible-feeding-hungry-1.jpg",
    raised: 45000,
    goal: 80000,
    daysLeft: 20,
  },
  {
    title: "Medical Aid for Elderly",
    description:
      "Support healthcare and medical supplies for senior citizens in need.",
    image:
      "https://partnersforhomecare.ca/wp-content/uploads/2017/07/Hire-Home-Health-Nursing-For-Seniors-For-Your-Family-Member.png",
    raised: 90000,
    goal: 150000,
    daysLeft: 10,
  },
];
