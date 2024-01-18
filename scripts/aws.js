const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");


async function putSVG(req, res) {
    let userid = req.body.userid

    const s3Client = new S3Client({
        region: "us-east-2", 
        credentials: {
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY
        }
    }); // instance of aws s3 client (allows us to interact w/ bucket)

    const bucketName = `mysvgfiles`
    try{
        await s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: `${userid}`, // will create ending of the object url - 
            Body: "Hello JavaScript SDK!", //put the svg file from the browser 
        }));
        res.status(200).send(`object created`)
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    putSVG
}