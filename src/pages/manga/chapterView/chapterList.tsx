
import {Link} from "react-router-dom";

type Props = {
    data: any,
};

// get chapter index
let chapterIndex: number[] = [];
function getChapterIndex(data: any) {
    for (let i = 0; i < data.length; i++) {
        chapterIndex.push(data.length - i);
    }
}

export default function ChapterList(props: Props) {

    let data = props.data;
    console.log("chapterList", data);
    getChapterIndex(data.chapters);

    if (data.chapters.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center dark:text-white">
                <h1 className="text-2xl font-bold p-5">{data?.title}</h1>
                <h1 className="text-2xl font-bold">No Chapters found</h1>
            </div>
        )
    }

    return (
        <section className="dark:text-white">
            <h1 className="text-2xl font-bold p-5">{data?.title} Chapters</h1>
            <div className="grid grid-cols-3 gap-4 ">
                {data?.chapters?.map((item: any , index: any) => (
                    <Link to={"/read/" + data.id + "/" + item.id}>
                        <div
                            className="relative block p-8 border border-gray-100 shadow-xl rounded-xl"
                        >
                            <div className="">
                                <h5 className="mt-4 text-xl font-bold">{item.title}</h5>
                                <div className="flex flex-row space-x-2">
                                    <p className="text-sm">{chapterIndex[index]}</p>
                                    <span className="text-sm">•</span>
                                    <p className="text-sm">{item.pages} Chapters</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )

};