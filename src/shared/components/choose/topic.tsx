import { motion, AnimatePresence } from "framer-motion";
import { useFolders } from "../../hooks/use-folders";
import ItemsList from "../items/items-list";
import { useNavigate } from "react-router-dom";

const TopicChoose = () => {
  const { data: folders, isLoading, error } = useFolders({});
  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/admin/topic/create?folderId=${id}`);
  };

  if (!folders) return null;

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
            items={folders}
            onClick={onClick}
            isError={!!error}
            isLoading={isLoading}
            href=""
            title="Выберите папку"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TopicChoose;
