import { v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createSurvey(event, context) {
  const body = JSON.parse(event.body);
  const now = new Date();
  const endDate = new Date();
  endDate.setDate(now.getDate() + 10);

  let survey = {
    id: uuid(),
    ...body,
    createdAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    status: 'OPEN'
  };

  try {
    await dynamodb.put({
      TableName: process.env.SURVEYS_TABLE_NAME,
      Item: survey
    }).promise();


  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify(survey),
  };
}

export const handler = createSurvey;


