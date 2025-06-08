import { NextResponse } from 'next/server';

interface FinancialSummaryData {
  keyMetrics: {
    totalRevenueYTD: number;
    totalExpensesYTD: number;
    netProfitYTD: number;
    averageTransactionValue: number;
    burnRateMonthly: number;
    revenueGrowthPercentage: number; // As a percentage, e.g., 15 for 15%
  };
  monthlyPerformance: Array<{
    month: string; // e.g., "Jan", "Feb"
    year: number;
    revenue: number;
    expenses: number;
    profit: number;
  }>;
  expenseBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number; // As a percentage of total expenses, e.g., 40 for 40%
  }>;
}

const mockSummaryData: FinancialSummaryData = {
  keyMetrics: {
    totalRevenueYTD: 125678.50,
    totalExpensesYTD: 75234.20,
    netProfitYTD: 50444.30,
    averageTransactionValue: 450.75,
    burnRateMonthly: 6250.00,
    revenueGrowthPercentage: 15.5,
  },
  monthlyPerformance: [
    { month: 'January', year: 2023, revenue: 25000, expenses: 15000, profit: 10000 },
    { month: 'February', year: 2023, revenue: 28000, expenses: 16000, profit: 12000 },
    { month: 'March', year: 2023, revenue: 32000, expenses: 18000, profit: 14000 },
    { month: 'April', year: 2023, revenue: 30500, expenses: 17500, profit: 13000 },
    // ... more months
  ],
  expenseBreakdown: [
    { category: 'Salaries & Wages', amount: 35000, percentage: 46.5 },
    { category: 'Marketing & Advertising', amount: 15000, percentage: 19.9 },
    { category: 'Operations & Rent', amount: 12000, percentage: 16.0 },
    { category: 'Software & Subscriptions', amount: 8000, percentage: 10.6 },
    { category: 'Other', amount: 5234.20, percentage: 7.0 },
  ],
};

export async function GET(request: Request) {
  // In a real application, this data would be calculated from financial_records
  // or a dedicated aggregated table, considering date ranges and other filters.
  try {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(mockSummaryData);
  } catch (error) {
    console.error("Error fetching financial summary:", error);
    return NextResponse.json({ message: "Error fetching financial summary" }, { status: 500 });
  }
}
