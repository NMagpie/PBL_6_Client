import { w3cwebsocket as W3CWebSocket } from "websocket";

import axios from "axios";

export const protocol = "HTTP"; // WS | HTTP

export const host = "192.168.1.121:8000"; //anywhere your server is located. Default is: pbl6-iot-server-api.herokuapp.com

var client;

switch (protocol) {
    case "WS":

        function connect() {
          client = new W3CWebSocket(`ws://${host}`);
        }
        
        connect();
        
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        
        client.onerror = (error) => {
          console.log(error.message);
        };
        
        client.onclose = function(e) {
          console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
          setTimeout(function() {
            connect();
          }, 1000);
        };

        client.onmessage = (message) => {

            const dataFromServer = JSON.parse(message.data);
      
            if (setTrolleys)
                setTrolleys(dataFromServer);

        };

        break;

    case "HTTP":
    default:

    client = {};

    client.send = (data) => {
      const parsedData = JSON.parse(data);

      const number = (parsedData.number) ? parsedData.number : null;

      if (number)
        httpRequest = setInterval(() => {
          axios.get(`http://${host}/routes/${number}`, {
            headers: {
              Accept: 'application/json',
            }
          })
          .then(response => {
            if (response.status === 200)
              return response.data;
          })
          .then(trolleyArray => {
            var transformedTrolleys = [];
            trolleyArray.map((trolley) => {
              transformedTrolleys.push({
              number: number,
              id: trolley.route_id,
              flow: trolley.nr_people,
              position: {
                latitude: parseFloat(trolley.curr_position_lat),
                longitude: parseFloat(trolley.curr_position_long),
              },
            });
          });

            if (setTrolleys)
              setTrolleys(transformedTrolleys);

          })
          .catch(error => console.log(JSON.stringify(error)));
        },1000);
      else
        if (httpRequest)
          clearInterval(httpRequest);
    };
}

var httpRequest = () => {};

var setTrolleys = () => {};

export function setSetter(setter) {

  setTrolleys = setter;

};

export function resetTrolleys() {
    if (setTrolleys) {
        client.send(JSON.stringify({ type: "Done", }));
        setTrolleys([]);
    }
  };

export function sendMessage(data) {
        client.send(data);
}