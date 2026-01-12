import { BrowserRouter as Router, Routes, Route } from "react-router";
import MoviePage from "./components/Movie Pages/MoviePage";
import Navbar from "./components/Movie Pages/Navbar";
// import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/Sidebar/AppSidebar";
import { useSelector } from "react-redux";
import SpecificMovieLists from "./components/Movie Pages/Specific Movie List/SpecificMovieLists";
import Home from "./components/Movie Pages/Home";
import TagsPage from "./components/Movie Pages/TagsPage";
import ReviewPage from "./components/Movie Pages/ReviewPage";
import Footer from "./components/Movie Pages/Footer";
import SearchedUsersMovies from "./components/Movie Pages/SearchedUsersMovies";

const App = () => {
  const { appSideBar } = useSelector((state) => state.componentData);
  
  return (
    <>
        <div className="flex h-auto overflow w-[98vw]">
          <div
            className={`absolute h-screen top-10 w-68 bg-white z-1 transition-all duration-1000 ${
              appSideBar ? "translate-x-0 " : "-translate-x-full"
            }`}
          >
            <AppSidebar />
          </div>
          <main className="absolute z-0 w-full overflow-hidden">
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/page/:id" element={<MoviePage />} />
                <Route path="/movie/lists" element={<SpecificMovieLists />} />
                <Route path="/movie/:name/lists/:id" element={<TagsPage />} />
                <Route path="/movie/review/lists/:id" element={<ReviewPage />} />
                <Route path="/movie/search/lists" element={<SearchedUsersMovies />} />
              </Routes>
              <Footer/>
            </Router>
          </main>
        </div>
    </>
  );
};

export default App;
