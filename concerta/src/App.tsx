import { useState } from "react";
import "./App.css";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import Home from "./home/Home";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Calendar from "./calendar/Calendar";
import List from "./list/List";
import Container from "@mui/material/Container";
import Setting from "./setting/Setting";
import { getOrient } from "./utils/utils";

enum Tab {
  Home = "home",
  Calendar = "calendar",
  List = "list",
  Setting = "setting",
}

function App() {
  const [tab, setTab] = useState(Tab.Home);
  console.log(tab);
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="zh-cn"
      localeText={{}}
    >
      <Container>
        {tab === Tab.Home && <Home />}
        {tab === Tab.Calendar && <Calendar />}
        {tab === Tab.List &&
          (getOrient() === "vertical" ? <List /> : <Calendar />)}
        {tab === Tab.Setting && <Setting />}
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={tab}
            onChange={(event, newValue: Tab) => {
              setTab(newValue);
            }}
          >
            <BottomNavigationAction
              label="主页"
              value={Tab.Home}
              icon={<ShowChartRoundedIcon />}
            />
            <BottomNavigationAction
              label="日历"
              value={Tab.Calendar}
              icon={<CalendarMonthIcon />}
            />
            {getOrient() === "vertical" && (
              <BottomNavigationAction
                label="列表"
                value={Tab.List}
                icon={<CalendarMonthIcon />}
              />
            )}
            <BottomNavigationAction
              label="设置"
              value={Tab.Setting}
              icon={<SettingsIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
