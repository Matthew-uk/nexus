interface Order {
  customer: {
    name: string;
    email: string;
  };
  type: string;
  status: string;
  date: string;
  amount: string;
}

export const orders: Order[] = [
  {
    customer: { name: "Liam Johnson", email: "liam@example.com" },
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },
  {
    customer: { name: "Olivia Smith", email: "olivia@example.com" },
    type: "Refund",
    status: "Declined",
    date: "2023-06-24",
    amount: "$150.00",
  },
  {
    customer: { name: "Noah Williams", email: "noah@example.com" },
    type: "Subscription",
    status: "Fulfilled",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    customer: { name: "Emma Brown", email: "emma@example.com" },
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-26",
    amount: "$450.00",
  },
  {
    customer: { name: "Liam Johnson", email: "liam@example.com" },
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },
  {
    customer: { name: "Liam Johnson", email: "liam@example.com" },
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },
  {
    customer: { name: "Olivia Smith", email: "olivia@example.com" },
    type: "Refund",
    status: "Declined",
    date: "2023-06-24",
    amount: "$150.00",
  },
  {
    customer: { name: "Emma Brown", email: "emma@example.com" },
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-26",
    amount: "$450.00",
  },
  {
    customer: { name: "Harrison Wells", email: "harrisonwells@example.com" },
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-26",
    amount: "$800.00",
  },
];
