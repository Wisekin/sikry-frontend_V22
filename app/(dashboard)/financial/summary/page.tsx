import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { DollarSign, TrendingUp, TrendingDown, PieChart, BarChart2, AlertTriangle } from 'lucide-react';

const FinancialSummaryPage = () => {
  // Mock data for summary - will be replaced by API call
  const summaryData = {
    totalRevenueYTD: 125000,
    totalExpensesYTD: 75000,
    netProfitYTD: 50000,
    averageTransactionValue: 450.75,
    burnRateMonthly: 6250, // Assuming this is a monthly expense rate
    revenueGrowthPercentage: 15, // Percentage
  };

  // Mock data for a simple bar chart (e.g., Revenue vs Expenses per month)
  const monthlyPerformance = [
    { month: 'Jan', revenue: 10000, expenses: 6000 },
    { month: 'Feb', revenue: 12000, expenses: 7000 },
    { month: 'Mar', revenue: 15000, expenses: 8000 },
    { month: 'Apr', revenue: 13000, expenses: 7500 },
  ];

  // Mock data for a simple pie chart (e.g., Expense Categories)
  const expenseCategories = [
    { name: 'Salaries', value: 40, color: '#3C4568' },
    { name: 'Marketing', value: 25, color: '#4A5578' }, // Slightly different shade for example
    { name: 'Operations', value: 20, color: '#5A6588' },
    { name: 'Software', value: 15, color: '#6A7598' },
  ];

  return (
    <div>
      <EnterprisePageHeader title="Financial Summary" subtitle="An overview of your company's financial health." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard
            title="Total Revenue (YTD)"
            value={summaryData.totalRevenueYTD.toLocaleString()}
            unit="USD"
            icon={<TrendingUp size={24} />}
          />
          <QualityMetricCard
            title="Total Expenses (YTD)"
            value={summaryData.totalExpensesYTD.toLocaleString()}
            unit="USD"
            icon={<TrendingDown size={24} />}
          />
          <QualityMetricCard
            title="Net Profit (YTD)"
            value={summaryData.netProfitYTD.toLocaleString()}
            unit="USD"
            icon={<DollarSign size={24} />}
          />
          <QualityMetricCard
            title="Avg. Transaction Value"
            value={summaryData.averageTransactionValue.toLocaleString()}
            unit="USD"
            icon={<BarChart2 size={24} />}
          />
          <QualityMetricCard
            title="Monthly Burn Rate"
            value={summaryData.burnRateMonthly.toLocaleString()}
            unit="USD"
            icon={<AlertTriangle size={24} />}
          />
          <QualityMetricCard
            title="Revenue Growth"
            value={`${summaryData.revenueGrowthPercentage}%`}
            icon={<TrendingUp size={24} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Placeholder for Monthly Performance Chart */}
          <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart2 className="mr-2" /> Monthly Performance (Revenue vs Expenses)
            </h2>
            <div className="h-64 bg-[#1B1F3B] p-4 rounded flex items-center justify-center">
              {/* Simple textual representation of bar chart data */}
              {monthlyPerformance.map(item => (
                <div key={item.month} className="text-center mx-2">
                  <p className="text-sm">{item.month}</p>
                  <div className="h-32 w-8 bg-green-500 mx-auto" style={{ height: `${item.revenue / 200}px`, backgroundColor: '#3C4568' }} title={`Revenue: ${item.revenue}`}></div>
                  <div className="h-32 w-8 bg-red-500 mx-auto mt-1" style={{ height: `${item.expenses / 200}px`, backgroundColor: '#5A6588' }} title={`Expenses: ${item.expenses}`}></div>
                </div>
              ))}
              {/* <p className="text-gray-400">Bar chart will be displayed here.</p> */}
            </div>
          </div>

          {/* Placeholder for Expense Categories Pie Chart */}
          <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <PieChart className="mr-2" /> Expense Categories
            </h2>
            <div className="h-64 bg-[#1B1F3B] p-4 rounded flex items-center justify-center">
              {/* Simple textual representation of pie chart data */}
              <div className="flex items-center">
                {expenseCategories.map(cat => (
                  <div key={cat.name} className="text-center mx-2">
                     <div style={{width: '50px', height: '50px', backgroundColor: cat.color, borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center'}} title={`${cat.name}: ${cat.value}%`}>
                       {/* <p className="text-xs">{cat.name}</p> */}
                     </div>
                     <p className="text-sm mt-1">{cat.name} ({cat.value}%)</p>
                  </div>
                ))}
              </div>
              {/* <p className="text-gray-400">Pie chart will be displayed here.</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummaryPage;
