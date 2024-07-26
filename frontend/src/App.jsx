import Navbar from "./components/Navbar";
import StorySection from "./components/StorySection";
import AuthForm from "./components/AuthForm";
import LogoSection from "./components/LogoSection";
import CreatePost from "./components/CreatePost";
import SearchUser from "./components/SearchUser";
import ErrorBox from "./components/MessageBox";
import Comments from "./components/Comments";
import { useEffect } from "react";
import PostsSection from "./components/PostsSection";
import UserProfile from "./components/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "./Redux/actions/authActions";
import Cookie from "js-cookie";

function App() {
  return <AppContent />;
}

function AppContent() {
  const dispatch = useDispatch();
  const currPage = useSelector((state) => state.page.currPage);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const showComments = useSelector((state) => state.page.showComments);

  useEffect(() => {
    const token = Cookie.get("access_token");
    dispatch(setIsLoggedIn(!!token));
  }, [dispatch]);

  const renderPage = () => {
    if (isLoggedIn) {
      switch (currPage) {
        case "home":
          return (
            <>
              <StorySection />
              <PostsSection />
            </>
          );
        case "profile":
          return (
            <>
              <UserProfile />
            </>
          );
        case "createPost":
          return (
            <>
              <LogoSection />
              <CreatePost />
            </>
          );

        case "searchUser":
          return <SearchUser />;
        default:
          return <div>Page not found</div>;
      }
    } else {
      return (
        <>
          <LogoSection />
          <AuthForm />
        </>
      );
    }
  };

  return (
    <div className="relative max-w-screen-sm min-h-screen h-screen max-h-screen  mx-auto  bg-gray-800 overflow-hidden text-white font-patrick">
      <ErrorBox />
      {renderPage()}
      {showComments && <Comments />}
      {isLoggedIn && <Navbar />}
    </div>
  );
}

export default App;
