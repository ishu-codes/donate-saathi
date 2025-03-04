import { Donation } from "./interfaces";

export const DONATIONS: Donation[] = [
  {
    id: "1",
    category: "food",
    message: "Help us feed the hungry",
    amount: "2kg of rice + 1kg of sugar",
    date: "2021-01-01",
    recipients: [
      {
        id: "1",
        name: "Akshaya Patra Foundation",
        email: "donate@akshayapatra.in",
        phone: "1234567890",
        type: "organization",
      },
    ],
    status: "pending",
  },
  {
    id: "2",
    category: "clothing",
    message: "Help the children in need",
    amount: "5 t-shirts + 2 pairs of pants",
    date: "2021-01-02",
    recipients: [
      {
        id: "2",
        name: "Shree Bidada Sarvodaya Trust",
        email: "contact@shreebidadatrust.org",
        phone: "0987654321",
        type: "organization",
      },
    ],
    status: "pending",
  },
  {
    id: "3",
    category: "money",
    message: "Help us provide money to needy women.",
    amount: "Rs. 10,000",
    date: "2021-01-03",
    recipients: [
      {
        id: "3",
        name: "SEWA (Self Employed Women's Association)",
        email: "contact@sewa.org",
        phone: "1234567890",
        type: "organization",
      },
    ],
    status: "pending",
  },
];
