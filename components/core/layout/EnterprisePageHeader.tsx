import React from 'react';

interface EnterprisePageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // For breadcrumbs or action buttons
}

const EnterprisePageHeader: React.FC<EnterprisePageHeaderProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="bg-[#1B1F3B] text-[#FFFFFF] p-6 shadow-md mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-lg text-gray-300 mt-1">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default EnterprisePageHeader;
