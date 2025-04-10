import { motion } from "framer-motion";
import { ContentType } from "../../types/interfaces";
import { useSubscriptionModal } from "../../store/use-subscription-modal";
import { PlayerIcon } from "../ui/icons/player";
import { PitchIcon } from "../ui/icons/pitch";
import { FamilyIcon } from "../ui/icons/family";
import SubscriptionCard from "./subscription-card";

import SubscriptionModal from "../subscription-modal";

const SubscriptionsList = () => {
  const { isOpen, selectedType, openModal, closeModal } =
    useSubscriptionModal();

  return (
    <>
      <div className="w-full p-2 rounded-[12px] text-textPrimary">
        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SubscriptionCard
              title="Для футболистов"
              icon={
                <PlayerIcon
                  color="#142947"
                  strokeColor="#142947"
                  className="w-[30px] h-[30px]"
                />
              }
              price={1200}
              duration="30 дней"
              type={ContentType.COACH}
              onOpenModal={openModal}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SubscriptionCard
              title="Для Тренеров"
              icon={
                <PitchIcon
                  color="#142947"
                  strokeColor="#142947"
                  className="w-[30px] h-[30px]"
                />
              }
              price={1200}
              duration="30 дней"
              type={ContentType.PLAYER}
              onOpenModal={openModal}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SubscriptionCard
              title="Для родителей"
              icon={
                <FamilyIcon
                  color="#142947"
                  strokeColor="#142947"
                  className="w-[30px] h-[30px]"
                />
              }
              price={1200}
              duration="30 дней"
              type={ContentType.PARENT}
              onOpenModal={openModal}
            />
          </motion.div>
        </div>
      </div>

      <SubscriptionModal
        isOpen={isOpen}
        onClose={closeModal}
        type={selectedType}
      />
    </>
  );
};

export default SubscriptionsList;
