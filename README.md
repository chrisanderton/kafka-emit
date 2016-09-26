# Kafka Emitter (Producer)

## web Process
- Simple API with a '/push' endpoint
- Accepts POST requests
- Parameter of 'id' containing the string you want to push at the message value to Kafka

## emit Process
- Infinite loop with a random interval
- Posts to the API endpoint
- 1 in 15 chance of POSTing the SPECIAL_VALUE

## Config Variables

SPECIAL_VALUE
  The value you WANT to be submitted to Kafka periodically
  
INTERVAL
  Delay between emitting - ms - multiplies by random number for random interval
  
API_KAFKA_URL
  The URL to POST to - normally https://app_name.herokuapp.com/push
  
KAFKA_URL, KAFKA_TRUSTED_CERT, KAFKA_CLIENT_CERT, KAFKA_CLIENT_CERT_KEY
  Kafka Addon standard config variables