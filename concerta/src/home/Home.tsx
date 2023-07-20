import { useEffect, useState } from "react";
import { renderMainChart } from "./chart";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { addDose } from "../utils/db";
import { useInterval } from "../utils/hooks";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(dayjs());

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setTime(dayjs());
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    addDose(time);
    renderMainChart();
  };

  useInterval(() => {
    renderMainChart();
  }, 60 * 1000);

  return (
    <div>
      <div id="mainChart"></div>
      <Paper
        sx={{
          position: "fixed",
          bottom: 100,
          left: 0,
          right: 0,
          width: 120,
          height: 60,
          margin: "auto",
        }}
        elevation={4}
      >
        <Button
          variant="outlined"
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={handleOpen}
        >
          记录药物
        </Button>
      </Paper>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
        <DialogTitle>记录药物</DialogTitle>
        <DialogContent>
          <DialogContentText>请选择您的服药时间。</DialogContentText>
          <MobileDateTimePicker
            format="YYYY-MM-DD HH:mm"
            openTo="hours"
            autoFocus
            ampm={false}
            defaultValue={time}
            onChange={(newValue: Dayjs) => {
              setTime(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleConfirm}>确定</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
