import React, { useEffect, useState } from 'react';
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




const DDList = () => {
    const [ListContainer1, SetListContainer1] = useState(['Task 1', 'Task 2', 'Task 3', 'Task8'])
    const [ListContainer2, SetListContainer2] = useState(['Task 4', 'Task 5'])
    const [isDragging, setIsDragging] = useState(false);


    const handleMouseUp = (props) => {
        var ghost = document.getElementById("drag-ghost");
        if (ghost) {
            setIsDragging(false);
            ghost.parentNode.removeChild(ghost);
        }
    }

    const handleMouseDown = ({ event, datalist, setDataList, item }) => {
        // console.log(event.target.parentNode)

        const clone = event.target.parentNode.cloneNode(true);
        const newList = datalist.filter((fitem) => fitem !== item)
        setDataList(newList)
        setIsDragging(true);
        event.target.parentNode.remove()
        clone.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });

        clone.id = "drag-ghost";
        clone.style.position = "absolute";
        clone.style.top = "-120px";
        clone.style.left = "-75px";
        clone.style.width = "360px";
        clone.style.rotate = "5deg";
        clone.style.pointerEvents = "none";
        clone.style.zIndex = 100;
        clone.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        document.getElementsByClassName('task-container')[0].appendChild(clone);

    }

    const handleMouseMove = (event) => {
        if (isDragging) {
            var ghost = document.getElementById("drag-ghost");
            if (ghost) {
                ghost.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
            }
        }
    }


    const CardComponent = ({ item, datalist, setDataList }) => {
        return (
            <Card
                sx={{
                    marginBottom: '1rem'
                }}

            >
                <CardActionArea
                    // onMouseEnter={(event) => { console.log(item) }}
                    onMouseDown={(event) => {

                        handleMouseDown({
                            event: event,
                            datalist: datalist,
                            setDataList: setDataList,
                            item: item,
                        });
                    }}>
                    <CardContent sx={{ pointerEvents: 'none' }}>
                        <Typography variant='h6' sx={{ pointerEvents: 'none' }}>
                            {item}
                        </Typography >
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ pointerEvents: 'none' }}
                        >
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Iste cum totam non aliquid omnis quaerat rem dolore voluptatibus eius deserunt.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" >
                        Comments
                    </Button>
                </CardActions>
            </Card >

        )
    }
    const ListComponent = ({ datalist, setDataList, index }) => {
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
                        <CardComponent key={item} item={item} datalist={datalist} setDataList={setDataList} />
                    ))
                }
            </List >
        )
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return (
        <Box
            className='task-container'
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignContent: 'first'

            }}
        >
            <ListComponent datalist={ListContainer1} setDataList={SetListContainer1} index={0} key='foo1' />
            <ListComponent datalist={ListContainer2} setDataList={SetListContainer2} index={1} key='foo2' />
            {/* <ListComponent datalist={ListContainer2} key='foo2' /> */}
            {/* <ListComponent datalist={ListContainer2} key='foo2' /> */}
        </Box>

    )
}
export default DDList