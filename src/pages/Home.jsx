import React from 'react';
import ActivityFeed from '../components/ActivityFeed.jsx';

const Home = () => {
  return (
    <div>
      {/* Display all activities with options to archive or unarchive. */}
      <ActivityFeed />
    </div>
  );
};

export default Home;
