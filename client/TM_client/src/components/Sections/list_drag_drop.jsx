import React, { useEffect, useRef, useState } from "react";
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
  // Box,
  // Grid,
} from "@mui/material";
import "./style.css";

const DDList = () => {
  const [ListContainer1, SetListContainer1] = useState([
    "Task 1",
    "Task 2",
    "Task 3",
    "Task 8",
  ]);
  const [ListContainer2, SetListContainer2] = useState(["Task 4", "Task 5"]);
  const [isDragging, SetIsDragging] = useState(false);
  const [draggedItem, SetDraggedItem] = useState(null);
  // const [isMouseExit, SetMouseExit] = useState(false);
  const isMouseUp = useRef(true);
  const isMouseExited = useRef([true, null, null]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    retainList();
  }, [isMouseUp.current, isMouseExited.current]);

  const retainList = () => {
    const [currStatus, currDragItem, currSetList] = isMouseExited.current;
    if (isMouseUp.current && currStatus && currDragItem) {
      currSetList((prevList) => [
        ...prevList.filter((fitem) => fitem !== currDragItem),
        currDragItem,
      ]);
    }
  };

  const handleMouseUp = (event) => {
    isMouseUp.current = true;
    var ghost = document.getElementById("drag-ghost");
    SetIsDragging(false);
    SetDraggedItem(null);
    if (ghost) {
      ghost.parentNode.removeChild(ghost);
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      var ghost = document.getElementById("drag-ghost");
      if (ghost) {
        ghost.style.left = `${event.pageX}px`;
        ghost.style.top = `${event.pageY}px`;
      }
    }
  };

  const handleMouseDown = ({ event, item, datalist, setDataList }) => {
    isMouseUp.current = false;

    const clone = event.target.parentNode.cloneNode(true);
    SetIsDragging(true);
    SetDraggedItem(item);
    event.target.parentNode.remove();
    clone.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });

    clone.id = "drag-ghost";
    clone.style.position = "absolute";
    clone.style.left = `${event.pageX}px`;
    clone.style.top = `${event.pageY}px`;
    clone.style.transform = "translate(-50%,-50%)";
    clone.style.width = "360px";
    clone.style.rotate = "5deg";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = 100;
    document.body.appendChild(clone);
  };

  const handleMouseEnter = ({ event, index, item, datalist, setDataList }) => {
    isMouseExited.current = [false, draggedItem, setDataList];
    if (isDragging && draggedItem != item) {
      const newList = datalist.filter((fitem) => fitem !== draggedItem);
      newList.splice(index, 0, draggedItem);
      setDataList(newList);
    }
  };

  const handleMouseMainListEnter = ({ event, datalist, setDataList }) => {
    if (isDragging && draggedItem && datalist.length == 0) {
      console.log("yyy");
      isMouseExited.current = [false, draggedItem, setDataList];
      var newList = [draggedItem];
      setDataList(newList);
    }
  };

  const handleMouseExit = ({ event, datalist, setDataList }) => {
    isMouseExited.current = [true, draggedItem, setDataList];
    if (isDragging) {
      const newList = datalist.filter((fitem) => fitem !== draggedItem);
      setDataList(newList);
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
          onMouseEnter={(event) => {
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
          <CardActionArea>
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
          minHeight: "260px",
          width: "360px",
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
          handleMouseExit({
            event: event,
            datalist: datalist,
            setDataList: setDataList,
          });
        }}
        onMouseEnter={(event) => {
          handleMouseMainListEnter({
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

  return (
    <div
      className="task-container"
      style={{
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
    </div>
  );
};
export default DDList;
