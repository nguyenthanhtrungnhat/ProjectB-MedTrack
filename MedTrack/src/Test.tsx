import * as React from 'react';
import './Test.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
export default function Test() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={9}>
                    <Item className='noPadding'>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <Item>size=6</Item>
                            </Grid>
                            <Grid size={6} className='noBorder'>
                                <Item  className='noPadding'>
                                    <Grid container spacing={1}>
                                        <Grid size={12}>
                                            <Item>size=12</Item>
                                        </Grid>
                                        <Grid size={12}>
                                            <Item>size=12</Item>
                                        </Grid>
                                    </Grid>
                                </Item>
                            </Grid>
                            <Grid size={12}>
                                <Item className='noPadding'>
                                    <Grid container spacing={2}>
                                        <Grid size={4}>
                                            <Item>size=4</Item>
                                        </Grid>
                                        <Grid size={4}>
                                            <Item>size=4</Item>
                                        </Grid> <Grid size={4}>
                                            <Item>size=4</Item>
                                        </Grid> <Grid size={4}>
                                            <Item>size=4</Item>
                                        </Grid> <Grid size={4}>
                                            <Item>size=4</Item>
                                        </Grid> <Grid size={4}>
                                            <Item>size=4</Item>
                                        </Grid>
                                    </Grid>
                                </Item>
                            </Grid>
                        </Grid>
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item className='noPadding'>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Item>size=12</Item>
                            </Grid>
                            <Grid size={12}>
                                <Item>size=12</Item>
                            </Grid>
                        </Grid>
                    </Item>
                </Grid>

            </Grid>
        </Box>
    )
}
