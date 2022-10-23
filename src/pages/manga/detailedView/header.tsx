//@ts-nocheck
import {useQuery, UseQueryResult} from "react-query";
import { Media } from "../../../types/api";
import {useNavigate} from "react-router-dom";
import {paths} from "../../../utilities/constants";

type QueryResult = UseQueryResult<Media, any>;

type Props = {
    data: QueryResult["data"],
};

export default function MangaHeader(props: Props) {

    const data = props.data!;
    const navigate = useNavigate();

    // get chapters
    function getChapters(data: any) {
        if (data?.chapters) {
            return data?.chapters;
        } else {
            return "Unknown";
        }
    }


    function sanitizeDescription(description: string) {
        return description.replace(/<[^>]*>/g, "");
    }

    return (
        <section className="dark:text-white">
            <div className="info-box relative m-auto h-auto w-full p-6">
                <div
                    className="info-cover"
                    style={{
                        backgroundImage: `url(${data?.bannerImage})`,
                    }}
                ></div>
                <div className="info-box__item flex items-center">
                    <div className="info-box__img mr-10 w-64 flex-shrink-0 overflow-hidden">
                        <img className="block h-full w-full rounded-lg object-cover opacity-100"
                             src={data?.coverImage?.large!} alt="cover"/>
                    </div>
                    <div className="info-box__content relative mt-2 overflow-y-auto overflow-x-hidden pr-6 text-xs">
                        <div className="flex flex-row space-x-5">
                            <h2 className="title-description m-0 p-0 text-2xl font-normal uppercase"
                                data-jtitle="" id="">{data?.title?.userPreferred}</h2>
                            <div
                                className="flex items-center rounded-full px-4 my-1"
                                style={{backgroundColor: data?.coverImage?.color!}}>
                                <p className="font-semibold uppercase text-sm">{data?.status}</p>
                            </div>
                        </div>
                        <div className="alias py-1 italic">{data?.title?.native}</div>
                        <p className="shorting pb-2 text-sm" itemProp="description">{sanitizeDescription(data?.description!)}</p>
                        <div className="meta flex flex-row space-x-10">
                            <div className="col1 flex flex-col space-y-1 pr-10">
                                <div className="text-sm">
                                    <div id="scr" className="flex flex-row space-x-2">
                                        <p className="font-semibold">Type: </p>
                                        <p>Manga</p>
                                    </div>
                                    <div id="scr" className="flex flex-row space-x-2">
                                        <p className="font-semibold">Chapters: </p>
                                        <p>{getChapters(data)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col2 flex flex-col space-y-1">
                                <div className="text-sm">
                                    <div id="scr" className="flex flex-row space-x-2">
                                        <p className="font-semibold">Rating: </p>
                                        <p>{data?.averageScore! / 10}/10</p>
                                    </div>
                                    <div id="scr" className="flex flex-row space-x-2">
                                        <p className="font-semibold">Release Date: </p>
                                        <p>{data?.startDate?.day + "/" + data?.startDate?.month + "/" + data?.startDate?.year }</p>
                                    </div>
                                </div>
                                <div id="genre" className="flex flex-row space-x-2">
                                    {data?.genres?.map((genre, index) => (
                                        <div>
                                            <div className="flex rounded-full py-1 px-4 text-white"
                                                 style={
                                                     {
                                                         backgroundColor: data.coverImage?.color!
                                                     }
                                                 }>
                                                <p className="text-sm">{genre}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}