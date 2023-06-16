import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

exports.handler = async function (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.log('request:', JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { 'Content-Type': '*/*' },
    body: `Hello, 1CDK! You've hit ${event.path}\n`,
  };
};
