import QueryProvider from "./providers/query/query-provider";

import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TelegramWrapper } from "@/shared/components/wrappers/telegram-wrapper";

import Main from "@/screens/client/main";
import About from "@/screens/client/about";
import NotFound from "@/screens/not-found";
import Subscriptions from "@/screens/client/subscriptions";
import FolderUpdate from "@/screens/admin/folders/folder-update";
import FolderCreate from "@/screens/admin/folders/folder-create";
import Review from "@/screens/client/review";
import School from "@/screens/client/school";
import Folders from "@/screens/client/folders";
import Folder from "@/screens/client/folder";
import Topic from "@/screens/client/topic";
import Lesson from "@/screens/client/lesson";
import TopicUpdate from "@/screens/admin/topics/topic-update";
import TopicCreate from "@/screens/admin/topics/topic-create";
import LessonUpdate from "@/screens/admin/lessons/lesson-update";
import LessonCreate from "@/screens/admin/lessons/lesson-create";
import Statistics from "@/screens/admin/statistics";
import ReviewAdmin from "@/screens/admin/reviews";
import FoldersAdmin from "@/screens/admin/folders/folders";
import TopicsAdmin from "@/screens/admin/topics/topics";
import LessonsAdmin from "@/screens/admin/lessons/lessons";
import ErrorAuthScreen from "@/screens/error-auth";

function App() {
  return (
    <QueryProvider>
      <TelegramWrapper>
        <Routes>
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
          <Route path="/error-auth" element={<ErrorAuthScreen />} />

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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TelegramWrapper>
      <Toaster position="top-center" containerStyle={{ marginTop: "80px" }} />
    </QueryProvider>
  );
}

export default App;
