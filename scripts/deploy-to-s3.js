var s3 = require("s3");
require("dotenv").config();

var client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

var params = {
  localDir: "dist/",
  deleteRemoved: true,

  s3Params: {
    Bucket: process.env.AWS_BUCKET,
    Prefix: process.env.AWS_PATH,
    ACL: "public-read"
  }
};

var uploader = client.uploadDir(params);
uploader.on("error", function(err) {
  console.error("unable to sync:", err.stack);
});
uploader.on("progress", function() {
  process.stdout.write(
    "Progress " +
      uploader.progressAmount +
      " of " +
      uploader.progressTotal +
      "\r"
  );
});
uploader.on("end", function() {
  console.log("\ndone uploading");
});
