//@ts-nocheck
import {HiStar} from "react-icons/hi";
import {Link} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import {useQuery} from "react-query";
import {getMangas} from "../../api/queries";
import {MediaSort} from "../../types/api.d.ts";
import {useState} from "react";

export default function MangaCard() {

    const options = [
        {value: MediaSort.PopularityDesc, text: 'Popularity Descending'},
        {value: MediaSort.Popularity, text: 'Popularity Ascending'},
        {value: MediaSort.TrendingDesc, text: 'Trending'},
        {value: MediaSort.ScoreDesc, text: 'Top Rated'},
        {value: MediaSort.StartDateDesc, text: 'Newest'},
    ];

    const [selected, setSelected] = useState(options[0].value);

    const handleChange = (event: { target: { value: any; }; }) => {
        console.log(event.target.value);
        setSelected(event.target.value);

    };

    // if manga is finished, get the start year and end year
    function getYear(data: any) {
        if (data?.status === "FINISHED") {
            return `${data?.startDate?.year} - ${data?.endDate?.year}`;
        } else {
            return "Releasing since " + data?.startDate?.year;
        }
    }

    // get chapters
    function getChapters(data: any) {
        if (data?.chapters) {
            return data?.chapters;
        } else {
            return "Unknown";
        }
    }

    const {
        isLoading,
        isError,
        data
    } = useQuery([{page: 1, perPage: 50, sort:selected}], getMangas, {
        enabled: true,
    });
    console.log(data)

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
            <div className="text-center">
                <div role="status">
                    <svg className="inline mt-10 mr-2 w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <section className="dark:text-white">
            <div className="grid grid-cols-5 gap-4 3xl:grid-cols-10">
                <div className="col-span-5 3xl:col-span-10">
                    <h1 className="text-2xl font-bold">Manga</h1>
                    <div>
                        <select value={selected} onChange={handleChange} className="dark:text-white bg-transparent outline-none" >
                            {options.map(option => (
                                <option className="dark:text-white dark:bg-gray-800" key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {data?.media?.map((manga, index) => (
                    <Link to={"/manga/" + manga?.id}>
                        <div>
                            <div
                                className="relative h-96 overflow-hidden object-fill"
                            >

                                <div
                                    className="absolute flex flex-row place-self-start items-center justify-center space-x-1 px-4 py-1 text-sm medium rounded-full bg-gray-300 dark:bg-gray-900 m-1">
                                    <p className=""> {manga?.averageScore! / 10} </p>
                                    <HiStar/>
                                </div>
                                <ReactTooltip
                                    className="dark:bg-gray-800 tooltip"
                                    id={index.toString()}
                                    aria-haspopup="true"
                                    place="right" type="dark"
                                    effect="solid">

                                    <div className="flex flex-col space-x-1 space-y-5">
                                        <p className="text-lg">{manga?.title?.userPreferred}</p>
                                        <div className="flex flex-row space-x-2">
                                            <p className="text-lg">{getYear(manga)}</p>
                                        </div>
                                        <div className="flex flex-row space-x-2">
                                            <p className="text-sm">{manga?.status}</p>
                                            <span className="text-sm">•</span>
                                            <p className="text-sm">{getChapters(manga)} Chapters</p>
                                        </div>
                                        <div className="flex flex-row space-x-2">
                                            <div className=" py-1 px-4 rounded-full"
                                                 style={{backgroundColor: manga?.coverImage?.color!}}>
                                                <p className="text-sm">{manga?.genres![0]}</p>
                                            </div>
                                            <div className=" py-1 px-4 rounded-full"
                                                 style={{backgroundColor: manga?.coverImage?.color!}}>
                                                <p className="text-sm">{manga?.genres![1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ReactTooltip>
                                <img
                                    data-iscapture="true"
                                    data-tip
                                    data-for={index.toString()}
                                    src={manga?.coverImage?.extraLarge!}
                                    className="flex object-fill h-full w-full min-w-fit min-h-fit"
                                    alt={manga?.title?.romaji!}
                                />

                            </div>
                            <div
                                className=" flex flex-row items-center space-x-1 py-1 text-sm medium rounded-t-lg dark:bg-gray-900">
                                <p className="truncate"> {manga?.title?.userPreferred} </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )

};