import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Dose, readData, writeData } from "../utils/db";
import dayjs, { Dayjs } from "dayjs";

export default function DoseList({ onChange }: { onChange: () => void }) {
  const [list, setList] = useState([] as Dose[]);
  useEffect(() => {
    const list = readData() || [];
    setList(list);
  }, []);
  return (
    <div
      style={{
        height: "calc(100vh - 56px)",
        overflow: "auto",
      }}
    >
      <List>
        {list.map((i, index) => (
          <ListItem
            key={i.time}
            divider
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  // 从 list 中删除第 index 条数据
                  const result = [...list];
                  result.splice(index, 1);
                  setList([...result]);
                  writeData(result);
                  onChange?.();
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>{list.length - index}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={dayjs(i.time).format("YYYY-MM-DD HH:mm")}
              secondary={i.comment || null}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
