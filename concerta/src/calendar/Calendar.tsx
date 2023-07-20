import { renderCalenderChart } from "./chart";
import { useInterval } from "../utils/hooks";
import DoseList from "../list/List";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { getOrient } from "../utils/utils";

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
