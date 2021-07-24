import React from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const PageBodyBye = () => {
    return <div>
        <h1 className="title">{'bye! support paging'}</h1>
        <Link to="/">
            <Button variant="outlined" color="primary">{'back to app'}</Button>
        </Link>
    </div>;
}

export default PageBodyBye;