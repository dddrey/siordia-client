interface LessonHeaderProps {
  name: string;
  number: number;
}

const LessonHeader = ({ name, number }: LessonHeaderProps) => {
  return (
    <div className="w-fit py-[4px] px-[24px] shadow-card-sm-light fixed top-safe-area-inset left-1/2 -translate-x-1/2 z-10 bg-primary rounded-[12px] mx-auto">
      <p className="text-textPrimary text-[14px] font-medium">{name}</p>
      <p className="text-gray-400 text-center text-[10px] font-semibold">
        Урок {number}
      </p>
    </div>
  );
};

export default LessonHeader;
