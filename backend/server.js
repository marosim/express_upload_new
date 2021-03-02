const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 8000;

app.use('/form', express.static(__dirname + '/../frontend/index.html'));

app.use('/js', express.static(__dirname + '/../frontend/js'))

app.use(fileUpload());
app.post('/upload', function (req, res) {
  let sampleFile;
  let uploadPath;
  // console.log(req.files);
  // console.log(req);
  // console.log(req.files);
  // console.log(req.method);
  console.log('req.files >>>', req.files.userfile.name, req.body.username); // eslint-disable-line
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }



  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.userfile;
  uploadPath = __dirname + '/../frontend/upload/' + sampleFile.name;

  //console.log(sampleFile, uploadPath)

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded to ' + uploadPath);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})