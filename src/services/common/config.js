import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:8080/api/`, // `http://ec2-35-90-155-53.us-west-2.compute.amazonaws.com:8080/api/`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
