# Backend Developer Test



## Exercise 1: Uploading and Fetching Files from S3

### Goal:
Upload a JSON file to an S3 bucket and retrieve its content using JavaScript.

### Task:
1. **Upload Script**: Write a script in JavaScript to upload a JSON file to an S3 bucket.
2. **Fetch Script**: Write a second script to fetch and display the content of the uploaded file.

### work done:
1. Created an s3 bucket.
2. Created a github repo to store the code.
3. Installed dependencies and created an upload script and a sample JSON file.
4. Created an AWS user, role and polices to assume it.
5. Created a Get sctript for the uploaded file.

___

## Exercise 2: Uploading Swagger to S3 and Importing to API Gateway

### Goal:
Upload a Swagger file to S3, import it into API Gateway, and create a POST method.

### Task:
1. **Create a Swagger Specification File**: Draft a Swagger file that defines the API specification.
2. **Upload Swagger to S3**: Upload the Swagger file to an S3 bucket.
3. **Import Swagger to API Gateway**: Import the Swagger definition into API Gateway.
4. **Create a Lambda Function**: Develop a Lambda function that processes API Gateway POST requests.

### work done:
1. Created a Swagger file configuration for the API gateway with Swagger Editor.
2. Uploaded the Swagger configuration file to S3 using the script from exercise 1.
3. Imported the Swagger configuration into API Gateway from S3.
4. Created a Lambda function to process POST requests coming through API Gateway.
5. Linked API Gateway POST Method to Lambda Function.
6. Deployed the API in API Gateway and tested the POST method by sending requests via Postman. (Postman collection file is attached in the repo).

___













   

