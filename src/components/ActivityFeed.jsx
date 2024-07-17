import React, { useEffect, useState } from 'react';
import { getActivities, updateActivity } from '../services/api'; 
import { Card, CardContent, Typography, Collapse, Button } from '@mui/material'; 
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


// {showArchived} prop passed here call in home and archive page DOESNT WORK
const ActivityFeed = ({filterArchived}) => {
  const [activities, setActivities] = useState([]);
  // set state to track the expanded card
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    getActivities()
      .then(response => {
        console.log('API Response:', response.data); // check the response data
        setActivities(response.data);
         // Sort activities by most recent (descending order)
         const sortedActivities = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
         setActivities(sortedActivities);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to handle card expansion
  const handleCardClick = (activityId) => {
    setExpanded(prevstate => prevstate === activityId ? null : activityId);
  }

  /////////////////////////////////////////////// ARCHIVE LOGIC ///////////////////////////////////////////////

  //Function to handle archive button click
  const handleArchive = (id, isArchived, event) => {
    event.stopPropagation(); // Prevent card expansion when clicking the archive button / bubble up
    updateActivity(id, isArchived).then(() => {
      setActivities(prevActivities => prevActivities.map(activity => 
        activity.id === id ? { ...activity, is_archived: isArchived } : activity
      ));
    }).catch(error => console.error('Error updating activity:', error));
  };

   // Filter activities if filterArchived is defined
   const filteredActivities = filterArchived !== undefined
   ? activities.filter(activity => activity.is_archived === filterArchived)
   : activities;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function display icon on call directions
  const renderDirectionIcon = (direction) => {

    const iconStyle = {
      fontSize: 20, 
    };

    if (direction === 'inbound') {
      return <CallReceivedIcon style={iconStyle}/>; // Display inbound icon
    } else if (direction === 'outbound') {
      return <CallMadeIcon style={iconStyle}/>; // Display outbound icon
    }
    return null;
  };

  // Function display call type
  const renderCallType = (call_type) => {
    if (call_type === 'missed') {
      return <PhoneMissedIcon style={{ color: 'red' }}/>;
    } else if (call_type === 'answered') {
      return <PhoneIcon style={{ color: 'green' }}/>;
    }
  }

  // Function to format time from created_at
  const formatTime = (createdAt) => {
    const time = new Date(createdAt);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  //function to format date from created_at
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  }

  //function render duration of call min and sec
  const renderDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  }

  // function if call out display activity.to else display activity.from
  const renderCallDirection = (activity) => {
    if (activity.direction === 'outbound') {
      return activity.to;
    } else {
      return activity.from
    }
  }



  return (
    <div>
      {/* archive folder icon top right */}
      {/* <h1>Call Logs</h1> */}
      {filteredActivities.length === 0 ? (
        <p>No activities to display.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredActivities.map(activity => (
          <Card 
          key={activity.id} 
          style={{ width: 350, margin: 5 }}
          onClick={() => handleCardClick(activity.id)}>
            <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {renderCallType(activity.call_type)}
                {renderDirectionIcon(activity.direction)}
                <Typography style={{ marginLeft: 8 }}>{renderCallDirection(activity)}</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography>{formatTime(activity.created_at)}</Typography>
              <Button sx={{ minWidth: 0 }} onClick={(event) => handleArchive(activity.id, !activity.is_archived, event)}>
                  {activity.is_archived ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
                </Button>
              </div>
            </CardContent>
            {/* Collapse Card */}
            <Collapse in={expanded === activity.id}>
                <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography>From: {activity.from}</Typography>
                  <Typography>To: {activity.to}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <CalendarMonthIcon style={{ marginRight: 8 }} />
                    <Typography>{formatDate(activity.created_at)}</Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', }}>
                    <AccessTimeFilledIcon style={{ marginRight: 8 }} />
                    <Typography>{renderDuration(activity.duration)}</Typography>
                  </div>
                  </div>
                </CardContent>
              </Collapse>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
};

export default ActivityFeed;

