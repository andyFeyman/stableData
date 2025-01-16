import React from 'react';
import CCardsList from '../components/CCardsList';
import { Helmet } from 'react-helmet';

export default function L2DataPage() {
    return(
        <div className="container-fluid">
            <Helmet>
                <title>ETH L2 Explorer</title>
                <meta name="description" content="The main ETH L2 Data, what is ETH L2, All of of ethereum L2 Explorer " />
                <meta name="keywords" content="ETH L2,Blockchain,Cryptocurrency Market,L2,Cryptocurrency,ETH Rollup,Base Explorer, Arbitrum,op" />
            </Helmet>
            <CCardsList />
        </div>
    )

}