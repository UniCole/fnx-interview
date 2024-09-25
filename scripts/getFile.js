const AWS = require('aws-sdk');
const logger = require('../logger/logger');

// STS client for assuming the role
const sts = new AWS.STS();

const roleParams = {
    RoleArn: 'arn:aws:iam::440413135436:role/MyS3Role', // Your IAM role ARN
    RoleSessionName: 'MyS3DownloadSession' // A unique session name for tracking
};

// Assume the role
sts.assumeRole(roleParams, async (err, data) => {
    if (err) {
        logger.logError("Error assuming IAM role", err);
        return;
    }

    // Use the temporary credentials to create an S3 client
    const s3 = new AWS.S3({
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken
    });

    const getFile = async () => {
        const params = {
            Bucket: 'fnx-test-bucket', // S3 bucket name
            Key: 'data.json' // File name/key in the bucket
        };

        try {
            // Fetch file content
            const data = await s3.getObject(params).promise();
            const fileContent = data.Body.toString('utf-8');
            logger.logActivity("File content fetched successfully");
            console.log("File content:", fileContent);
        } catch (err) {
            if (err.code === 'NoSuchKey') {
                logger.logError("Error: File not found in S3 bucket", err);
            } else if (err.code === 'NoSuchBucket') {
                logger.logError("Error: Bucket not found", err);
            } else {
                logger.logError("Error fetching file", err);
            }
        }
    };

    // Call the function to fetch the file
    getFile();
});

