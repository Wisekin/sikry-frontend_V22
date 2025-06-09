import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Briefcase, TrendingUp, TrendingDown } from 'lucide-react';

const FinancialRecordsPage = () => {
  // Mock data for financial records - will be replaced by API call
  const mockRecords = [
    { id: '1', type: 'income', description: 'Invoice #123 Paid', amount: 1500, currency: 'USD', date: '2023-10-15' },
    { id: '2', type: 'expense', description: 'Software Subscription', amount: 99, currency: 'USD', date: '2023-10-14' },
    { id: '3', type: 'income', description: 'Project Alpha - Phase 1', amount: 5000, currency: 'USD', date: '2023-10-10' },
    { id: '4', type: 'expense', description: 'Office Supplies', amount: 250, currency: 'USD', date: '2023-10-05' },
    { id: '5', type: 'income', description: 'Consulting Services Q3', amount: 2200, currency: 'USD', date: '2023-09-28' },
    { id: '6', type: 'expense', description: 'Cloud Hosting Bill', amount: 150, currency: 'USD', date: '2023-09-25' },
  ];

  // Mock summary data for metric cards
  const totalRevenue = mockRecords.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = mockRecords.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  // Example change data (replace with actual logic if available)
  const revenueChange = "+5.2% this month";
  const expenseChange = "+1.8% this month";
  const profitChange = "+10.5% this month";


  return (
    <div className="bg-gray-50/50 min-h-screen">
      <EnterprisePageHeader title="Financial Records" subtitle="View and manage your financial transactions." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard
            title="Total Revenue"
            value={totalRevenue.toLocaleString()}
            unit="USD"
            icon={<TrendingUp size={24} />}
            change={revenueChange}
            changeColor="text-green-600"
          />
          <QualityMetricCard
            title="Total Expenses"
            value={totalExpenses.toLocaleString()}
            unit="USD"
            icon={<TrendingDown size={24} />}
            change={expenseChange}
            changeColor="text-red-600"
          />
          <QualityMetricCard
            title="Net Profit"
            value={netProfit.toLocaleString()}
            unit="USD"
            icon={<Briefcase size={24} />}
            change={profitChange}
            changeColor="text-green-600"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#1B1F3B]">Transaction List</h2>
          {mockRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Currency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{record.description}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-right">{record.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{record.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No financial records found.</p>
          )}
          {/* TODO: Add pagination and filtering options */}
        </div>
      </div>
    </div>
  );
};

export default FinancialRecordsPage;
