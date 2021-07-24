import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ResultTable from "../components/ResultTable";
import PrimarySearchAppBar from "../components/AppBar";

const ResultPage = () => {
    const [data,setData] = useState(null);
    const [searchField, setSearchField] = useState('');
    const [pastQueries, setPastQueries] = useState([]);

    useEffect(() => {
        init();
    },[])

    const init = async() => {
        const lastSearch = `google`;
        setData(await getRelatedTopic(lastSearch));
    }

    const getRelatedTopic = async(keyword) => {
        if (!keyword) return;
        const fetchResult = await fetch(`/api/search?q=${keyword}`, );
        const res = await fetchResult.json();
        return res.data;
    }

    const onSearchField = (e) => {
        const val = e.target.value;
        setSearchField(val);
    }

    const onSearchBlur = async(e) => {
        const newPastQueries = [
            ...pastQueries,
            searchField
        ];
        setPastQueries(newPastQueries)
        setData(await getRelatedTopic(searchField));
    }

    return <ResultPageWrapper>
        <PrimarySearchAppBar
            searchField={searchField}
            onSearchField={onSearchField}
            onSearchBlur={onSearchBlur}
            pastQueries={pastQueries}
        />
        <div className="main-content">
            {data && <>
                <ResultTable tableData={data}/>
            </>}
        </div>
    </ResultPageWrapper>;
}

const ResultPageWrapper = styled.div`
  .title {
    color: #bba0a0;
    text-align: center;
  }

  .main-content {
    width: 80%;
    margin: 0 auto;
  }
`;

export default ResultPage;