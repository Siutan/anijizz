//@ts-nocheck
import { UseQueryResult} from "react-query";
import { Studio } from "../../../types/api";
import {HiStar} from "react-icons/hi";
import ReactTooltip from "react-tooltip";
import {Link} from "react-router-dom";

type QueryResult = UseQueryResult<Studio, any>;

type Props = {
    data: QueryResult["data"],
};

export default function MediaList(props: Props) {

    const data = props.data!;
    console.log(data);

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

    return (
        <section className="dark:text-white">
            <div className="grid grid-cols-5 space-x-4">
                {data?.media.edges?.map((shows, index: any) => (
                    <Link to={"/anime/" + shows.node.id}>
                        <div>
                            <div
                                className="relative h-96 overflow-hidden object-fill"
                            >
                                <div
                                    className="absolute flex flex-row place-self-start items-center justify-center space-x-1 px-4 py-1 text-sm medium rounded-full bg-gray-300 dark:bg-gray-900 m-1">
                                    <p className=""> {shows.node.averageScore / 10} </p>
                                    <HiStar/>
                                </div>
                                <ReactTooltip
                                    className="dark:bg-gray-800 tooltip"
                                    id={index.toString()}
                                    aria-haspopup="true"
                                    place="right" type="dark"
                                    effect="solid">

                                    <div className="flex flex-col space-x-1 space-y-5">
                                        <p className="text-lg">{shows.node.title.romaji}</p>
                                        <div className="flex flex-row space-x-2">
                                            <p className="text-lg">{showFormat(shows.node.format)}</p>
                                            <span className="text-xl">•</span>
                                            <p className="text-lg">{shows.node.episodes} Episodes</p>
                                        </div>
                                        <div className="flex flex-row space-x-2">
                                            <div className=" py-1 px-4 rounded-full"
                                                 style={{backgroundColor: shows.node.coverImage.color}}>
                                                <p className="text-sm">{shows.node.genres[0]}</p>
                                            </div>
                                            <div className=" py-1 px-4 rounded-full"
                                                 style={{backgroundColor: shows.node.coverImage.color}}>
                                                <p className="text-sm">{shows.node.genres[1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ReactTooltip>
                                <img
                                    data-iscapture="true"
                                    data-tip
                                    data-for={index.toString()}
                                    src={shows.node.coverImage.extraLarge}
                                    className="flex object-fill h-full w-full min-w-fit min-h-fit"
                                    alt={shows.node.title.romaji}
                                />

                            </div>
                            <div
                                className=" flex flex-row items-center space-x-1 py-1 text-sm medium rounded-t-lg dark:bg-gray-900">
                                <p className="truncate"> {shows.node.title.romaji} </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )

}