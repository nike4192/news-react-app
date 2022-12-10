
import NewsList from "./NewsList";
import {useDispatch, useSelector} from "react-redux";
import {fetchNews, selectAllNews, selectCurrentPage, setCurrentPage} from "../store/news";
import {useEffect, useState} from "react";
import {Box, List} from "@mui/material";

function NewsView(props) {
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch()

  const newsStatus = useSelector(state => state.news.status);
  useEffect(() => {
    if (newsStatus === 'idle') {
      dispatch(fetchNews(currentPage));
    }
  }, [newsStatus, dispatch]);

  async function watchScroll(e) {
    const target = e.target;
    async function setPageNews(page) {
      await dispatch(fetchNews(page));
      dispatch(setCurrentPage(page));
    }
    // console.log(newsStatus, target.scrollHeight, target.scrollTop, target.offsetHeight);
    if (newsStatus !== 'loading') {
      if (target.scrollHeight - target.scrollTop - target.offsetHeight < target.offsetHeight) {
        await setPageNews(currentPage + 1);
      }
    }
  }

  return (
    <Box className="NewsView"
       active={props.active?.toString()}
       sx={{overflowY: 'scroll'}}
       onScroll={watchScroll}>
      <NewsList/>
    </Box>
  )
}

export default NewsView