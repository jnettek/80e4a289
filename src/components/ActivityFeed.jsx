import React, { useEffect, useState } from 'react';
import { getActivities } from '../services/api'; // Adjust the path as needed
import { Card, CardContent, Typography } from '@mui/material'; // Assuming you're using Material-UI
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import { Padding } from '@mui/icons-material';


const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities()
      .then(response => {
        console.log('API Response:', response.data); // Log the API response
        setActivities(response.data);
         // Sort activities by most recent (descending order)
         const sortedActivities = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
         setActivities(sortedActivities);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
      <h1>Call Logs</h1>
      {activities.length === 0 ? (
        <p>No activities to display.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {activities.map(activity => (
            <Card key={activity.id} style={{ width: 350, margin: 5 }}>
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Typography>{renderCallType(activity.call_type)}</Typography>
                <Typography>{renderDirectionIcon(activity.direction)}</Typography>
                <Typography>{renderCallDirection(activity)}</Typography>
                <Typography>{formatTime(activity.created_at)} </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;

