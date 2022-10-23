// @ts-nocheck
import { HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { useQuery } from "react-query";
import { getTrending } from "../../api/queries";
import PopularAnime from "../home/popular-anime";

export default function AnimeCard() {

    const {
        isLoading,
        isError,
        data
    } = useQuery(["trending", {page: 1, perPage: 50}], getTrending, {
        enabled: true,
    });

    if (isError) {
        return (
            <div className="text-white">
                <h1>Error...</h1>
                <p>{isError}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-white">
                <div>
                    <h1>Loading Data...</h1>
                </div>
            </div>
        );
    }

    function showFormat(format) {
        switch (format) {
            case "TV":
                return "TV Show";
            case "TV_SHORT":
                return "TV Short";
            case "MOVIE":
                return "Movie";
            case "SPECIAL":
                return "Special";
            case "OVA":
                return "OVA";
            case "ONA":
                return "ONA";
            case "MUSIC":
                return "Music";
            case "MANGA":
                return "Manga";
            case "NOVEL":
                return "Novel";
            case "ONE_SHOT":
                return "One Shot";
            default:
                return "Unknown";
        }
    }

    function getStudio(studios) {
        for (let i = 0; i < studios.edges.length; i++) {
            if (studios.edges[i].isMain) {
                return studios.edges[i].node.name;
            }
        }
        return "Unknown";
    }


    return (
        <section className="dark:text-white">
            <div className="grid grid-cols-5 gap-4 3xl:grid-cols-10">
                {data.media.map((shows, index) => (
                    <Link to={"/anime/" + shows.id}>
                        <div>
                            <div
                                className="relative h-96 overflow-hidden object-fill"
                            >

                                <div
                                    className="absolute flex flex-row place-self-start items-center justify-center space-x-1 px-4 py-1 text-sm medium rounded-full bg-gray-300 dark:bg-gray-900 m-1">
                                    <p className=""> {shows.averageScore / 10} </p>
                                    <HiStar/>
                                </div>
                                <ReactTooltip
                                    className="dark:bg-gray-800 tooltip"
                                    id={index.toString()}
                                    aria-haspopup="true"
                                    place="right" type="dark"
                                    effect="solid">

                                    <div className="flex flex-col space-x-1 space-y-5">
                                        <p className="text-lg">{shows.title.romaji}</p>
                                        <p className="text-lg" style={{color: shows.coverImage.color}}>{getStudio(shows.studios)}</p>
                                        <div className="flex flex-row space-x-2">
                                            <p className="text-lg">{showFormat(shows.format)}</p>
                                            <span className="text-xl">•</span>
                                            <p className="text-lg">{shows.episodes} Episodes</p>
                                        </div>
                                        <div className="flex flex-row space-x-2">
                                            <div className=" py-1 px-4 rounded-full"
                                                 style={{backgroundColor: shows.coverImage.color}}>
                                                <p className="text-sm">{shows.genres[0]}</p>
                                            </div>
                                            <div className=" py-1 px-4 rounded-full"
                                                 style={{backgroundColor: shows.coverImage.color}}>
                                                <p className="text-sm">{shows.genres[1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ReactTooltip>
                                <img
                                    data-iscapture="true"
                                    data-tip
                                    data-for={index.toString()}
                                    src={shows.coverImage.extraLarge}
                                    className="flex object-fill h-full w-full min-w-fit min-h-fit"
                                    alt={shows.title.romaji}
                                />

                            </div>
                            <div
                                className=" flex flex-row items-center space-x-1 py-1 text-sm medium rounded-t-lg dark:bg-gray-900">
                                <p className="truncate"> {shows.title.romaji} </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )

};