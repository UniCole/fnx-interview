const AWS = require('aws-sdk');
const logger = require('../logger/logger');

const sts = new AWS.STS();

const roleParams = {
    RoleArn: 'arn:aws:iam::440413135436:role/MyS3Role', 
    RoleSessionName: 'MyS3DownloadSession' 
};

sts.assumeRole(roleParams, async (err, data) => {
    if (err) {
        logger.logError("Error assuming IAM role", err);
        return;
    }

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

    getFile();
});

