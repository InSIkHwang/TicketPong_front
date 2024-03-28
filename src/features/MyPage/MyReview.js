import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import data from "../../dummy/data.json";

const ITEMS_PER_PAGE = 2; // 페이지당 표시할 데이터의 개수

const Container = styled.div`
  hr {
    height: 1px;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start; /* 세로 정렬 시작점으로 설정 */

  .imageContainer {
    margin-right: 20px; /* 이미지와 나머지 내용 사이 간격 조절 */
  }

  .contentContainer {
    display: flex;
    flex-direction: column; /* 세로로 나열하도록 설정 */
  }

  img {
    display: block;
    width: 230px;
    height: 270px;
    margin-bottom: 20px;
    object-fit: cover;
    border-radius: 12px;
  }

  p {
    font-size: 18px;
    margin: 0;
    text-align: left;
    line-height: 50px;
    padding: 5px;
  }
`;

const ButtonContainer = styled.div`
  align-items: center;
  text-align: center;
`;

const MoveBtn = styled.button`
  text-align: center;
  background-color: white;
  border: 0;
  font-size: 20px;
  border-radius: 20px;

  &:active,
  &:hover {
    background-color: #fc1055;
  }
`;

const WriteBtn = styled.button`
  float: right;
  width: 120px;
  height: 50px;
  border-radius: 3px;
  color: #ffffff;
  background-color: #fc1055;
  border: none;
  font-size: 18px;
`;

const HrBox = styled.div`
  width: 1700px;
  height: 320px;
`;

const MyReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const URL = "https://www.kopis.or.kr/";

  const jsonData = data;

  // 현재 페이지의 데이터 범위를 계산
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(
    startIndex + ITEMS_PER_PAGE,
    jsonData?.boxofs?.boxof?.length
  );

  // 시작페이지로 이동
  const goToStartPage = () => {
    setCurrentPage(1);
  };

  // 이전 페이지로 이동
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil(jsonData?.boxofs?.boxof?.length / ITEMS_PER_PAGE)
      )
    );
  };

  // 끝 페이지로 이동
  const goToEndPage = () => {
    setCurrentPage(endIndex);
  };

  return (
    <Container>
      <hr style={{ border: "0", borderTop: "2px solid black" }} />
      <ul>
        {jsonData?.boxofs?.boxof
          ?.slice(startIndex, endIndex)
          .map((item, index) => (
            <HrBox key={index}>
              <ListItem key={index}>
                <div className="imageContainer">
                  <Link to={`/editmyreview/${item.prfnm._text}`}>
                    {item.poster && (
                      <img src={URL + item.poster._text} alt="포스터" />
                    )}
                  </Link>
                </div>
                <div className="contentContainer">
                  {item.cate && <p>장르: {item.cate._text}</p>}
                  {item.area && <p>지역: {item.area._text}</p>}
                  {item.prfnm && <p>이름: {item.prfnm._text}</p>}
                  {item.prfpd && <p>기간: {item.prfpd._text}</p>}
                </div>
              </ListItem>
              {index <= endIndex - 1 && <hr />}
            </HrBox>
          ))}
      </ul>
      <ButtonContainer>
        <MoveBtn onClick={goToStartPage}>{"<<"}</MoveBtn>
        <MoveBtn onClick={goToPrevPage}>{"<"}</MoveBtn>
        {Array.from(
          {
            length: Math.ceil(jsonData?.boxofs?.boxof?.length / ITEMS_PER_PAGE),
          },
          (_, i) => (
            <MoveBtn key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </MoveBtn>
          )
        )}

        <MoveBtn onClick={goToNextPage}>{">"}</MoveBtn>
        <MoveBtn onClick={goToEndPage}>{">>"}</MoveBtn>
        <Link to="/writereview">
          <WriteBtn>후기 작성</WriteBtn>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default MyReview;
