"use client";

import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { motion } from "framer-motion";
import withAuth from "@/shared/components/hoc/auth";
import BackButtonWrapper from "@/shared/components/wrappers/backbutton-wrapper";

const AboutScreen = () => {
  return (
    <BackButtonWrapper>
      <ContentWrapper
        className="flex flex-col pt-safe-area pb-4 items-center justify-center"
        withFooter={false}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[90%]"
        >
          <h1 className="text-3xl ml-2 font-bold mb-4 text-textPrimary">
            Привет, футболист! 👋
          </h1>

          <div className="space-y-4 text-textPrimary">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-primary p-4 flex flex-col gap-2 rounded-lg shadow-card-sm-light"
            >
              <p className="text-lg font-semibold">
                Я, Дима Сиордия — тренер с лицензией УЕФА ⚽️
              </p>
              <p className="text-base">
                Моя страсть — помогать игрокам становиться лучше!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary p-4 flex flex-col gap-2 rounded-lg shadow-card-sm-light"
            >
              <p className="text-lg font-semibold">Я не просто тренер 🤔</p>
              <p className="text-base">
                я — твой гид на пути к совершенству. Мой опыт работы с разными
                специалистами позволил создать уникальный подход, который
                работает.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-primary p-4 flex flex-col gap-2 rounded-lg shadow-card-sm-light"
            >
              <p className="text-base font-semibold">Вместе мы прокачаем: 💯</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>- Контроль мяча</li>
                <li>- Тактическое мышление</li>
                <li>- Физическую мощь</li>
                <li>- Ментальную устойчивость</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-primary p-4 flex flex-col gap-2 rounded-lg shadow-card-sm-light"
            >
              <p className="font-semibold">Моя миссия: 💫</p>
              <p className="text-base">
                Помочь каждому, кто готов учиться и расти. Ценю индивидуальность
                и верю в твой потенциал! Начни свою трансформацию со мной!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </ContentWrapper>
    </BackButtonWrapper>
  );
};

AboutScreen.displayName = "AboutScreen";

const WrappedAboutScreen = withAuth(AboutScreen) as React.FC;
WrappedAboutScreen.displayName = "WrappedAboutScreen";

export default WrappedAboutScreen;
