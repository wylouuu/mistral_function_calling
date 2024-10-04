const data = [
  {
    transaction_id: "T001",
    customer_id: "C001",
    payment_amout: 125.5,
    payment_date: "2021-10-05",
    payment_status: "Paid",
  },
  {
    transaction_id: "T002",
    customer_id: "C002",
    payment_amout: 89.99,
    payment_date: "2021-10-06",
    payment_status: "Unpaid",
  },
  {
    transaction_id: "T003",
    customer_id: "C003",
    payment_amout: 120.0,
    payment_date: "2021-10-07",
    payment_status: "Paid",
  },
  {
    transaction_id: "T004",
    customer_id: "C002",
    payment_amout: 54.3,
    payment_date: "2021-10-05",
    payment_status: "Paid",
  },
  {
    transaction_id: "T005",
    customer_id: "C001",
    payment_amout: 210.2,
    payment_date: "2021-10-08",
    payment_status: "Pending",
  },
];

export function getPaymentStatus({ transactionId }) {
  const transaction = data.find((row) => row.transaction_id === transactionId);
  if (transaction) {
    return JSON.stringify({ status: transaction.payment_status });
  } else {
    return JSON.stringify({ error: "transaction id not found" });
  }
}

export function getPaymentDate({ transactionId }) {
  const transaction = data.find((row) => row.transaction_id === transactionId);
  if (transaction) {
    return JSON.stringify({ status: transaction.payment_date });
  } else {
    return JSON.stringify({ error: "transaction id not found" });
  }
}

export const tools = [
  {
    type: "function",
    function: {
      name: "getPaymentStatus",
      description: "Get payment status of a transaction",
      parameters: {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            description: "The transaction id",
          },
        },
        required: ["transactionId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPaymentDate",
      description: "Get payment date of a transaction",
      parameters: {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            description: "The transaction id",
          },
        },
        required: ["transactionId"],
      },
    },
  },
];
