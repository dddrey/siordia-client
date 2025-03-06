import { Route, Routes } from "react-router-dom";

import Main from "@/screens/client/main";
import About from "@/screens/client/about";

import Review from "@/screens/client/review";
import School from "@/screens/client/school";
import Folders from "@/screens/client/folders";
import Folder from "@/screens/client/folder";
import Lesson from "@/screens/client/lesson";
import Topic from "@/screens/client/topic";

import FoldersAdmin from "@/screens/admin/folders/folders";
import FolderUpdate from "@/screens/admin/folders/folder-update";
import LessonsAdmin from "@/screens/admin/lessons/lessons";
import Statistics from "@/screens/admin/statistics";
import TopicsAdmin from "@/screens/admin/topics/topics";
import TopicUpdate from "@/screens/admin/topics/topic-update";
import FolderCreate from "@/screens/admin/folders/folder-create";
import LessonUpdate from "@/screens/admin/lessons/lesson-update";
import TopicCreate from "@/screens/admin/topics/topic-create";
import LessonCreate from "@/screens/admin/lessons/lesson-create";
import ReviewAdmin from "@/screens/admin/reviews";

import NotFound from "@/screens/not-found";
import Subscriptions from "@/screens/client/subscriptions";

const Router = () => {
  return (
    <Routes>
      {/* клиентская часть */}

      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/reviews" element={<Review />} />
      <Route path="/school" element={<School />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/folders" element={<Folders />} />
      <Route path="/folders/:id" element={<Folder />} />
      <Route path="/topics/:id" element={<Topic />} />
      <Route path="/lesson/:id" element={<Lesson />} />

      {/* клиентская часть */}

      {/* админка */}

      <Route path="/admin/folders" element={<FoldersAdmin />} />
      <Route path="/admin/folders/:id" element={<FolderUpdate />} />
      <Route path="/admin/folders/create" element={<FolderCreate />} />
      <Route path="/admin/topics" element={<TopicsAdmin />} />
      <Route path="/admin/topics/:id" element={<TopicUpdate />} />
      <Route path="/admin/topics/create" element={<TopicCreate />} />
      <Route path="/admin/lessons" element={<LessonsAdmin />} />
      <Route path="/admin/lessons/:id" element={<LessonUpdate />} />
      <Route path="/admin/lessons/create" element={<LessonCreate />} />
      <Route path="/admin/statistics" element={<Statistics />} />
      <Route path="/admin/reviews" element={<ReviewAdmin />} />

      {/* админка */}

      {/* ошибки */}

      <Route path="*" element={<NotFound />} />

      {/* ошибки */}
    </Routes>
  );
};

export default Router;
