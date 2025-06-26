import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home.tsx';
import Profile from '../pages/profile';
import Posts from '../pages/post.tsx';
import CreatePost from '../pages/createPost.tsx';
import Feed from '../pages/Feed.tsx';

const AppRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
    );
};
export default AppRouter;
