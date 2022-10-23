import { breakpoints } from "../utilities/constants";
import { Page } from "./api";
import { Media } from "./api";
import { Studio} from "./api";

export type Breakpoints = keyof typeof breakpoints;

export type PageResult= {
  data: {
    Page: Page
  }
};

export type MediaResult = {
  data: {
    Media: Media
  }
};

export type StudioResult = {
  data: {
    Studio: Studio
  }
};
