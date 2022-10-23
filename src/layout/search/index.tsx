////@ts-nocheck
import {RiSearch2Line} from "react-icons/ri";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {paths} from "../../utilities/constants";

export default function Search() {

    const navigate = useNavigate();

    // function debounce(func: any, wait: number) {
    //     let timeout: any;
    //     return function executedFunction(...args: any) {
    //         const later = () => {
    //             clearTimeout(timeout);
    //             func(...args);
    //         };
    //         clearTimeout(timeout);
    //         timeout = setTimeout(later, wait);
    //     };
    // }

    function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const searchTerm = (document.getElementById("search-input") as HTMLInputElement).value;
        if (searchTerm.length > 0) {
            navigate(paths.search + "/" + searchTerm);
        }
    }

    return (
        <form
            id={"search"}
            onSubmit={(e) => handleSearch(e)}
            className={`
          relative
        pb-6
        md:pb-0
        sm:pt-6
        px-6
        md:border-l-2
        dark:md:border-gray-800
      `}
        >
            <label
                htmlFor="search-input"
                className={`
          group
          w-full
          h-11
          px-5
          space-x-4
          flex
          items-center
          justify-center
          bg-gray-50
          dark:bg-gray-700
          border-2
          border-gray-100
          dark:border-gray-900
          rounded-full
          focus-within:border-blue-600
          dark:focus-within:border-blue-600
          focus-within:shadow-sm
          transition-[border-color]
        `}
            >
                <RiSearch2Line
                    className={"text-gray-600 dark:group-focus-within:text-white dark:text-gray-300 w-[18px] h-[18px]"}/>
                <input
                    id="search-input"
                    type="search"
                    className={`
            w-full
            rounded-full
            h-full
            text-[14px]
            placeholder:text-gray-600
            dark:placeholder:text-gray-300
            dark:focus:placeholder:text-gray-100
            dark:text-white
            focus:outline-none
            bg-inherit
          `}
                    placeholder="search"
                />
            </label>
        </form>
    )

}