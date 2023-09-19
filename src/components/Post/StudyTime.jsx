import React, { memo } from "react";
import Typography from "@mui/material/Typography";

const StudyTime = memo((props) => {
  // 同じbookIdを持つpostの学習時間を合計する
  const totalStudyTime = () => {
    const groupedBook = props.posts.filter(
      (value) => value.bookId === props.book.id
    );

    let sum = 0;
    for (let i = 0; i < groupedBook.length; i++) {
      sum += groupedBook[i].time;
    }
    if (sum === 0) {
      return null;
    } else {
      return Math.floor(sum / 60) + "時間" + (sum % 60) + "分";
    }
  };

  return (
    <Typography variant="h6" component="div" sx={{ display: "flex" }}>
      {props.book.name}：
      {totalStudyTime() ? (
        totalStudyTime()
      ) : (
        <Typography variant="h6" color="text.secondary">
          記録なし
        </Typography>
      )}
    </Typography>
  );
});

export default StudyTime;
