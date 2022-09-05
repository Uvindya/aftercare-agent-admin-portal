import axios from 'axios';

export default axios.create({
  baseURL: 'http://ec2-34-211-111-37.us-west-2.compute.amazonaws.com:8080/api', //`http://localhost:8080/api/`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
