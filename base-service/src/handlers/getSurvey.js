import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getSurvey(event, context) {
    const { id } = event.pathParameters;
    let survey;

    try {
        const result = await dynamodb.get({
            TableName: process.env.SURVEYS_TABLE_NAME,
            Key: { id },
        }).promise();

        survey = result.Item;
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }

    if (!survey) {
        return {
            statusCode: 404,
            body: JSON.stringify(`Survey with ID ${id} not found!`),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(survey),
    };
}

export const handler = getSurvey;