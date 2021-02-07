import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import API from '../API/API';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Graph from './Graph';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


export default function ListPatients(props) {
    const classes = useStyles();
    const [bills_undone, setBillsUnDone] = useState([]);
    const [searchbar, setSearchBar] = useState(props.searchvalue);//for searching the customers
    const [patients, setPatients] = useState(null);
    const [id_chosen, setId_Chosen] = useState(null);
    const [patient_events, setPatient_Events] = useState(null);//fetched from backend
    const [chosenpatient, setChosenPatient] = useState(null);


    function fetchpatients() {
        API.getAllPatients().then(res => {
            const result = res.data;
            console.log("RESULT: ", result);

            if (res.data.success == false) {
                alert('failed delete');
            } else {

                setPatients(res.data.patients);

                //  handleClick();//for snack bar
            }
        }).catch(error => console.log("error", error));
    }//end of fetchpatients


    useEffect(() => {
        fetchpatients();
    }, []);

    function getrecord_byid(id) {
        const idtosend = id;
        console.log(idtosend);
        API.getRecordsById(idtosend).then(res => {
            const result = res.data;
            console.log("RESULT: ", result);

            if (res.data.success == false) {
                alert('failed delete');
            } else {
                setPatient_Events(res.data.events);
            }
        }).catch(error => console.log("error", error));
    }//end of approve bill method




    return (

        <React.Fragment>
            <Title>Data of Patients</Title>
            <Table size="small">
                <TableHead>
                    <TableRow


                    >
                        <TableCell>id</TableCell>
                        <TableCell>name</TableCell>
                        <TableCell>DateofBirth</TableCell>
                        <TableCell>StartTime</TableCell>
                        <TableCell>EndTime</TableCell>
                        <TableCell>DeviceNumber</TableCell>
                        <TableCell>EventsCount</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        patients ? (
                            patients.filter(name => name.name.includes(props.searchvalue)).map((row) => (
                                <TableRow
                                    hover
                                    onClick={() => {
                                        setChosenPatient(row);
                                        var idchosen = row.id;
                                        getrecord_byid(idchosen);
                                    }}
                                    key={row.id} >

                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.date_of_birth}</TableCell>
                                    <TableCell>{row.start_time}</TableCell>
                                    <TableCell>{row.end_time}</TableCell>
                                    <TableCell>{row.serialnumber}</TableCell>
                                    <TableCell>{row.events_count}</TableCell>



                                </TableRow>
                            ))) : (<div></div>)
                    }

                </TableBody>
            </Table>
            <div className={classes.seeMore}>


            </div>
            {
                patient_events ? (
                    <Graph
                        patient={chosenpatient}
                        events={patient_events}
                    />

                ) :
                    (
                        <div>

                        </div>
                    )
            }


        </React.Fragment>

    );
}









































