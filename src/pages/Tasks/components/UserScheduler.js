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
import DescriptionIcon from '@material-ui/icons/Description';
import Alert from '@material-ui/lab/Alert';


function UserScheduler({ tasks }) {
  const [currentDate, currentDateChange] = useState(new Date())
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    tasks.length!=0 ? setShowAlert(false) : setShowAlert(true);
  }, [tasks])

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
    <div style={{ marginLeft: 20, paddingTop: 10}}>
      <DescriptionIcon style={{ float: "left", marginRight: 20, color: "rgba(0, 0, 0, 0.54)"}}></DescriptionIcon>
      <div>{restProps.appointmentData.description}</div>
    </div>
    {children}
  </AppointmentTooltip.Content>
);

  return (
    <Paper>
      {
        showAlert ? <Alert severity="warning">The user has no tasks defined!</Alert> : null
      }
      <Scheduler
          data={transformedTask}
          height={400}
        >
          <ViewState
            currentDate={currentDate}
            defaultCurrentViewName="Day"
            onCurrentDateChange={currentDateChange}
          />

          <DayView
            startDayHour={8}
            endDayHour={22}
          />
          <WeekView
            startDayHour={8}
            endDayHour={22}
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

export default UserScheduler;