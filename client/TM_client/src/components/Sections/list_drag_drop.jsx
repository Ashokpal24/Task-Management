import * as React from 'react';
import {
    List,
    ListItem,
    ListSubheader,
    ListItemText,
    ListItemButton,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    Button,
    Box,
    Grid
} from '@mui/material';
import './style.css'
let ListContainer1 = ['Task 1', 'Task 2', 'Task 3', 'Task8']
let ListContainer2 = ['Task 4', 'Task 5']

const CardComponent = ({ item }) => {
    return (
        <Card
            sx={{
                marginBottom: '1rem'
            }}>
            <CardActionArea >
                <CardContent>
                    <Typography variant='h6'>
                        {item}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Iste cum totam non aliquid omnis quaerat rem dolore voluptatibus eius deserunt.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Comments
                </Button>
            </CardActions>
        </Card>

    )
}
const ListComponent = ({ datalist, index }) => {
    return (
        <List
            className='glass'
            sx={{
                width: 360,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'first',
                alignSelf: 'flex-start',
                padding: '1rem',
                borderEndEndRadius: '.2rem',
                borderTop: '5px solid',
                borderImage: 'linear-gradient(90deg, blue, red, orange) 1'

            }}
        >
            <Typography marginBottom='1rem' variant='h4'>Stage {index + 1}</Typography>
            {
                datalist.map((item, index) => (
                    <CardComponent key={item} item={item} />
                ))
            }
        </List >
    )
}

const DDList = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignContent: 'first'

            }}
        >
            <ListComponent datalist={ListContainer1} index={0} key='foo1' />
            <ListComponent datalist={ListContainer2} index={1} key='foo2' />
            {/* <ListComponent datalist={ListContainer2} key='foo2' /> */}
            {/* <ListComponent datalist={ListContainer2} key='foo2' /> */}
        </Box>

    )
}
export default DDList