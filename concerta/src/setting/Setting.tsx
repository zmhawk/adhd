import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import { readData, writeData } from "../utils/db";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import _ from "lodash";
import Snackbar from "@mui/material/Snackbar";

export default function Setting() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToastOpen = () => {
    setToastOpen(true);
  };

  const handleCheck = () => {
    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        setError("数据格式不正确");
        return;
      }
      if (!data.every((i) => i.time && i.dose)) {
        setError("数据格式不正确");
        return;
      }
      setError("");
      return data;
    } catch (e) {
      setError("数据格式不正确");
      return;
    }
  };

  const handleMerge = () => {
    const data = handleCheck();
    if (!data) return;
    const list = readData() || [];
    const result = _.uniqBy([...list, ...data], "time");
    writeData(_.sortBy(result, "time").reverse());
    handleClose();
  };

  const handleOverWrite = () => {
    const data = handleCheck();
    if (!data) return;
    writeData(_.sortBy(data, "time").reverse());
    handleClose();
  };

  const handleExport = () => {
    const data = readData();
    if (!data) return;
    const string = JSON.stringify(data);
    // 复制到剪切板
    navigator.clipboard.writeText(string);
    handleToastOpen();
  };

  return (
    <div>
      <List>
        <ListItemButton divider onClick={handleClickOpen}>
          <ListItemIcon>
            <FileUploadOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="导入数据" />
        </ListItemButton>
        <ListItemButton divider onClick={handleExport}>
          <ListItemIcon>
            <FileDownloadOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="导出数据" />
        </ListItemButton>
      </List>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>粘进去</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="JSON"
            multiline
            rows={20}
            fullWidth
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleMerge}>合并</Button>
          <Button onClick={handleOverWrite}>覆盖</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
        message="已复制到剪贴板"
      />
    </div>
  );
}
