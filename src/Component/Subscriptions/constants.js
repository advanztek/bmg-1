export const CREDIT_RATE = 10; // 1 credit = GH₵10

export const PACKAGE_GRADIENTS = [
  {
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#667eea",
  },
  {
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "#f093fb",
  },
  {
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "#4facfe",
  },
  {
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    color: "#43e97b",
  },
  {
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    color: "#fa709a",
  },
  {
    gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    color: "#30cfd0",
  },
];

export const calculatePrice = (credits) => {
  return (credits * CREDIT_RATE).toFixed(2);
};

export const calculateSavings = (credits, price) => {
  const standardPrice = credits * CREDIT_RATE;
  const actualPrice = parseFloat(price);
  const savings = ((standardPrice - actualPrice) / standardPrice) * 100;
  return savings > 0 ? savings.toFixed(0) : 0;
};

export const getPackageGradient = (index) => {
  return PACKAGE_GRADIENTS[index % PACKAGE_GRADIENTS.length];
};
