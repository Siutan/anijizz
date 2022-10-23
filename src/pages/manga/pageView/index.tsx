import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Reader from "./reader";

export default function PageView() {

    const { id, chapter }: any = useParams();
    console.log(id, chapter);

    const [items, setItems] = useState();

    useEffect(() => {
        fetch("https://consumet-api.herokuapp.com/manga/mangadex/read/" + chapter)
            .then(res => res.json())
            .then(data => setItems(data))
    }, []);


    return (
        <section className="dark:text-white">
            {items && <Reader data={items}/>}
        </section>
    )
}