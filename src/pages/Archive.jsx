import React from 'react';
import ActivityFeed from '../components/ActivityFeed.jsx';

const archive = () => {
  return (
    <div>
        <h1>Archive</h1>
        {/* Display only archived activities with options to unarchive. */}
      {/* <ActivityFeed showArchived={true} /> */}
      <ActivityFeed filterArchived={true} />
    </div>
  );
};

export default archive;
