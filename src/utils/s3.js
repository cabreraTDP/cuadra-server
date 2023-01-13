const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mimeTypes = require('mime-types')
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

//Upload directly to S3
const uploading = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, file.fieldname.charAt(0) +  '-' +  Date.now().toString() + "." + mimeTypes.extension(file.mimetype));
      }
    })
  });


  const download = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
  }

  const deleteFileS3 = (fileKey) => {
    const params = {  Bucket: bucketName, Key: fileKey };
    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack);  // error
      else     console.log(data);                 // deleted
    });
  }

  const download2 = async(fileKey) => {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
  }

  const url = await s3.getSignedUrl('getObject', downloadParams);
  return url
  }


  module.exports = {uploading, download, deleteFileS3}