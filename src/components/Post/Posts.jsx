/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../../index.css";
import { Post, StudyTime } from "../index";
import axios from "axios";

function Posts(props) {
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      const dataset = response.data;
      props.setData(dataset);
    });
  }, []);

  useLayoutEffect(() => {
    axios.get("http://localhost:3001/textbook").then((response) => {
      const dataset = response.data;
      props.setBook(dataset);
    });
  }, []);

  //   textbookデータをオブジェクトの入った配列として取得
  const books = props.book.map((textbook, index) => ({
    id: textbook.id,
    name: textbook.name,
  }));

  //   postsデータをオブジェクトの入った配列として取得
  const posts = props.data.map((post, index) => ({
    bookId: post.bookId,
    time: post.time,
  }));

  // 合計学習時間を求める
  const calcTotalTime = () => {
    let totalTime = 0;
    props.data.map((post, index) => (totalTime += post.time));
    return Math.floor(totalTime / 60) + "時間" + (totalTime % 60) + "分";
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="80%"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          component="span"
          sx={{
            width: "360px",
            height: "480px",
            border: "3px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            overflow: "auto",
          }}
        >
          {/* 投稿を降順で表示 */}
          {props.data
            .map((post, index) => (
              <Post
                data={post}
                bookId={props.bookId}
                books={books}
                key={post.id}
              />
            ))
            .reverse()}
        </Box>

        {/* 合計時間や教材別学習時間の表示 */}
        <Box
          component="span"
          sx={{
            width: 300,
            height: 480,
            border: "3px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            overflow: "auto",
          }}
        >
          <Card sx={{ margin: "0.2rem" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                教科別の学習時間
              </Typography>
              {/* 教材別学習時間を表示 */}
              {props.book.map((textbook, index) => (
                <StudyTime book={textbook} posts={posts} key={textbook.id} />
              ))}
            </CardContent>
          </Card>
          <h2 className="totalTime">合計学習時間：{calcTotalTime()}</h2>
        </Box>
      </Container>
    </>
  );
}

export default Posts;
