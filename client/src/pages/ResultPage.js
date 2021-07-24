import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ResultTable from "../components/ResultTable";
import PrimarySearchAppBar from "../components/AppBar";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

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
        if(searchField) {
            const newPastQueries = new Set([...pastQueries, searchField]);
            setPastQueries([...newPastQueries])
            setData(await getRelatedTopic(searchField));
            setSearchField('');
            triggerHighlight();
        }
    }

    const triggerHighlight = () => {
        const titles = document.querySelectorAll('.title');
        const titlesArr = [...titles];
        for (let el of titlesArr) {
            highlightText(el, searchField, true, false);
        }
    }

    const highlightText = (element, phrase, allOccurrences, caseSensitive) =>{
        const modifiers = (allOccurrences ? 'g' : '') + (caseSensitive ? '' : 'i');
        const text = element.innerHTML;
        element.innerHTML = text.replace(new RegExp(phrase, modifiers), function(match){
            return '<span class="highlight" style="background-color: yellow;">' + match + '</span>';
        });
    }

    const onPastQueryClicked = async (e, text) => {
        setSearchField(text);
        setData(await getRelatedTopic(text));
    }

    return <ResultPageWrapper>
        <PrimarySearchAppBar
            searchField={searchField}
            onSearchField={onSearchField}
            onSearchBlur={onSearchBlur}
            pastQueries={pastQueries}
            onPastQueryClicked={onPastQueryClicked}
        />
        <div className="main-content">
            {data && <>
                <ResultTable tableData={data}/>
            </>}
        </div>
        <Link to="/bye">
            <div className="navigation-section">
                <Button
                    className={'navigation-btn'}
                    variant="outlined"
                    color="primary"
                >{'support paging'}</Button>
            </div>
        </Link>

    </ResultPageWrapper>;
}

const ResultPageWrapper = styled.div`
  width: 100%;
  
  .title {
    color: #bba0a0;
    text-align: center;
  }

  .main-content {
    width: 80%;
    margin: 20px auto;
  }
  
  .navigation-section {
    width: 80%;
    margin: 20px auto;
    
    .navigation-btn {
      margin-top: 20px;
    }
  }
  
`;

export default ResultPage;