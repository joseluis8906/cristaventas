const mqtt = require('mqtt');

const QoS = 1;
const Topic = "dcp/pedidos";

const ClienteMqtt = mqtt.connect('mqtt://149.56.109.238:1883', {username: 'android', password:  "12345678", will: {topic: Topic, payload: 'Nodejs desconectado accidentalmente', qos: QoS}});

ClienteMqtt.on('connect', function () {
  ClienteMqtt.subscribe(Topic, {qos: QoS});
  ClienteMqtt.publish(Topic, 'Servidor nodejs conectado', {qos: QoS}, function(err){
    if(err)
    {
      console.log(err);
    }
  });
});

ClienteMqtt.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});

function Publish (Message)
{
   ClienteMqtt.publish(Topic, JSON.stringify(Message), {qos: QoS}, function(err){
     console.log(err);
   });
}

function IsConnected ()
{
  return ClienteMqtt.connected;
}

function Close()
{
  ClienteMqtt.end();
}

module.exports = {Publish: Publish, IsConnected: IsConnected, Close: Close};
