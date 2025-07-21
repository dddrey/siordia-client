interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

const PhoneFrame = ({ children, className = "" }: PhoneFrameProps) => {
  return (
    <div
      className={`flex flex-col items-start justify-center px-4 ${className}`}
    >
      <div className="w-full max-w-[280px] aspect-[9/18] relative">
        {/* iPhone 11 рамка */}
        <div className="w-full h-full bg-black rounded-[2.5rem] p-1">
          <div className="w-full h-full bg-inherit rounded-[2.2rem] relative overflow-hidden">
            {/* Вырез для камеры */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl z-10"></div>

            {/* Содержимое экрана */}
            <div className="w-full h-full bg-inherit flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
