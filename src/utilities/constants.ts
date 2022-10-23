

export const paths = {
  "home": "/",
  "community": "/community",
  "studios": "/studios",
  "studioId": "/studios/:id",
  "manga": "/manga",
  "mangaId": "/manga/:id",
  "mangaIdChapter": "/read/:id/",
  "mangaIdChapterId": "/read/:id/:chapter",
  "anime": "/anime",
  "animeId": "/anime/:id",
  "search": "/search",
  "searchId" : "/search/:id",
  "movies": "/movies",
  "recent": "/recent",
  "downloaded": "/downloaded",
}


export const breakpoints = {
 
  base: 0,
  sm: 576,
  md: 960,
  lg: 1360
 
};

export const breakpointKeys = Object.keys(breakpoints);