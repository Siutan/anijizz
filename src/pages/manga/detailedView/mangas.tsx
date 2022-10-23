//@ts-nocheck

import {Link} from "react-router-dom";

type Props = {
    data: any,
};

// check if description is longer than 250 characters and if so, cut it off after a sentence
function getDescription(data: any) {
    if (data?.description?.length > 250) {
        return data?.description?.substring(0, 250) + "...";
    } else {
        return data?.description;
    }
}

export default function MangasView(props: Props) {

    // convert promise to json
    const data = props.data;
    console.log("mangaView", data);

    return (
        <section className="dark:text-white w-[100%]">
            <div className="grid grid-cols-3 gap-4 ">
                {data?.map((item: any) => (
                    <Link to={"/read/" + item.id}>
                        <div
                            className="relative block p-8 border border-gray-100 shadow-xl rounded-xl"
                        >
                            <div className="">
                                <h5 className="mt-4 text-xl font-bold">{item.title}</h5>
                                <p className="mt-2 text-sm">
                                    {getDescription(item)}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
};