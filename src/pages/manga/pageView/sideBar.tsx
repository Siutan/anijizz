import { createPortal } from "react-dom";
import {useSidePanel} from "../../../hooks/use-side-panel";
import useBreakpointValue from "../../../hooks/media/use-breakpoint-value";


export default function ReaderOptions() {

    useSidePanel(); // will cause a re-render when the side-panel finally renders.

    const container = document.getElementById("side-panel");

    return useBreakpointValue({
        // render popular anime in the side-panel on larger screens
        md: container ? createPortal(<div>not pog</div>, container) : null
    })!

}