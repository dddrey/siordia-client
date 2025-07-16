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
import ErrorAuth from "@/screens/error-auth";
import BroadcastAdmin from "@/screens/admin/broadcast/broadcast-create";
import Auth from "@/screens/auth/auth";
import AdminProtectedRoutes from "../providers/auth/admin";
import ClientProtectedRoutes from "../providers/auth/client";
import BroadcastsAdmin from "@/screens/admin/broadcast/broadcasts";
import BroadcastUpdate from "@/screens/admin/broadcast/broadcast-update";
import { PathnameProvider } from "../providers/pathname/pathname";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PathnameProvider />}>
        <Route path="/" element={<ClientProtectedRoutes />}>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/school" element={<School />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="/folders/:id" element={<Folder />} />
          <Route path="/topics/:id" element={<Topic />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/review/:id" element={<Review />} />
        </Route>

        <Route path="/auth" element={<Auth />} />
        <Route path="/error-auth" element={<ErrorAuth />} />

        <Route path="/admin" element={<AdminProtectedRoutes />}>
          <Route path="/admin/folders" element={<FoldersAdmin />} />
          <Route path="/admin/folder/:id" element={<FolderUpdate />} />
          <Route path="/admin/folder/create" element={<FolderCreate />} />
          <Route path="/admin/topics" element={<TopicsAdmin />} />
          <Route path="/admin/topic/:id" element={<TopicUpdate />} />
          <Route path="/admin/topic/create" element={<TopicCreate />} />
          <Route path="/admin/lessons" element={<LessonsAdmin />} />
          <Route path="/admin/lesson/:id" element={<LessonUpdate />} />
          <Route path="/admin/lesson/create" element={<LessonCreate />} />
          <Route path="/admin/statistics" element={<Statistics />} />
          <Route path="/admin/reviews" element={<ReviewAdmin />} />
          <Route path="/admin/broadcasts" element={<BroadcastsAdmin />} />
          <Route path="/admin/broadcast/create" element={<BroadcastAdmin />} />
          <Route path="/admin/broadcast/:id" element={<BroadcastUpdate />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
