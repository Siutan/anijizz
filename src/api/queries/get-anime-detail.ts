import {API} from "aws-amplify";
import {QueryFunctionContext} from "react-query";
import {MediaResult} from "../../types";

export const getAnime = async (context: QueryFunctionContext<[{ id: Number }]>) => {

    const [{id}] = context.queryKey;
    const result = await (
        API.graphql({
            query: GRAPHQL_QUERY,
            variables: {
                id
            }
        }) as Promise<MediaResult> // we should infer the type according to https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js/#simple-query
    );
    return result.data.Media;

}

const GRAPHQL_QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    status
    averageScore
    startDate {
      year
      month
      day
    }
    duration
    streamingEpisodes {
      title
      thumbnail
      url
      site
    }
    studios {
      nodes{
        name
        id
      }
    }
    title {
      userPreferred
      romaji
      english
      native
    }
    episodes
    description
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    genres
    externalLinks {
      id
      url
      type
    }
  }
}

`;
