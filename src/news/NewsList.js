import React from "react";
import Divider from "@mui/material/Divider";
import NewsListItem from "./NewsListItem";
import {List} from "@mui/material";
import {connect} from "react-redux";

function NewsList(props) {
  console.log(props.news);
  return (
      <List className="NewsList">
        {
          props.news.map((n, i) => <NewsListItem key={i} news={n}/>)
        }
      </List>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    news: state.news.news
  }
}

export default connect(mapStateToProps)(NewsList);