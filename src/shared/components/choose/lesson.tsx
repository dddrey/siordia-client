import { motion, AnimatePresence } from "framer-motion";
import ItemsList from "../items/items-list";
import { useNavigate } from "react-router-dom";
import { useTopics } from "../../hooks/use-topics";

const LessonChoose = () => {
  const { data: topics, isLoading, error } = useTopics({});
  const navigate = useNavigate();

  const onClick = (id: string) => {
    console.log("click", id);
    navigate(`/admin/lesson/create?topicId=${id}`);
  };

  if (!topics) return null;

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <ItemsList
            items={topics}
            onClick={onClick}
            isError={!!error}
            isLoading={isLoading}
            href="/admin/lesson/create"
            title="Выберите Тему"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LessonChoose;
