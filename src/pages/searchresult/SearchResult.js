import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import searchTopImg from "../../assets/searchResultImg/search_topImg.jpg";

const Container = styled.div`
  position: relative;
  margin-top: 60px;
`;

const TopImage = styled.img`
  width: 100%;
  height: 370px;
  object-fit: cover;
`;

const Title = styled.h2`
  position: absolute;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  margin: 0;
  color: #fff;
`;

const GoToViewAllButton = styled(Link)`
  position: absolute;
  top: 260px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 16px;
  background-color: transparent;
  border-radius: 30px;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
`;

const ResultCount = styled.h1`
  font-size: 24px;
  width: 80%;
  margin-left: 10%;
  margin-top: 130px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 100px;
`;

const ResultItem = styled.div`
  margin: 20px;
  max-width: 300px;
`;

const PosterImage = styled.img`
  width: 310px;
  height: 390px;
  border-radius: 12px;
`;

const ResultTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  line-height: 0px;
  color: #171717;
`;

const ResultPlace = styled.p`
  font-size: 16px;
  line-height: 10px;
  color: #171717;
`;

const ResultDate = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  line-height: 5px;
  color: #999;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (keyword) {
      fetch(`http://localhost:8080/searchBar?keyword=${keyword}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("검색 결과 가져오기 실패");
          }
          return response.json();
        })
        .then((searchData) => {
          setSearchResults(searchData);
        })
        .catch((error) => {
          console.error("검색 결과를 가져오는 중에 오류 발생:", error);
        });
    }
  }, [keyword]);

  return (
    <Container>
      <TopImage src={searchTopImg} alt="topImg" />
      <Title>검색하신 '{keyword}'에 대한 검색 결과입니다.</Title>
      <GoToViewAllButton to="/viewall">
        전체보기 페이지로 이동하기
      </GoToViewAllButton>
      <ResultCount>티켓 ({searchResults.length})</ResultCount>
      <ResultContainer>
        {searchResults.map((result) => (
          <StyleLink to={`/ticketing/${result.mt20id}`} key={result.id}>
          <ResultItem key={result.id}>
            <PosterImage src={result.poster} alt="Poster" />
            <ResultTitle>
              {result.prfnm.length > 15 ?
              (<>&lt;{result.prfnm.slice(0, 15)}...</>)
              : (<>&lt;{result.prfnm}&gt;</>
                    )}</ResultTitle>
            <ResultPlace>{result.mt10id}</ResultPlace>
            <ResultDate>
              {result.prfpdfrom} ~ {result.prfpdto}
            </ResultDate>
          </ResultItem>
          </StyleLink>
        ))}
      </ResultContainer>
    </Container>
  );
};

export default SearchResult;
