import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getSurveys(event, context) {
    let surveys;

    try {
        const result = await dynamodb.scan({
            TableName: process.env.SURVEYS_TABLE_NAME
        }).promise();

        surveys = result.Items;
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(surveys),
    };
}

export const handler = getSurveys;