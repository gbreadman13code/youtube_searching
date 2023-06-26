import { Dispatch } from "redux";
import { getVideosAction, VideosActionType } from "../redux/videoReducer";
import { API_KEY } from "../API_KEY";

export const getVideos = async (
  query: string,
  dispatch: Dispatch<VideosActionType>,
  link?: string
) => {
  fetch(
    link
      ? link
      : `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&maxResults=12&key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((answer) => dispatch(getVideosAction(answer)));
};
