const { PutObjectCommand, GetObjectCommand, ListObjectsV2Command, S3Client } = require("@aws-sdk/client-s3");
// is there a GetOgjectCommand in aws sdk?? 

function currentDate() {
    const current = new Date();
    const date = `${current.getMonth() + 1}-${current.getDate()}-${current.getFullYear()}`;
    return date;
}

async function putSVG(req, res) {
    userId = req.body.userId
    svgInfo = req.body.svgInfo

    const s3Client = new S3Client({                   // instance of aws s3 client (allows us to interact w/ bucket)
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY
        }
    });

    const bucketName = `mysvgfiles`
    try {
        await s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: `${currentDate()}/${userId}.svg`, // will create ending of the object url - include userid
            Body: svgInfo, //put the svg file from the browser 
        }));
        res.status(200).send(`object created`)
    }
    catch (error) {
        console.log(error)
    }
}

// async function like above
const getObjects = async (req, res) => {

    const client = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY
        }
    });

    const command = new ListObjectsV2Command({
        Bucket: "mysvgfiles",
        // The default and maximum number of keys returned is 1000. This limits it to
        // one for demonstration purposes.
        MaxKeys: 100,
    });

    try {
        let isTruncated = true;

        console.log("Your bucket contains the following objects:\n");
        let contents = [];

        while (isTruncated) {
            const { Contents, IsTruncated, NextContinuationToken } =
                await client.send(command);
            const contentsList = Contents.map((c) => `${c.Key}`);
            contents = [...contents, ...contentsList]
            isTruncated = IsTruncated;
            command.input.ContinuationToken = NextContinuationToken;
        }
        res.status(200).send(contents)
        //   console.log(contents);
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    putSVG,
    getObjects
}