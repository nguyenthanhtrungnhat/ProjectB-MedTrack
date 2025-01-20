import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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
export default function Screen() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>

                    <Grid size={10}>
                        <Item>
                            <Grid container spacing={2}>

                                <Grid size={8}>
                                    <Item>
                                        size=8
                                        size=8 size=8 size=8 size=8 size=8 size=8
                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Grid container spacing={2}>
                                            <Grid size={12}>
                                                <Item>
                                                    size=12
                                                </Item>
                                            </Grid>
                                            <Grid size={12}>
                                                <Item>
                                                    size=12
                                                </Item>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>

                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>

                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>

                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>

                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>

                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>

                                    </Item>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid size={2}>
                        <Item>
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
        </>
    )
}