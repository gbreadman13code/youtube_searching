import { VideoResultsType } from "../types";

interface VideosState {
  videos: VideoResultsType[];
  current_query: string;
}

const initialState: VideosState = {
  videos: [],
  current_query: "",
};

export const GET_VIDEOS = "GET_VIDEOS";
export const CURRENT_QUERY = "CURRENT_QUERY";

interface GetVideosAction {
  type: typeof GET_VIDEOS;
  payload: any[];
}

interface GetCurrentQueryAction {
  type: typeof CURRENT_QUERY;
  payload: string;
}

export type VideosActionType = GetVideosAction;

export const videoReducer = (
  state = initialState,
  action: any
): VideosState => {
  switch (action.type) {
    case GET_VIDEOS:
      return { ...state, videos: action.payload };
    case CURRENT_QUERY:
      return { ...state, current_query: action.payload };
    default:
      return state;
  }
};

export const getVideosAction = (payload: any): VideosActionType => ({
  type: GET_VIDEOS,
  payload,
});

export const currentQueryAction = (payload: string): GetCurrentQueryAction => ({
  type: CURRENT_QUERY,
  payload,
});
