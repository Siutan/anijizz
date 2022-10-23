import {UseQueryResult} from "react-query";
import {Media} from "../../../types/api";
import MangasView from "./mangas";
import {useEffect, useState} from "react";


//TODO: refactor this into index.tsx rather than having it in the body.tsx

type QueryResult = UseQueryResult<Media, any>;

type Props = {
    data: QueryResult["data"],
};

export default function ChapterView(props: Props) {

    const data = props.data;

    const [items, setItems] = useState();

    useEffect(() => {
        fetch("https://consumet-api.herokuapp.com/manga/mangadex/" + data?.title?.english ?? data?.title?.romaji)
            .then(res => res.json())
            .then(data => setItems(data.results))
    }, []);

    // @ts-ignore
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center dark:text-white">
                <h1 className="text-2xl font-bold">No episodes found</h1>
            </div>
        )
    }

    return (
        <section className="dark:text-white">
                {items && <MangasView data={items}/>}
        </section>
    )

}