import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import dayjs from "dayjs";
import ScheduleIcon from '@material-ui/icons/Schedule';


function MyScheduler({ tasks }) {
  const [currentDate, currentDateChange] = useState(new Date())

  const transformedTask = tasks.map((task) => (
    { title: task.device ? (task.device.location) : (task.location), startDate: task.startTime, endDate: task.endTime, ...task }));


const getColor = (item) => {
  switch(item.statusId) {
      case 1:
        return "#fc6b5b"
      case 2:
        return "#7eddf7"
      case 3:
        return "#f8ff7d"
      case 4:
        return "#73ff98"
  
  }
}

  const Appointment = ({
    children, style, ...restProps
  }) => (
    <Appointments.Appointment
    {...restProps}
      style={{
        ...style,
        backgroundColor: getColor(children[1].props.data),
        borderRadius: '8px',
      }}
    >
      {children}
    </Appointments.Appointment>
  );


const Content = ({
  children, style, ...restProps
}) => (
  <AppointmentTooltip.Content
  {...restProps}
  >
    {/* <div style={{ padding: 10 }}>
      <div style={{ paddingBottom: 16, letterSpacing: "0.01em"}}>
        <div className="row" style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "1.25rem", fontWeight: 700}}>{restProps.appointmentData.title}</div>
      </div>
      <div className="row" style={{ displey: "flex" }}>
        <div><ScheduleIcon style={{ float: "left", color: "rgba(0, 0, 0, 0.54)", marginLeft: 10}}></ScheduleIcon></div>
        <div style={{ marginLeft: 50, paddingBottom: 16}}>
          <div className="row" style={{ fontSize: "0.875rem" }}>{dayjs(restProps.appointmentData.startDate).format('dddd, MMMM D, YYYY')}</div>
          <div >{dayjs(restProps.appointmentData.startDate).format('h:mm A')} - {dayjs(restProps.appointmentData.endDate).format('h:mm A')}</div>
        </div>
      </div>
        <div>{restProps.appointmentData.description}</div>
    </div> */}
    <div style={{ marginLeft: 30, paddingTop: 10}}>{restProps.appointmentData.description}</div>
    {children}
  </AppointmentTooltip.Content>
);

// const Content = withStyles(style, { name: 'Content' })(({
//   children, appointmentData, classes, ...restProps
// }) => (
//   <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
//     <Grid container alignItems="center">
//       <Grid item xs={2} className={classes.textCenter}>
//         <Room className={classes.icon} />
//       </Grid>
//       <Grid item xs={10}>
//         <span>{appointmentData.location}</span>
//       </Grid>
//     </Grid>
//   </AppointmentTooltip.Content>
// ));

  return (
    <Paper style={{width: "100%"}}>
      <Scheduler
          data={transformedTask}
          height={400}
        >
          <ViewState
            currentDate={currentDate}
            defaultCurrentViewName="Week"
            onCurrentDateChange={currentDateChange}
          />

          <DayView
            startDayHour={8}
            endDayHour={21}
          />
          <WeekView
            startDayHour={8}
            endDayHour={21}
          />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments
            appointmentComponent={Appointment}
          />
          <AppointmentTooltip contentComponent={Content}  showCloseButton />
        </Scheduler>
    </Paper>
  );
}

export default MyScheduler;