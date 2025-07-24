import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  link?: string;
}

const StatCard = ({ title, value, icon, link }: StatCardProps) => {
  if (link)
    return (
      <Link
        to={link}
        className="bg-primary flex justify-between items-center shadow-card-sm-light rounded-[10px] p-3"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[16px] font-medium text-textPrimary">
            {title}
          </span>
        </div>
        <p className="text-3xl font-bold text-textPrimary">{value}</p>
      </Link>
    );

  return (
    <div className="bg-primary flex justify-between items-center shadow-card-sm-light rounded-[10px] p-3">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[16px] font-medium text-textPrimary">
          {title}
        </span>
      </div>
      <p className="text-3xl font-bold text-textPrimary">{value}</p>
    </div>
  );
};

export default StatCard;
