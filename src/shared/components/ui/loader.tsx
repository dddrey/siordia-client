interface LoaderProps {
  className?: string;
  size?: number;
  color?: string;
}

const Loader = ({ className, size = 4 }: LoaderProps) => {
  return (
    <div
      className={`w-${size} h-${size} border-2 border-t-transparent rounded-full animate-spin ${className}`}
    ></div>
  );
};

export default Loader;
