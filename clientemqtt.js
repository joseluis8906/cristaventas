const mqtt = require('mqtt');
const ClienteMqtt = mqtt.connect('mqtt://149.56.109.238:1883', {username: 'android', password:  "12345678", will: {topic: 'dcp/pedidos', payload: 'error en nodejs'}});

ClienteMqtt.on('connect', function () {
  ClienteMqtt.subscribe('dcp/pedidos');
  ClienteMqtt.publish('dcp/pedidos', 'Servidor nodejs conectado por mqtt');
})

ClienteMqtt.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
})

function Publish (Message)
{
   ClienteMqtt.publish('dcp/pedidos', JSON.stringify(Message), {qos: 0}, function(err){
     console.log(err);
     ClienteMqtt.rec
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
