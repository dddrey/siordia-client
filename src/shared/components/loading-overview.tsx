import ContentWrapper from "./wrappers/content-wrapper";
import Loader from "./ui/loader";

const LoadingOverview = () => {
  return (
    <ContentWrapper
      withLayout={false}
      className="bg-secondary z-50 absolute top-0 left-0 w-screen h-screen flex items-end justify-center"
    >
      <div className="w-full bg-secondary rounded-[12px] flex flex-col justify-between items-center mb-[40px]">
        <div className="flex animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/ items-center justify-center text-textAccent text-5xl font-bold mb-10">
          Skill up
        </div>
        <div className="flex justify-center mt-4">
          <Loader size={5} className="border-textAccent" />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default LoadingOverview;
