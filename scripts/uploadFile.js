const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const logger = require('../logger/logger');

// Set up the STS client for assuming an IAM role
const sts = new AWS.STS();

// Define the parameters for assuming the role
const roleParams = {
    RoleArn: 'arn:aws:iam::440413135436:role/MyS3Role', // Replace with your IAM role ARN
    RoleSessionName: 'MyS3UploadSession' // A unique identifier for the session
};

// Assume the role
sts.assumeRole(roleParams, (err, data) => {
    if (err) {
        logger.logError("Error assuming IAM role", err);
        return;
    }

    // Use the temporary credentials
    const s3 = new AWS.S3({
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken
    });

    const uploadFile = () => {
        const filePath = path.join(__dirname, '../data/data.json');

        // Check if file exists before proceeding
        if (!fs.existsSync(filePath)) {
            logger.logError("Error: Local file not found", filePath);
            return;
        }

        const fileContent = fs.readFileSync(filePath);

        const params = {
            Bucket: 'fnx-test-bucket',  // S3 bucket name
            Key: 'data.json', // File name/key to be saved in the bucket
            Body: fileContent,
            ContentType: "application/json"
        };

        // Upload the file to S3 using the temporary credentials
        s3.upload(params, function (err, data) {
            if (err) {
                if (err.code === 'NoSuchBucket') {
                    logger.logError("Error: The specified bucket does not exist", err);
                } else if (err.code === 'AccessDenied') {
                    logger.logError("Error: Access denied to the specified bucket", err);
                } else {
                    logger.logError("Error uploading file", err);
                }
            } else {
                logger.logActivity(`File uploaded successfully at ${data.Location}`);
            }
        });
    };

    // Call the upload function after successfully assuming the role
    uploadFile();
});
