import { motion } from "framer-motion";
import SubscriptionCard from "./subscription-card";
import { ContentType } from "../../types/interfaces";

const SubscriptionsList = () => {
  return (
    <div className="bg-primary w-full p-2 rounded-[12px] text-textPrimary">
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SubscriptionCard
            title="Подписка на тренера"
            icon="🧑‍🏫"
            price={5000}
            duration="30 дней"
            type={ContentType.COACH}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SubscriptionCard
            title="Подписка на игрока"
            icon="🥇"
            price={5000}
            duration="30 дней"
            type={ContentType.PLAYER}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SubscriptionCard
            title="Подписка на родителя"
            icon="👩🏻‍🍼"
            price={5000}
            duration="30 дней"
            type={ContentType.PARENT}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionsList;
