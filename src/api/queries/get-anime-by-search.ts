import { API } from "aws-amplify";
import { QueryFunctionContext } from "react-query";
import { PageResult } from "../../types";

export const getAnimeSearch = async (context: QueryFunctionContext<[{ page: number, perPage: number, search: string }]>) => {

    const [{ page, perPage, search }] = context.queryKey;
    const result = await (
        API.graphql({
            query: GRAPHQL_QUERY,
            variables: {
                page, perPage, search
            }
        }) as Promise<PageResult> // we should infer the type according to https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js/#simple-query
    );
    return result.data.Page;

}

const GRAPHQL_QUERY = `
  query($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
      media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        studios {
        edges {
          id
          isMain
          node {
            name
          }
        }
      }
        status
        format
        description(asHtml:false)
        averageScore
        coverImage {
          extraLarge
          color
        }
        genres
        nextAiringEpisode {
        episode
        airingAt
      }
        episodes
        characters(sort: RELEVANCE, perPage: 5) {
          nodes {
            id
            image {
              medium
            }
          }
        }
      }
    }
  }
`;
