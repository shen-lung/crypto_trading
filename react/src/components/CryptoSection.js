import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import {
    Grid,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
    getOrderBook,
} from '../api/getOrderBook';


const getCryptoList = (info, cryptoType) => {
    let infoDecimalList = [];
    let bigPosition = 100;
    let roundNumber = 0;

    if(cryptoType === 'btc') {
        bigPosition = 5;
    } else if(cryptoType === 'xrp') {
        roundNumber = 3;
    }

    _.forEach(info, (data) => {
        const price = _.round(data[0], roundNumber);
        const count = Number(data[1]);

    
        if(infoDecimalList.length > 0) {
            const lastIndex = infoDecimalList.length - 1;

            if(infoDecimalList[lastIndex][0] === price) {
                infoDecimalList[lastIndex][1] += count;
            } else {
                infoDecimalList.push([price, count]);
            }
        } else {
            infoDecimalList.push([price, count]);
        }
    })
    let infoList = _.remove(infoDecimalList, (data) => {
        data[1] = _.round(data[1], roundNumber);

        return data[1] >= bigPosition; 
    });

    return infoList;
}

export default function CryptoSection() {
    
    const [tradeData, setTradeData] = useState({});
    
    useEffect(() => {
        const interval = setInterval(() => {
            getOrderBook().then((data) => {
                const btcCrypto = data[0];
                const ethCrypto = data[1];
                const xrpCrypto = data[2];

                const btcBidInfoList = getCryptoList(btcCrypto.bids, 'btc')
                const btcAskInfoList = getCryptoList(btcCrypto.asks, 'btc')
                
                const ethBidInfoList = getCryptoList(ethCrypto.bids, 'eth')
                const ethAskInfoList = getCryptoList(ethCrypto.asks, 'eth')

                const xrpBidInfoList = getCryptoList(xrpCrypto.bids, 'xrp')
                const xrpAskInfoList = getCryptoList(xrpCrypto.asks, 'xrp')
                
                setTradeData({
                    btcBidInfoList,
                    btcAskInfoList,
                    ethBidInfoList,
                    ethAskInfoList,
                    xrpBidInfoList,
                    xrpAskInfoList
                });
            });
        }, 10000);
        return () => clearInterval(interval);
    }, [tradeData])

    return (
        <Grid container item xs={12} className="header">
            <Grid container item xs={12}>
                <Grid container item xs={4} justify="center" alignItems="center">BTC/USDT</Grid>
                <Grid container item xs={4} justify="center" alignItems="center">ETH/USDT</Grid>
                <Grid container item xs={4} justify="center" alignItems="center">XRP/USDT</Grid>
            </Grid>
            <Grid container item xs={4} className="table-container">
                <Grid container item xs={6}>
                    <TableContainer component={Paper} className="table-border-right">
                        <Table aria-label="simple table"  size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>BID price</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {!_.isEmpty(tradeData) && tradeData.btcBidInfoList.map((data, index) => (
                                <TableRow key={data[0]} className={data[1] >= 40 ? 'big-count' : 'bid-row'}>
                                    <TableCell component="th" scope="row">
                                        {data[0]}
                                    </TableCell>
                                    <TableCell align="left">{data[1]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table"  size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ASK price</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {!_.isEmpty(tradeData) && tradeData.btcAskInfoList.map((data) => (
                                <TableRow key={data[0]} className={data[1] >= 40 ? 'big-count' : 'ask-row'}>
                                    <TableCell component="th" scope="row">
                                        {data[0]}
                                    </TableCell>
                                    <TableCell align="left">{data[1]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid container item xs={4} className="table-container">
                <Grid container item xs={6}>
                    <TableContainer component={Paper} className="table-border-right">
                        <Table aria-label="simple table"  size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>BID price</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {!_.isEmpty(tradeData) && tradeData.ethBidInfoList.map((data, index) => (
                                <TableRow key={data[0]} className={data[1] >= 300 ? 'big-count' : 'bid-row'}>
                                    <TableCell component="th" scope="row">
                                        {data[0]}
                                    </TableCell>
                                    <TableCell align="left">{data[1]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table"  size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ASK price</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {!_.isEmpty(tradeData) && tradeData.ethAskInfoList.map((data) => (
                                <TableRow key={data[0]} className={data[1] >= 300 ? 'big-count' : 'ask-row'}>
                                    <TableCell component="th" scope="row">
                                        {data[0]}
                                    </TableCell>
                                    <TableCell align="left">{data[1]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid container item xs={4} className="table-container">
                <Grid container item xs={6}>
                    <TableContainer component={Paper} className="table-border-right">
                        <Table aria-label="simple table"  size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>BID price</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {!_.isEmpty(tradeData) && tradeData.xrpBidInfoList.map((data, index) => (
                                <TableRow key={data[0]} className={data[1] >= 800000 ? 'big-count' : 'bid-row'}>
                                    <TableCell component="th" scope="row">
                                        {data[0]}
                                    </TableCell>
                                    <TableCell align="left">{data[1]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table"  size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ASK price</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {!_.isEmpty(tradeData) && tradeData.xrpAskInfoList.map((data) => (
                                <TableRow key={data[0]} className={data[1] >= 800000 ? 'big-count' : 'ask-row'}>
                                    <TableCell component="th" scope="row">
                                        {data[0]}
                                    </TableCell>
                                    <TableCell align="left">{data[1]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );
}
