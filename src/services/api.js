import axios from 'axios';

const BASE_URL = 'https://aircall-backend.onrender.com';

//GET ALL ACTIVITIES
export const getActivities = () => axios.get(`${BASE_URL}/activities`);
//GET ARCHIVES
export const getActivityDetail = (id) => axios.get(`${BASE_URL}/activities/${id}`);
//UPDATE ACTIVITY
export const updateActivity = (id, isArchived) => axios.patch(`${BASE_URL}/activities/${id}`, { is_archived: isArchived });
//RESET ACTIVITIES
export const resetActivities = () => axios.patch(`${BASE_URL}/reset`);

