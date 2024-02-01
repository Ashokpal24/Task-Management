import React, { useEffect, useRef, useState } from "react";
import {
  List,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,

} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./style.css";
// Test
// 
// ["Task 6", "Task 7"],
// ["Task 8", "Task 9"],

const DnDComponent = ({ listData }) => {
  var listSections = ["New Task", "In Progress", "Quality Check", "Completed"]

  const [ListContainer1, SetListContainer1] = useState(listData ? listData : [[
    ["Task 1", "Task 2", "Task 3"],
    ["Task 4", "Task 5"],
  ]]);

  const [isDragging, SetIsDragging] = useState(false);
  const [draggedItem, SetDraggedItem] = useState(null);

  const mouseEnterID = useRef(null);

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
    clone.style.transform = "translate(-10%,-10%)";
    clone.style.width = "250px";
    clone.style.rotate = "5deg";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = 100;
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
      return (
        <Card
          className="card-container"
          id={`M${mainIndex}C${index}`}
          sx={{
            marginBottom: "1rem",
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
            <CardContent sx={{ pointerEvents: "none" }}>
              <Typography sx={{ pointerEvents: "none", fontSize: "16px", marginBottom: "0.2rem" }}>
                {item}
              </Typography>
              <Typography
                variant="body2"
                // color="text.secondary"
                sx={{ pointerEvents: "none", fontSize: "12px", fontWeight: "300" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
                cum totam non aliquid omnis quaerat rem dolore voluptatibus eius
                deserunt.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button color="primary" sx={{
              fontSize: "10px",
              fontWeight: "500"
            }}>
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
            height: "150px",
            border: "5px dashed #ccc;",
            backgroundColor: "transparent",
            boxShadow: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: "50px", color: "#ccc" }} />
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
          minHeight: "200px",
          width: "250px",
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "first",
          alignSelf: "flex-start",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "0.5rem",
          borderEndEndRadius: ".2rem",
          borderTop: "5px solid",
          borderImage: "linear-gradient(41deg, rgba(252,101,182,1) 0% , rgba(96,164,249,1) 100%) 1",
        }}
      >
        <Typography
          marginBottom="1rem"
          variant="h6"
          sx={{ pointerEvents: "none" }}
        >
          {label}
        </Typography>
        {datalist.map((item, index) => (
          <CardComponent
            key={item}
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
        justifyContent: "space-evenly",
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
