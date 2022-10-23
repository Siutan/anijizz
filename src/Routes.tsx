import { Route, Routes } from "react-router-dom";
import { paths } from "./utilities/constants";

//PAGES
import Home from "./pages/home";
import Anime from "./pages/anime";
import SearchView from "./pages/search";
import Studios from "./pages/studios";
import AnimeView from "./pages/anime/detailedView/index";
import StudioView from "./pages/studios/detailedView";
import Manga from "./pages/manga";
import MangaView from "./pages/manga/detailedView";
import ChapterView from "./pages/manga/chapterView";
import PageView from "./pages/manga/pageView";
// import AddAlarm from "./pages/Alarm/Add"


export default function () {
  return (
    <main className="flex flex-col overflow-x-hidden overflow-y-scroll space-y-8 py-6 md:pt-0 dark:bg-black sm:dark:bg-gray-900">
      <Routes>
        <Route path={paths.home} element={<Home />} />
        {/* STUDIO */}
        <Route path={paths.studios} element={<Studios />} />
        <Route path={paths.studioId} element={<StudioView />} />
        {/* MANGA */}
        <Route path={paths.manga} element={<Manga />} />
        <Route path={paths.mangaId} element={<MangaView />} />
        {/* READER */}
        <Route path={paths.mangaIdChapter} element={<ChapterView />} />
        <Route path={paths.mangaIdChapterId} element={<PageView />} />
        {/* ANIME */}
        <Route path={paths.anime} element={<Anime />} />
        <Route path={paths.animeId} element={<AnimeView />} />
        {/* SEARCH */}
        <Route path={paths.searchId} element={<SearchView />} />
      </Routes>
    </main>
  )
}