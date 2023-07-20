import { useEffect, useState } from "react";
import { renderCalenderChart, renderMainChart } from "./chart";
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
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { getOrient } from "../utils/utils";
import DoseList from "../list/List";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

export default function Calendar() {
  useInterval(() => {
    renderCalenderChart();
  }, 60 * 1000);

  if (getOrient() === "vertical") {
    return (
      <div>
        <div id="calenderChart"></div>
      </div>
    );
  }
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <div id="calenderChart"></div>
        </Grid>
        <Grid xs={8}>
          <DoseList onChange={renderCalenderChart} />
        </Grid>
      </Grid>
    </Box>
  );
}
