import {UseQueryResult} from "react-query";
import {Media} from "../../../types/api";

type QueryResult = UseQueryResult<Media, any>;

type Props = {
    data: QueryResult["data"],
};

export default function EpisodeView(props: Props) {

    const data = props.data?.streamingEpisodes!;
    console.log(data);


    const episodeNumber = (episode: string) => { return episode.split(" ")[1];}
    const episodeTitle = (episode: string) => { return episode.split('-').pop();}

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center dark:text-white">
                <h1 className="text-2xl font-bold">No episodes found</h1>
            </div>
        )
    }

    return (
        <section className="dark:text-white">
            <div className="grid grid-cols-3 gap-4">
                {data?.map((episode) => (
                    <div>
                        <div
                            className="cursor-pointer"
                            onClick={() => (
                            window.open(episode?.url!, "_blank")
                        )}>
                            <img
                                src={episode?.thumbnail!}
                                alt=" random imgee" className="c w-full rounded-lg object-cover object-center shadow-md"/>

                            <div className="relative -mt-16 px-4">
                                <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
                                    <div className="flex items-baseline">
                                        <span
                                            className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold uppercase tracking-wide text-teal-800"> Episode {episodeNumber(episode?.title!)} </span>
                                    </div>
                                    <h4 className="truncate">{episodeTitle(episode?.title!)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                </section>
                )

            }