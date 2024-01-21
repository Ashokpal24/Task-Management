import React, { useEffect, useState } from "react";
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
  Grid,
} from "@mui/material";
import "./style.css";

const DDList = () => {
  const [ListContainer1, SetListContainer1] = useState([
    "Task 1",
    "Task 2",
    "Task 3",
    "Task8",
  ]);
  const [ListContainer2, SetListContainer2] = useState(["Task 4", "Task 5"]);
  const [isDragging, SetIsDragging] = useState(false);
  const [draggedItem, SetDraggedItem] = useState(null);

  const handleMouseUp = (props) => {
    var ghost = document.getElementById("drag-ghost");
    SetIsDragging(false);
    SetDraggedItem(null);
    if (ghost) {
      ghost.parentNode.removeChild(ghost);
    }
  };

  const handleMouseDown = ({ event, item, datalist, setDataList }) => {
    // console.log(event.target.parentNode)

    const clone = event.target.parentNode.cloneNode(true);
    const newList = datalist.filter((fitem) => fitem !== item);
    setDataList(newList);
    SetIsDragging(true);
    SetDraggedItem(item);
    event.target.parentNode.remove();
    clone.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });

    clone.id = "drag-ghost";
    clone.style.position = "absolute";
    clone.style.top = "0px";
    clone.style.left = "-75px";
    clone.style.width = "360px";
    clone.style.rotate = "5deg";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = 100;
    clone.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    document.body.appendChild(clone);
  };
  const handleMouseEnter = ({ event, index, item, datalist, setDataList }) => {
    if (isDragging && draggedItem != item) {
      const newList = datalist.filter((fitem) => fitem !== draggedItem);
      newList.splice(index, 0, draggedItem);
      setDataList(newList);
    }
  };
  const handleMouseExit = ({ event, datalist, setDataList }) => {
    if (isDragging) {
      const newList = datalist.filter((fitem) => fitem !== draggedItem);
      setDataList(newList);
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      var ghost = document.getElementById("drag-ghost");
      if (ghost) {
        ghost.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
    }
  };

  const CardComponent = ({
    index,
    item,
    datalist,
    setDataList,
    setPlaceholder,
  }) => {
    const CardContainer = () => {
      return (
        <Card
          sx={{
            marginBottom: "1rem",
          }}
        >
          <CardActionArea
            onMouseEnter={(event) => {
              console.log("Now entering: ", item);
              handleMouseEnter({
                event: event,
                index: index,
                item: item,
                datalist: datalist,
                setDataList: setDataList,
              });
            }}
            onMouseDown={(event) => {
              handleMouseDown({
                event: event,
                item: item,
                datalist: datalist,
                setDataList: setDataList,
              });
            }}
          >
            <CardContent sx={{ pointerEvents: "none" }}>
              <Typography variant="h6" sx={{ pointerEvents: "none" }}>
                {item}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ pointerEvents: "none" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
                cum totam non aliquid omnis quaerat rem dolore voluptatibus eius
                deserunt.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Comments
            </Button>
          </CardActions>
        </Card>
      );
    };

    const Placeholder = () => {
      return (
        <Card
          sx={{
            marginBottom: "1rem",
            height: "200px",
            maxHeight: "250px",
          }}
        >
          <CardContent sx={{ pointerEvents: "none" }}>
            <Typography variant="h6" sx={{ pointerEvents: "none" }}>
              Placeholder
            </Typography>
          </CardContent>
        </Card>
      );
    };
    return <>{setPlaceholder ? <Placeholder /> : <CardContainer />}</>;
  };

  const ListComponent = ({ index, datalist, setDataList }) => {
    return (
      <List
        className="glass"
        sx={{
          width: 360,
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "first",
          alignSelf: "flex-start",
          padding: "1rem",
          borderEndEndRadius: ".2rem",
          borderTop: "5px solid",
          borderImage: "linear-gradient(90deg, blue, red, orange) 1",
        }}
        onMouseLeave={(event) => {
          console.log("Now exiting: ", index);
          handleMouseExit({
            event: event,
            datalist: datalist,
            setDataList: setDataList,
          });
        }}
      >
        <Typography marginBottom="1rem" variant="h4">
          Stage {index + 1}
        </Typography>
        {datalist.map((item, index) => (
          <CardComponent
            key={item}
            index={index}
            item={item}
            datalist={datalist}
            setDataList={setDataList}
            setPlaceholder={draggedItem === item}
          />
        ))}
      </List>
    );
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  return (
    <Box
      className="task-container"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "first",
      }}
    >
      <ListComponent
        index={0}
        datalist={ListContainer1}
        setDataList={SetListContainer1}
        key="foo1"
      />
      <ListComponent
        index={1}
        datalist={ListContainer2}
        setDataList={SetListContainer2}
        key="foo2"
      />
      {/* <ListComponent datalist={ListContainer2} key='foo2' /> */}
      {/* <ListComponent datalist={ListContainer2} key='foo2' /> */}
    </Box>
  );
};
export default DDList;
