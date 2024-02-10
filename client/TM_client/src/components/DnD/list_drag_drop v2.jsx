import React, { useEffect, useRef, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  Box,
  LinearProgress

} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import { formatToDMY } from "../utils";
// Test
// 
// ["Task 6", "Task 7"],
// ["Task 8", "Task 9"],

const DnDComponent = ({ listData, setTaskOpen, setSubtaskOpen }) => {
  var listSections = ["New task", "In progress", "Quality check", "Completed"]

  const [ListContainer1, SetListContainer1] = useState([[], [], [], []]);
  const [isDragging, SetIsDragging] = useState(false);
  const [draggedItem, SetDraggedItem] = useState(null);

  const mouseEnterID = useRef(null);

  useEffect(() => {
    // console.log(listData)
    SetListContainer1(listData);
  }, [listData]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const handleMouseUp = (event) => {
    var ghost = document.getElementById("drag-ghost");
    SetIsDragging(false);
    SetDraggedItem(null);
    if (ghost) {
      ghost.parentNode.removeChild(ghost);
    }
  };

  const updateList = ({ indexes }) => {
    var newList = [];
    const tempList = [...ListContainer1];
    const mainIndex = indexes[0];

    tempList.forEach((listItem, index) => {
      // console.log(index);
      if (listItem.includes(draggedItem) && index != mainIndex) {
        // console.log("cond 1");
        const modifiedList = [...listItem];
        modifiedList.splice(modifiedList.indexOf(draggedItem), 1);
        newList.push(modifiedList);
      } else if (listItem.includes(draggedItem) && index == mainIndex) {
        // console.log("cond 2");
        const modifiedList = [...listItem];
        modifiedList.splice(modifiedList.indexOf(draggedItem), 1);
        modifiedList.splice(indexes[1], 0, draggedItem);
        newList.push(modifiedList);
      } else if (
        listItem.includes(draggedItem) == false &&
        index == mainIndex
      ) {
        console.log("cond 3");
        const modifiedList = [...listItem];
        modifiedList.splice(indexes[1], 0, draggedItem);
        newList.push(modifiedList);
      } else {
        // console.log("cond 4");
        newList.push([...listItem]);
      }
    });
    SetListContainer1(newList);
  };

  const handleMouseMove = (event) => {
    const boxes = document.querySelectorAll(".list-container");
    const cards = document.querySelectorAll(".card-container");
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();

      if (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom &&
        draggedItem &&
        card.id !== mouseEnterID.current
      ) {
        mouseEnterID.current = card.id;
        const extractedIndex = card.id.match(/\d+/g).map(Number);
        updateList({ indexes: extractedIndex });
      }
    });

    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();

      if (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom &&
        draggedItem &&
        box.id !== mouseEnterID.current
      ) {
        mouseEnterID.current = box.id;
        const extractedIndex = box.id.match(/\d+/g).map(Number);
        if (ListContainer1[extractedIndex[0]].length == 0)
          updateList({ indexes: extractedIndex });
      }
    });

    if (isDragging) {
      var ghost = document.getElementById("drag-ghost");
      if (ghost) {
        ghost.style.left = `${event.pageX}px`;
        ghost.style.top = `${event.pageY}px`;
      }
    }
  };

  const handleMouseDown = ({ event, item, datalist, setDataList }) => {
    const clone = event.target.parentNode.cloneNode(true);
    SetIsDragging(true);
    SetDraggedItem(item);
    event.target.parentNode.remove();
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    clone.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
    clone.classList.remove("card-container");
    clone.class = "ghost-container";
    clone.id = "drag-ghost";
    clone.style.position = "absolute";
    clone.style.left = `${event.pageX}px`;
    clone.style.top = `${event.pageY}px`;
    clone.style.transform = "translate(-30%,-5%)";
    clone.style.width = "250px";
    clone.style.rotate = "5deg";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = 100;
    clone.style.border = "none";
    clone.style.boxShadow = "10px 10px 50px #bebebe, -10px -10px 50px #ffffff";
    // clone.style.mixBlendMode = "multiply";
    document.body.appendChild(clone);
  };

  const CardComponent = ({
    index,
    mainIndex,
    item,
    datalist,
    setDataList,
    setPlaceholder,
  }) => {
    const CardContainer = () => {
      var completed = item.subtasks.filter((subtask, index) => subtask.mark_done == true).length
      var total = item.subtasks.length
      var percentage = completed / total * 100
      return (
        <Card
          className="card-container"
          id={`M${mainIndex}C${index}`}
          sx={{
            maxWidth: "250px",
            minWidth: "250px",
            minHeight: "160px",
            maxHeight: "160px",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            boxShadow: 0,
            border: "1.5px solid black;",
          }}
        >
          <CardActionArea
            onMouseDown={(event) => {
              handleMouseDown({
                event: event,
                item: item,
                datalist: datalist,
                setDataList: setDataList,
              });
            }}
          >
            <CardContent sx={{
              pointerEvents: "none",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "1rem",
              paddingBottom: "0.5rem",
            }}>
              <Typography sx={{
                pointerEvents: "none",
                fontSize: "16px",
                fontWeight: "600",
              }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                // color="text.secondary"
                sx={{
                  pointerEvents: "none",
                  fontSize: "12px",
                  fontWeight: "300",
                  color: "gray"
                }}
              >
                Lorem ipsum, dolor.
              </Typography>
            </CardContent>
          </CardActionArea>
          {/* <>
            <Typography
              marginLeft="1rem"
              sx={{
                pointerEvents: "none",
                fontSize: "16px",
                marginBottom: "0.2rem"
              }}
            >
              Subtasks
            </Typography>
            <List
              sx={{
                maxHeight: "95px",
                overflowY: "auto",
                boxShadow: "inset 1px 1px 2px #bebebe",
                marginLeft: "1rem",
                marginRight: "1rem"
              }}>

              {item.subtasks.map((subtask, index) => (
                <div key={subtask.id + "" + item.id}>
                  <ListItem>
                    <Typography
                      variant="body2"
                      sx={{
                        pointerEvents: "cursor",
                        fontSize: "12px",
                        fontWeight: "300"
                      }}
                    >
                      {subtask.title}
                    </Typography>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </> */}
          <CardActions sx={{ padding: 0 }}>
            <Box sx={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0rem",
              paddingBottom: "0.2rem",
              width: "100%"
            }}>
              {total > 0 ? (
                <>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "space-around",
                    alignItems: "center"
                  }}>
                    <MenuIcon sx={{
                      color: "#ccc",
                      ":hover": { color: "black" },
                      transition: "0.2s",
                      marginBottom: "0.5rem",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }}
                      onClick={(event) => setSubtaskOpen({ status: true, task_id: item.id })}
                    />
                    <Typography sx={{
                      pointerEvents: "none",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "0.2rem",
                      color: "grey",
                      userSelect: "none"
                    }}>
                      Subtask progress
                    </Typography>
                    <Typography sx={{
                      marginLeft: "3rem",
                      pointerEvents: "none",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "0.2rem",
                      color: "black",
                      userSelect: "none",
                    }}>
                      {completed}/{total}
                    </Typography>
                  </div>
                  <LinearProgress variant="determinate" color="inherit" sx={{
                    color: percentage == 100 ? "green" : percentage > 50 ? "orange" : percentage > 30 ? "orangered" : "red",
                    marginBottom: "1rem",
                  }} value={percentage} />
                </>
              ) : (<div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: "0.2rem"
              }}>
                <Typography sx={{
                  pointerEvents: "none",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "0.2rem",
                  color: "grey",
                  userSelect: "none"
                }}> No subtask</Typography>
                <Button
                  sx={{
                    color: "black",
                    fontSize: "12px",
                    fontWeight: "600",
                    width: "65%",
                    textAlign: "center"
                  }}
                  onClick={(event) => setSubtaskOpen({ status: true, task_id: null })}
                >
                  <AddCircleTwoToneIcon sx={{ marginBottom: "0.2rem" }} />
                  Add Subtasks
                </Button>
              </div>)}
              <Chip label={formatToDMY({ dateString: item.created_at })} color="primary" sx={{
                backgroundColor: "#fff2f2",
                color: "#ff9696",
                fontWeight: "600",
                userSelect: "none"
              }} />
            </Box>

          </CardActions>
        </Card >
      );
    };

    const Placeholder = () => {
      return (
        <Card
          sx={{
            maxWidth: "250px",
            minWidth: "250px",
            minHeight: "160px",
            maxHeight: "160px",
            borderRadius: "0.5rem",
            border: "2px dashed gray;",
            boxShadow: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: "24px", color: "black" }} />
        </Card>
      );
    };
    return <>{setPlaceholder ? <Placeholder /> : <CardContainer />}</>;
  };

  const ListComponent = ({ mainIndex, label, datalist, setDataList }) => {
    return (
      <List
        className="glass list-container"
        id={"f" + mainIndex}
        sx={{
          minHeight: "220px",
          width: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "first",
          alignItems: "center",
          alignSelf: "flex-start",
          border: "2px dashed #ccc;",
          borderRadius: "0.5rem",
          backgroundColor: "transparent",
          boxShadow: 0,
          paddingLeft: "0.2rem",
          paddingRight: "0.2rem",
          paddingBottom: "0.2rem",
          // borderTop: "5px solid",
          // borderImage: "linear-gradient(41deg, rgba(252,101,182,1) 0% , rgba(96,164,249,1) 100%) 1",
        }}
      >
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "1rem"
        }}>
          <Typography

            sx={{
              pointerEvents: "none",
              color: "gray",
              fontSize: "16px",
              fontWeight: "600",
              userSelect: "none"
            }}
          >
            {label} ({datalist.length})
          </Typography>
          <Button
            sx={{
              color: "black",
              fontSize: "12px",
              fontWeight: "600",
              width: "40%",
              textAlign: "center"
            }}
            onClick={(event) => setTaskOpen(true)}
          >
            <AddCircleTwoToneIcon sx={{ marginBottom: "0.2rem" }} />
            Add task
          </Button>
        </div>

        {datalist.map((item, index) => (
          <CardComponent
            key={item.id}
            mainIndex={mainIndex}
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
        justifyContent: "space-between",
        alignContent: "first",
      }}
    >
      {listSections.map((label, index) => (
        <ListComponent
          key={"foo" + index}
          mainIndex={index}
          label={label}
          datalist={ListContainer1[index]}
          setDataList={SetListContainer1}
        />
      ))}
    </div>
  );
};
export default DnDComponent;
