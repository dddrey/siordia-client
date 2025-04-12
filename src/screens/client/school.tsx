import { motion } from "framer-motion";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import withAuth from "@/shared/components/hoc/auth";
import useBackButton from "@/shared/hooks/use-backbutton";

const SchoolScreen = () => {
  useBackButton({
    isOpen: true,
  });
  return (
    <ContentWrapper
      className="flex flex-col pt-safe-area items-center justify-center"
      withFooter={false}
    >
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
        className="w-[94%] mb-4 h-[25vh] shadow-card-light rounded-[12px] overflow-hidden"
      >
        <div className="w-full h-full rounded-[12px] overflow-hidden">
          <img
            src="/images/sio/IMG_2422.WEBP"
            alt="Академия Kickstart"
            className="w-full h-full object-cover scale-[1.02]"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-[94%]"
      >
        <div className="space-y-4 text-textPrimary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-primary/50 p-4 flex flex-col gap-2 rounded-lg shadow-card-sm-light"
          >
            <p className="text-lg font-semibold">FC Kickstart 🎓</p>
            <p className="text-base text-textSecondary">
              Это результат моего опыта и страсти к футболу. Я верю в силу
              индивидуального подхода и поэтому создал клуб, где каждый игрок
              получает максимум внимания к деталям и развитию характера.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-primary/50 p-4 flex flex-col gap-2 rounded-lg shadow-card-sm-light"
          >
            <p className="text-lg font-semibold">Личное участие 📝</p>
            <p className="text-base text-textSecondary">
              Я лично вовлечен во все процессы, от организации до тренировок.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-primary/50 p-4 flex flex-col gap-2 rounded-lg shadow-card-sm-light mb-3"
          >
            <p className="text-lg font-semibold">Моя миссия 💫</p>
            <p className="text-base text-textSecondary">
              Помочь каждому футболисту раскрыть свой потенциал, и для этого я
              создал эту платформу, чтобы делиться своим опытом с футболистами с
              любой точки планеты!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </ContentWrapper>
  );
};

SchoolScreen.displayName = "SchoolScreen";

const WrappedSchoolScreen = withAuth(SchoolScreen) as React.FC;
WrappedSchoolScreen.displayName = "WrappedSchoolScreen";

export default WrappedSchoolScreen;
