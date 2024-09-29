const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const logger = require('../logger/logger');

const sts = new AWS.STS();

const roleParams = {
    RoleArn: 'arn:aws:iam::440413135436:role/MyS3Role', 
    RoleSessionName: 'MyS3UploadSession' 
};

sts.assumeRole(roleParams, (err, data) => {
    if (err) {
        logger.logError("Error assuming IAM role", err);
        return;
    }

    const s3 = new AWS.S3({
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken
    });

    const uploadFile = () => {
        const filePath = path.join(__dirname, '../data/swagger-api.json');
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

    uploadFile();
});
