import React, {useEffect, useState} from 'react';
import ResultTable from "../components/ResultTable";
import styled from "styled-components";

const PageBodyHello = () => {
    const [data,setData] = useState(null);

    useEffect(() => {
        init();
    },[])

    const init = async() => {
        const lastSearch = `google`;
        setData(await getRelatedTopic(lastSearch));
    }

    const getRelatedTopic = async(keyword) => {
        const fetchResult = await fetch(`/api/search?q=${keyword}`, );
        const res = await fetchResult.json();
        return res.data;
    }

    return <ResultPage>
        <h1 className="title">{'hello!'}</h1>
        <div className="main-content">
            {data && <>
                <ResultTable tableData={data}/>
            </>}
        </div>
    </ResultPage>;
}

const ResultPage = styled.div`
  .title {
    color: #bba0a0;
    text-align: center;
  }

  .main-content {
    width: 80%;
    margin: 0 auto;
  }
`;

export default PageBodyHello;