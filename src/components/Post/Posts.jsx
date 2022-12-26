/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../../index.css";
import { Post, StudyTime, db } from "../index";
// import axios from "axios";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";

function Posts(props) {
  // useEffect(() => {
  //   axios.get("http://localhost:3001/posts").then((response) => {
  //     const dataset = response.data;
  //     props.setData(dataset);
  //   });
  // }, [props.data]);

  // useLayoutEffect(() => {
  //   axios.get("http://localhost:3001/textbook").then((response) => {
  //     const dataset = response.data;
  //     props.setBook(dataset);
  //   });
  // }, []);

  // firesotreからpostsデータの取得
  (async function () {
    const docSnaps = await getDocs(collection(db, "posts"));
    const posts = [];

    docSnaps.forEach(async (post) => {
      const docRef = doc(db, "posts", post.id);
      const docSnap = await getDoc(docRef);
      const dataset = docSnap.data();

      // オブジェクトとして配列postsにデータを格納してからステートdataに渡す(常にdataが更新されて処理が重そう)
      posts.push({
        bookId: dataset.bookId,
        time: dataset.time,
        year: dataset.year,
        month: dataset.month,
        day: dataset.day,
        hours: dataset.hours,
        minute: dataset.minute,
      });
      props.setData(posts);
    });
  })();

  // firesotreからtextbooksデータの取得
  (async function () {
    const docSnaps = await getDocs(collection(db, "textbooks"));
    const textbooks = [];

    docSnaps.forEach(async (book) => {
      const docRef = doc(db, "textbooks", book.id);
      const docSnap = await getDoc(docRef);
      const dataset = docSnap.data();

      // idとnameを持つオブジェクトとして配列textbooksにデータを格納してからステートdataに渡す(常にdataが更新されて処理が重そう)
      textbooks.push({ id: book.id, name: dataset.name });
      props.setBook(textbooks);
    });
  })();

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
