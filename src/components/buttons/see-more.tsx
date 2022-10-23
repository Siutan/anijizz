import {paths} from "../../utilities/constants";

import { useNavigate } from "react-router-dom"

export default function SeeMoreButton() {

  const navigate = useNavigate();

  return (
    <div
      className={`
        flex
        items-center
        justify-center
        w-[200px]
        md:w-full
        min-w-[200px]
        h-[200px]
        md:h-auto
        box-border
      `}
    >
      <button
        className={`
        bg-gray-100
        dark:bg-gray-800
        hover:bg-gray-200
        dark:hover:bg-gray-700
        text-gray-500
        hover:text-gray-700
        dark:hover:text-gray-100
          w-40
          md:w-full
          h-40
          md:h-10
          rounded-full
          text-sm
          font-medium
          hover:shadow-sm
          transition-all
          duration-200
        `}
      >See more </button>
    </div>
  )
}