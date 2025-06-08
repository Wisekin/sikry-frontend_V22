import React from 'react';

interface QualityMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode; // Allow passing an icon component
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
}

const QualityMetricCard: React.FC<QualityMetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  bgColor = 'bg-[#2A3050]', // Default: #2A3050
  hoverBgColor = 'hover:bg-[#3C4568]', // Default hover: #3C4568
  textColor = 'text-[#FFFFFF]', // Default text: #FFFFFF
}) => {
  return (
    <div
      className={`
        ${bgColor} ${hoverBgColor} ${textColor}
        p-6 rounded-lg shadow-md transition-colors duration-200 ease-in-out
        flex flex-col items-start justify-between min-h-[120px]
      `}
    >
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold">
          {value}
          {unit && <span className="text-lg font-normal ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
};

export default QualityMetricCard;
