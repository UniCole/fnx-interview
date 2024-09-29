exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let requestBody;
    try {
        if (event.body) {
            requestBody = JSON.parse(event.body);
        } else {
            console.error('event.body is undefined');
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid request body: event.body is undefined' }),
            };
        }
    } catch (error) {
        console.error('Error parsing event.body:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid request body: cannot parse JSON' }),
        };
    }


    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'POST request processed successfully',
            data: requestBody,
        }),
    };

    return response;
};
