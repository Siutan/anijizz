import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ChapterList from "./chapterList";
import PopularAnime from "../../home/popular-anime";

export default function ChapterView() {

    const { id }: any = useParams();

    const [items, setItems] = useState();

    useEffect(() => {
        fetch("https://consumet-api.herokuapp.com/manga/mangadex/info/" + id)
            .then(res => res.json())
            .then(data => setItems(data))
    }, []);


    return (
        <section className="dark:text-white">
            {items && <ChapterList data={items}/>}
            <PopularAnime/>
        </section>
    )
}