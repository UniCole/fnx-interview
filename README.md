# FNX Backend Developer Test
## Introduction
This project demonstrates interaction with AWS services such as **S3**, **Lambda**, and **API Gateway** using Node.js. The main objectives were:
- Uploading and retrieving files from S3.
- Generating a pre-signed URL for secure access.
- Setting up an API endpoint with AWS API Gateway and Lambda.
- Ensuring the API is not publicly accessible.

## Project Structure
fnx-backend-test/
├── data/
│   └── FnxTaskApi-dev-swagger-apigateway.json
├── logger/
│   └── logger.js
├── scripts/
│   ├── uploadFile.js
│   ├── getFile.js
│   └── generateSignedUrl.js
├── lambda/
│   └── index.js
├── README.md
└── package.json


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





   

