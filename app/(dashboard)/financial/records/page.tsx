import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
// Assuming you might want some icons, importing a couple for example
import { Briefcase, TrendingUp, TrendingDown } from 'lucide-react';

const FinancialRecordsPage = () => {
  // Mock data for financial records - will be replaced by API call
  const mockRecords = [
    { id: '1', type: 'income', description: 'Invoice #123 Paid', amount: 1500, currency: 'USD', date: '2023-10-15' },
    { id: '2', type: 'expense', description: 'Software Subscription', amount: 99, currency: 'USD', date: '2023-10-14' },
    { id: '3', type: 'income', description: 'Project Alpha - Phase 1', amount: 5000, currency: 'USD', date: '2023-10-10' },
    { id: '4', type: 'expense', description: 'Office Supplies', amount: 250, currency: 'USD', date: '2023-10-05' },
  ];

  // Mock summary data for metric cards
  const totalRevenue = mockRecords.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = mockRecords.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div>
      <EnterprisePageHeader title="Financial Records" subtitle="View and manage your financial transactions." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <QualityMetricCard
            title="Total Revenue"
            value={totalRevenue.toLocaleString()}
            unit="USD"
            icon={<TrendingUp size={24} />}
            bgColor="bg-[#2A3050]"
            hoverBgColor="hover:bg-[#3C4568]"
            textColor="text-[#FFFFFF]"
          />
          <QualityMetricCard
            title="Total Expenses"
            value={totalExpenses.toLocaleString()}
            unit="USD"
            icon={<TrendingDown size={24} />}
            bgColor="bg-[#2A3050]"
            hoverBgColor="hover:bg-[#3C4568]"
            textColor="text-[#FFFFFF]"
          />
          <QualityMetricCard
            title="Net Profit"
            value={netProfit.toLocaleString()}
            unit="USD"
            icon={<Briefcase size={24} />} // Using Briefcase as a generic business icon
            bgColor="bg-[#2A3050]"
            hoverBgColor="hover:bg-[#3C4568]"
            textColor="text-[#FFFFFF]"
          />
        </div>

        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
          <h2 className="text-xl font-semibold mb-4">Transaction List</h2>
          {mockRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#1B1F3B]">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                    <th className="px-4 py-2 text-right">Currency</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecords.map((record) => (
                    <tr key={record.id} className="border-b border-[#3C4568] hover:bg-[#3C4568]/50">
                      <td className="px-4 py-2">{record.date}</td>
                      <td className="px-4 py-2">{record.description}</td>
                      <td className="px-4 py-2 capitalize">{record.type}</td>
                      <td className="px-4 py-2 text-right">{record.amount.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right">{record.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No financial records found.</p>
          )}
          {/* TODO: Add pagination and filtering options */}
        </div>
      </div>
    </div>
  );
};

export default FinancialRecordsPage;
