
const express = require('express');
const axios = require('axios');
const twilio = require('twilio');
const cors = require('cors');

const app = express();

app.use(cors());


const accountSid = 'AC7604d7bd25309ad88633cda52d9c8d88';  
const authToken = 'e958a155cf5456ad874a50987cfd9ab5';    
const client = twilio(accountSid, authToken);

const API_URL = 'https://ipapi.co/json/';

const port = 5000; 

app.get('/send-alert', async (req, res) => {
  try {
    
    const response = await axios.get(API_URL);
    const { latitude, longitude } = response.data;

    if (latitude && longitude) {
      const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      
      const messageDetails = {
        body: `Hey Sannidhi is in Danger . Her Live Location : ${googleMapsLink}`,
        from: '+12185274601',  
        to: '+916363706303'   
      };

      
      await client.messages.create(messageDetails);
      res.status(200).send('Alert sent successfully!');
    } else {
      res.status(400).send('Could not fetch location.');
    }
  } catch (error) {
    console.error('Error fetching location:', error.message);
    res.status(500).send('Error fetching location.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
