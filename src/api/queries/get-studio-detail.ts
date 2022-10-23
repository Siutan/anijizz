import {API} from "aws-amplify";
import {QueryFunctionContext} from "react-query";
import {StudioResult} from "../../types";

export const getStudio = async (context: QueryFunctionContext<[{ id: Number }]>) => {

    const [{id}] = context.queryKey;
    const result = await (
        API.graphql({
            query: GRAPHQL_QUERY,
            variables: {
                id
            }
        }) as Promise<StudioResult> // we should infer the type according to https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js/#simple-query
    );
    return result.data.Studio;

}

const GRAPHQL_QUERY = `
query ($id: Int) {
    Studio(id: $id) {
      id
      name
      favourites
      media(sort: POPULARITY_DESC) {
        edges {
          node {
            id
            title {
              romaji
              english
              native
            }
            status
            season
            chapters
            episodes
            format
            description
            genres
            isAdult
            averageScore
            coverImage {
              extraLarge
              large
              medium
              color
            }
            trailer {
              id
              thumbnail
              site
            }
          }
        }
      }
    }
  }
`;
