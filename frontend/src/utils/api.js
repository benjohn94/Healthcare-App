import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Get auth config
const getAuthConfig = () => {
  const adminInfo = localStorage.getItem('adminInfo');
  const token = adminInfo ? JSON.parse(adminInfo).token : null;

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

// Staff API
export const staffAPI = {
  getAll: async (params = {}) => {
    const { data } = await axios.get(`${API_URL}/api/staff`, {
      ...getAuthConfig(),
      params,
    });
    return data;
  },

  getById: async (id) => {
    const { data } = await axios.get(`${API_URL}/api/staff/${id}`, getAuthConfig());
    return data;
  },

  create: async (staffData) => {
    const { data } = await axios.post(`${API_URL}/api/staff`, staffData, getAuthConfig());
    return data;
  },

  update: async (id, staffData) => {
    const { data } = await axios.put(`${API_URL}/api/staff/${id}`, staffData, getAuthConfig());
    return data;
  },

  delete: async (id) => {
    const { data } = await axios.delete(`${API_URL}/api/staff/${id}`, getAuthConfig());
    return data;
  },
};

// Shift API
export const shiftAPI = {
  getAll: async (params = {}) => {
    const { data } = await axios.get(`${API_URL}/api/shifts`, {
      ...getAuthConfig(),
      params,
    });
    return data;
  },

  getById: async (id) => {
    const { data } = await axios.get(`${API_URL}/api/shifts/${id}`, getAuthConfig());
    return data;
  },

  create: async (shiftData) => {
    const { data } = await axios.post(`${API_URL}/api/shifts`, shiftData, getAuthConfig());
    return data;
  },

  update: async (id, shiftData) => {
    const { data } = await axios.put(`${API_URL}/api/shifts/${id}`, shiftData, getAuthConfig());
    return data;
  },

  assignStaff: async (id, staffId) => {
    const { data } = await axios.post(`${API_URL}/api/shifts/${id}/assign`, { staffId }, getAuthConfig());
    return data;
  },

  unassignStaff: async (id, staffId) => {
    const { data } = await axios.post(`${API_URL}/api/shifts/${id}/unassign`, { staffId }, getAuthConfig());
    return data;
  },

  delete: async (id) => {
    const { data } = await axios.delete(`${API_URL}/api/shifts/${id}`, getAuthConfig());
    return data;
  },
};

// Attendance API
export const attendanceAPI = {
  getAll: async (params = {}) => {
    const { data } = await axios.get(`${API_URL}/api/attendance`, {
      ...getAuthConfig(),
      params,
    });
    return data;
  },

  getById: async (id) => {
    const { data } = await axios.get(`${API_URL}/api/attendance/${id}`, getAuthConfig());
    return data;
  },

  create: async (attendanceData) => {
    const { data } = await axios.post(`${API_URL}/api/attendance`, attendanceData, getAuthConfig());
    return data;
  },

  update: async (id, attendanceData) => {
    const { data } = await axios.put(`${API_URL}/api/attendance/${id}`, attendanceData, getAuthConfig());
    return data;
  },

  bulkCreate: async (shiftId, attendanceRecords) => {
    const { data } = await axios.post(
      `${API_URL}/api/attendance/bulk`,
      { shiftId, attendanceRecords },
      getAuthConfig()
    );
    return data;
  },

  delete: async (id) => {
    const { data } = await axios.delete(`${API_URL}/api/attendance/${id}`, getAuthConfig());
    return data;
  },
};
