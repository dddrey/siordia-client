interface WelcomeHeaderProps {
  title: string;
  className?: string;
}

export const WelcomeHeader = ({ className = "" }: WelcomeHeaderProps) => {
  return (
    <div
      className={`bg-primary rounded-xl px-4 py-4 shadow-sm mx-auto mt-3 ${className}`}
    >
      <span className="font-bold text-[20px] text-textPrimary">
        Добро пожаловать в Kickstart GO!
      </span>
    </div>
  );
};
