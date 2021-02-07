
import React, { useState, useEffect, Component } from 'react';
import Highcharts from 'highcharts';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries, Caption
} from 'react-jsx-highcharts';


const Graph = (props) => {


    const [arrayofevents, setArrayOfEvents] = useState(props.events);
    const [averageBPM, setAveragBPM] = useState('');
    const [minBPM, setMinBPM] = useState('');
    const [maxBPM, setMaxBPM] = useState('');
    const [arrayBPMs, setArrayBPMs] = useState(null);
    const [arrayDates, setArrayDates] = useState([]);

    function calculateBPMs() {
        setArrayOfEvents(props.events);
        let array_bpm = [];
        let sum = 0;
        let array_dates = [];
        for (let i = 0; i < arrayofevents.length; i++) {
            array_bpm.push(arrayofevents[i].heartrate);
            console.log(array_bpm);
            sum += arrayofevents[i].heartrate;
            array_dates.push(arrayofevents[i].date);
        }
        setArrayDates(array_dates);
        console.log(array_dates);
        let average_bpm = sum / array_bpm.length;
        setAveragBPM(average_bpm);
        let min_bpm = Math.min(...array_bpm);
        setMinBPM(min_bpm);
        let max_bpm = Math.max(...array_bpm);
        setMaxBPM(max_bpm);
        setArrayBPMs(array_bpm);
        console.log('max bpm')
        console.log(max_bpm);
    }

    useEffect(() => {
        calculateBPMs();//when other user selected, re calculate average,max and min BPM values
    }, [props.events])
    //pointStart: 2010
    const plotOptions = {
        series: {
            arrayDates
        }

    };
    return (

        <div className="app">
            <HighchartsChart plotOptions={plotOptions}>
                <Chart />

                <Title>Patient analysis</Title>

                <Subtitle>{props.patient.name}</Subtitle>

                <Legend layout="vertical" align="right" verticalAlign="middle" />

                <XAxis categories={arrayDates}>
                    <XAxis.Title>Time</XAxis.Title>

                </XAxis>

                <YAxis>
                    <YAxis.Title>Events BPM</YAxis.Title>
                    <LineSeries name="patient" data={arrayBPMs} />

                </YAxis>

            </HighchartsChart>
            {
                maxBPM ? (
                    <div>
                        <span>Max : {maxBPM}</span>
                        <br></br>
            Min : {minBPM}
                        <br></br>
            Average : {averageBPM}
                    </div>) : (<div></div>)
            }

        </div>
    );
}
// /[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
export default withHighcharts(Graph, Highcharts);