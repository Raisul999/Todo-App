import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid, Button, CircularProgress, Typography } from '@mui/material'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'



const PieChart = ({ data, tasks }) => {


        ChartJS.register(ArcElement, Tooltip, Legend);

        const downloadChart = () => {
                const input = document.getElementById('chart')
                // console.log(input)
                html2canvas(input).then((canvas) => {
                        const imgData = canvas.toDataURL('image/png')
                        // console.log(imgData)
                        const pdf = new jsPDF('p', 'pt', 'a4')
                        pdf.addImage(imgData, 'JPEG', 20, 20)
                        pdf.save('Piechart.pdf')
                })
        }

        return (
                <>
                        <div>
                                <Button
                                        variant='contained'
                                        style={{ float: 'right', margin: '2rem 3rem 2rem 2rem' }}
                                        onClick={downloadChart}
                                >
                                        Download Chart
                                </Button>
                        </div>
                        {tasks.length ? <Grid container justifyContent='center' alignItems='center'>
                                <Grid item>
                                        <Pie data={data}
                                                style={{ align: 'center' }}
                                                id='chart'
                                        />
                                </Grid>
                        </Grid> : <Grid container justifyContent='center' alignItems='center'>
                                <Grid item>
                                        {tasks.length > 0 ? <CircularProgress /> : <Typography variant='h5'>
                                                No Post Statistics
                                        </Typography>}
                                </Grid>
                        </Grid>}
                </>
        )
}

export default PieChart
