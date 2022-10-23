//@ts-nocheck
import {useState} from "react";
import {createPortal} from "react-dom";
import ReaderOptions from "./sideBar";

type Props = {
    data: any,
};

export default function Reader(props: Props) {

    const sideBar = document.getElementById("side-panel");

    const navBar = document.getElementById("navigation");
    const topBar = document.getElementById("extras");

    const options = [
        {value: "0", text: 'Manga (traditional)'},
        {value: "1", text: 'Webtoon'},
    ];

    // when the next button is clicked, the page number increments by 1 and a new image is loaded


    const [selected, setSelected] = useState(options[0].value);

    const handleChange = (event: { target: { value: any; }; }) => {
        setSelected(event.target.value);
    };

    const [pageNumber, setPageNumber] = useState(0);

    function nextPage() {
        setPageNumber(pageNumber + 1);
    }

    function prevPage() {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    }

    const handleKeyDown = event => {
        // if the right arrow key is pressed, the page number increments by 1 and a new image is loaded
        if (event.keyCode === 39) {
            nextPage();
        }
        // if the left arrow key is pressed, the page number decrements by 1 and a new image is loaded
        if (event.keyCode === 37) {
            prevPage();
        }
    };

    const [checked, setChecked] = useState(false);

    const Checkbox = ({label, value, onChange}) => {
        return (
            <div className="flex items-center mb-4">
                <input id="default-checkbox" type="checkbox" value="" checked={value} onChange={onChange}
                       className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {label}
                </label>
            </div>
        );
    };

    const handleCheck = () => {
        setChecked(!checked);

        if (checked) {
            navBar?.classList.remove("sm:dark:bg-gray-900");
            navBar?.classList.add("sm:dark:bg-black");
            //topBar?.classList.remove("h-1");
        } else {
            navBar?.classList.remove("sm:dark:bg-black");
            navBar?.classList.add("sm:dark:bg-gray-900");
           // topBar?.classList.add("h-1");
        }
    };

    // listen for key presses
    document.addEventListener("keydown", handleKeyDown, false);



    let data = props.data;
    console.log("imgList", data);


    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center dark:text-white">
                <h1 className="text-2xl font-bold p-5">{data?.title}</h1>
                <h1 className="text-2xl font-bold">No Pages found</h1>
            </div>
        )
    }

    return (
        <section className="dark:text-white">
            {selected === "0" ? (
                // Manga (traditional) View
                <div className="flex flex-col items-center justify-center ">
                    <div className="flex items-center justify-center">
                        <img className="justify-center h-[950px]" draggable="false" id="imgView" src={data[pageNumber].img} alt={"page"}/>
                    </div>
                    <div>
                        <img className="hidden" draggable="false" id="hiddenImgView" src={data[pageNumber + 1].img} alt={"page"}/>
                    </div>

                </div>
            ) : (
                // webtoon View
                <div className="flex flex-col items-center justify-center p-2">
                    {data.map((item: any) => (
                        <img className="bg-cover w-full" draggable="false" id="imgView" src={item.img} alt={"page"}/>
                    ))}
                </div>
            )}
            {sideBar ? createPortal(
                <div className="dark:text-white">
                    <p className="px-1 text-lg font-semibold">Reader Style</p>
                    <select value={selected} onChange={handleChange}
                            className="dark:text-white dark:bg-gray-900 outline-none">
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    <p className="text-sm px-1">Use left and right arrow keys to navigate between pages</p>
                </div>, sideBar) : null}
            {sideBar ? createPortal(
                <div className="text-white">
                    <div>
                        <Checkbox
                            label="Dark Mode"
                            value={checked}
                            onChange={handleCheck}
                        />
                    </div>
                </div>, sideBar) : null}
            {sideBar ? createPortal(
                <div className="dark:text-white flex flex-col gap-4 items-center justify-center">
                    <div className="flex flex-row space-x-2">
                        <button
                            onClick={prevPage}
                            className="dark:bg-gray-900 dark:text-gray-300 hover:text-white text-black font-bold px-4 rounded inline-flex items-center">

                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M7.172 10l5.657 5.657-1.414 1.414L3.343 10l7.071-7.071 1.414 1.414L7.172 10z"/>
                            </svg>
                            <span>Back</span>
                        </button>
                        <button
                            onClick={nextPage}
                            className="dark:bg-gray-900 dark:text-gray-300  hover:text-white text-black font-bold px-4 rounded inline-flex items-center">
                            <span>Next</span>
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M12.828 10l-5.657-5.657 1.414-1.414L16.657 10l-7.071 7.071-1.414-1.414L12.828 10z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="px-4">
                        <p>Page {data[pageNumber].page} of {data.length}</p>
                    </div>
                </div>, sideBar) : null}
        </section>
    )

};