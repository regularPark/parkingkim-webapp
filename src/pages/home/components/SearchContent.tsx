import { BackIcon, CompanyIcon, HomeIcon } from '@assets/index';
import SearchBar from '@components/SearchBar';
import SearchItem from '@components/SearchItem';
import SearchFilter from '@pages/Home/components/SearchFilter';
import styled from 'styled-components';
import ResultContent from './ResultContent';
import useSearch from '../hooks/useSearch';
import Text from '@components/Text';

interface SearchContentProps {
  reduceHeight: () => void;
  showResult: () => void;
}

const SearchContent = ({ reduceHeight, showResult }: SearchContentProps) => {
  const { isResultVisible, result, handleSearchWord, searchResults, drawMarker, searchKeyword } =
    useSearch(showResult);

  return (
    <>
      {isResultVisible ? (
        <ResultContent result={result!} />
      ) : (
        <SearchContainer>
          <SearchBarWrapper>
            <BackIcon onClick={reduceHeight} role="button" />
            <SearchBar isFocused={true} onChangeSearchKeyword={handleSearchWord} />
            <SearchOptionWrapper>
              <HomeAndCompany>
                <FavButton>
                  <HomeIcon />
                  <Text color="btn-gray">집</Text>
                </FavButton>
                <FavButton>
                  <CompanyIcon />
                  <Text color="btn-gray">회사</Text>
                </FavButton>
              </HomeAndCompany>
              <SearchFilter />
            </SearchOptionWrapper>
          </SearchBarWrapper>
          <ThickBar />
          <ResultContainer>
            {searchResults.map((result) => (
              <SearchButton onClick={() => drawMarker(result)}>
                <SearchItem keyword={searchKeyword} searchResult={result} />
              </SearchButton>
            ))}
          </ResultContainer>
        </SearchContainer>
      )}
    </>
  );
};

const HomeAndCompany = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FavButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  gap: 2px;
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 0;
`;

const ResultContainer = styled.ul`
  height: calc(100vh - 257px);
  overflow: scroll;
`;

const SearchContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px 0;

  position: relative;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  padding: 0 13px 14px;
  flex-direction: column;

  & > :first-child {
    cursor: pointer;
  }
`;

const ThickBar = styled.div`
  width: 100%;
  height: 7px;
  min-width: 100%;

  background: linear-gradient(to bottom, #dcdcdc 0%, #f6f6f6 30%);
`;

const SearchOptionWrapper = styled.div`
  display: flex;
  margin: 12px 10px 0 10px;
  justify-content: space-between;
  align-items: center;
`;

export default SearchContent;
