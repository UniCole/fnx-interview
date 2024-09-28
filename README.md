# FNX Backend Developer Test
## Introduction
This project demonstrates interaction with AWS services such as **S3**, **Lambda**, and **API Gateway** using Node.js. The main objectives were:
- Uploading and retrieving files from S3.
- Generating a pre-signed URL for secure access.
- Setting up an API endpoint with AWS API Gateway and Lambda.
- Ensuring the API is not publicly accessible.

## Project Structure
```
fnx-backend-test/
├── data/
│   └── swagger-api.json
├── logger/
│   └── logger.js
├── scripts/
│   ├── uploadFile.js
│   └── getFile.js
├── lambda/
│   └── index.js
├── README.md
└── package.json
```

## Prerequisites
- Node.js (version 14 or higher)
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Git

## Installation
1. Clone the repository:
   ```
    git clone https://github.com/your-username/fnx-backend-test.git
    cd fnx-backend-test
    ```
2. Install dependencies:
   ```
   npm install
   ```

## AWS Configuration:
### IAM Roles and Policies
- Created an IAM Role (`MyS3Role`) with permissions to access S3 operations (`GetObject, PutObject, ListBucket`) on the `fnx-test-bucket`.
- Configured IAM Policies to allow assuming the `MyS3Role`.
### AWS Credentials
- Configured AWS credentials using the AWS CLI:
  ```
  aws configure
  ```

## Scripts
### 1. Upload File to S3
Uploads a JSON file to the S3 bucket.
- **Script:** `scripts/uploadFile.js`
- **Usage:**
  ```
  node scripts/uploadFile.js
  ```
### 2. Retrieve File from S3
Retrieves the JSON file from the S3 bucket.
- **Script:** `scripts/getFile.js`
- **Usage:**
  ```
   node scripts/getFile.js
  ```

## AWS API Gateway and Lambda Setup
### 1. Imported Swagger File to API Gateway
- Imported the `FnxTaskApi-dev-swagger-apigateway.json` file into API Gateway to define the API structure.
### 2. Created and Configured Lambda Function
- **Function Name:** `fnx-post-function`
- **Runtime:** Node.js 14.x
- **Handler Code:** Located in `lambda/index.js`
  ```
  exports.handler = async (event) => {
     console.log('Received event:', JSON.stringify(event, null, 2));

     let requestBody;
     try {
       if (event.body) {
         requestBody = JSON.parse(event.body);
       } else {
         throw new Error('Missing event.body');
       }
     } catch (error) {
       console.error('Error parsing event.body:', error);
       return {
         statusCode: 400,
         body: JSON.stringify({ message: 'Invalid request body' }),
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
  ```
### 3. Linked API Gateway to Lambda
- **Configured Integration:**
   - Set the POST method to use Lambda Proxy Integration.
   - Linked to the `fnx-post-function`.
### 4. Secured the API
- **Enabled IAM Authorization:**
   - Set the API Gateway method to require IAM authentication.
- **Updated IAM Policies:**
   - Ensured only authorized IAM users or roles can invoke the API.
- **Result:** The API is not publicly accessible and requires proper IAM credentials to access.

## Testing the API
- **Using Postman or curl:**
   - Added AWS IAM credentials to authenticate the requests.
   - **Example with curl:**
     ```
     curl -X POST \
        https://{api-id}.execute-api.{region}.amazonaws.com/{stage}/ \
        -H 'Content-Type: application/json' \
        -d '{"name": "John Doe", "email": "johndoe@example.com", "message": "Hello!"}' \
        -H 'Authorization: AWS4-HMAC-SHA256 Credential=YOUR_AWS_ACCESS_KEY_ID/...'
     ```
- **Verified Responses:**
   - Successful requests return a 200 status code with the expected message and data.
   - Invalid requests return appropriate error messages.

## Logging
- **Lambda Logs:**
   - Accessible in AWS CloudWatch under the Lambda function's log group.
   - Used for debugging and monitoring function executions.
- **API Gateway Logs:**
   - Enabled logging in API Gateway stages.
   - Useful for tracing API calls and diagnosing issues.

## Conclusion
Successfully completed the following:
- Uploaded and retrieved files from S3 securely.
- Generated a pre-signed URL for temporary access to S3 objects.
- Set up an AWS API Gateway endpoint linked to a Lambda function.
- Ensured the API is secured and not publicly accessible.
- Tested the API to confirm it behaves as expected.

___

**Thank you for reviewing this project!**
If you have any questions or need further information, please feel free to contact me.




























   

