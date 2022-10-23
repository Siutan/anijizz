import {API} from "aws-amplify";
import {QueryFunctionContext} from "react-query";
import {MediaResult, PageResult} from "../../types";
import {MediaSort} from "../../types/api";

export const getMangas = async (context: QueryFunctionContext<[{ page: number, perPage: number, sort: MediaSort }]>) => {

    const [{page, perPage, sort}] = context.queryKey;
    const result = await (
        API.graphql({
            query: GRAPHQL_QUERY,
            variables: {
                page,
                perPage,
                sort
            }
        }) as Promise<PageResult> // we should infer the type according to https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js/#simple-query
    );
    return result.data.Page;

}

const GRAPHQL_QUERY = `
query ($page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page:$page perPage:$perPage) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        media(type: MANGA sort:$sort) {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          bannerImage
          coverImage {
            extraLarge
            large
            medium
            color
          }
          rankings {
            rank
          }
          status
          chapters
          volumes
          averageScore
          genres
          startDate {
            year
          }
          endDate{
            year
          }
        }
      }
  }
`;
