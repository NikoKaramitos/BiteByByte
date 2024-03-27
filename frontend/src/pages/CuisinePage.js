import React from 'react';
import LoggedInName from '../components/LoggedInName';
import CuisinePicker from '../components/CuisinePicker';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';

const CuisinePage = () =>
{
    return(
        <div>
            <NavBar/>
            <CuisinePicker />
            <Footer/>
        </div>
    );
}

export default CuisinePage;
