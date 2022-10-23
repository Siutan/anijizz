import { API } from "aws-amplify";
import { QueryFunctionContext } from "react-query";
import { PageResult } from "../../types";

export const getPopularAiring = async (context: QueryFunctionContext<[string, { page: number, perPage: number }]>) => {

    const [, { page, perPage }] = context.queryKey;
    const result = await (
        API.graphql({
            query: GRAPHQL_QUERY,
            variables: {
                page, perPage
            }
        }) as Promise<PageResult> // we should infer the type according to https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js/#simple-query
    );
    return result.data.Page;

}

const GRAPHQL_QUERY = `
  query($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: POPULARITY_DESC, status: RELEASING, episodes_greater: 1 type: ANIME) {
      popularity
      id
      episodes
      title {
        userPreferred
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      description(asHtml: false)
      nextAiringEpisode {
        episode
        airingAt
      }
    }
  }
}
`;
