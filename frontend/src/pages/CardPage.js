import React from 'react';
import Navbar from '../components/navbar';

import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';

const CardPage = () =>
{
    return(
        <div>
            <Navbar/>
            <CardUI />
        </div>
    );
}

export default CardPage;
