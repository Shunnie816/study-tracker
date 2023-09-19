import React, { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DeleteAlert } from "../index";

const Post = memo((props) => {
  const post = props.data;

  // 入力されたpost.bookIdと一致するidを持つオブジェクトをbooksから取り出す
  const textbook = props.books.find((value) => value.id === post.bookId);

  return (
    <Card sx={{ margin: "0.2rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {post.year}/{post.month}/{post.day} {post.hours}:{post.minute}
        </Typography>
        <div className="post">
          <Typography variant="h6" component="div">
            教材名：{textbook ? textbook.name : "教材が削除されています"}
          </Typography>
          <Typography variant="h6" component="div">
            時間：{post.time}分
          </Typography>
        </div>
        <div className="post">
          <Typography variant="body2">学習内容：{post.content}</Typography>
          <DeleteAlert data={props.data} />
        </div>
      </CardContent>
    </Card>
  );
});

export default Post;
