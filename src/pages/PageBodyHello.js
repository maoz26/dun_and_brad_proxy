import React, {useEffect, useState} from 'react';

const PageBodyHello = () => {
    const [data,setData] = useState(null);

    useEffect(() => {
        init();
    },[])

    const init = async() => {
        const lastSearch = `yad`;
        // const response = await fetch(`https://localhost:2020/api/search?q=${lastSearch}`, {mode: 'cors'});
        const response = await fetch(`https://localhost:5000/api`);
        const data = await response.json();
        console.log(data);
    }

    return <div>
        <h1 className="title">{'hello!'}</h1>
    </div>;
}

export default PageBodyHello;