const { json } = require('express');
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();
const port = 8000;



// app.use('/form', express.static(__dirname + '/../frontend/index.html'));

// app.use('/js', express.static(__dirname + '/../frontend/js'))
app.get("/", function (req, res) {
  res.send("hello");
})

app.use(fileUpload());
app.post('/upload', function (req, res) {
  let sampleFile;
  let uploadPath;
// console.log(req.body.userdata)

const data = JSON.parse(req.body.userdata);
console.log(data);

if (!req.files || Object.keys(req.files.userfile).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // itt méág vizsgálni kell, hogy a fájl fel van-e töltve!!!! -- szerintem fel van

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.userfile;
  uploadPath = __dirname + '/../frontend/public/upload/' + sampleFile.name;

  const fileName = data.useremail.toString().replace('@', '_').replace('.', '_') + '.txt';
  console.log(fileName);

  
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err)
    return res.status(500).send(err);
    
    // res.send('File uploaded to ' + uploadPath);
    res.send(req.body.userdata)
  });
  
  //file tárolás 
  data.uploadPath = uploadPath;
  fs.appendFile( __dirname + '/../frontend/public/upload/' + fileName, JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('Saved!');
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

