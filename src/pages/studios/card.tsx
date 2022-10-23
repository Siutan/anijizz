
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {getStudios} from "../../api/queries";

export default function StudioCard() {

    const {
        isLoading,
        isError,
        data
    } = useQuery([{page: 1, perPage: 100}], getStudios, {
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
            <div className="text-white">
                <div>
                    <h1>Loading Data...</h1>
                </div>
            </div>
        );
    }



    return (
        <section className="dark:text-white">
            <div className="grid grid-cols-5 gap-4 3xl:grid-cols-10">
                {data?.studios?.map((studio, index) => (
                    <Link to={"/studios/" + studio?.id}>
                        <div
                            className=" flex flex-row items-center space-x-1 py-1 p-5 text-sm medium rounded-full bg-gray-200 shadow-sm dark:bg-gray-800 hover:text-teal-400">
                            <p className="truncate font-semibold"> {studio?.name} </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )

};