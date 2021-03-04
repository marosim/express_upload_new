import { useState, useEffect } from "react";
import './style.css';

function App() {
  const [upload, setUpload] = useState(false);

  const handleClickUpload = (e) => {
    setUpload(true);
  }

  useEffect(() => {
    if (upload) {
      setUpload(false);
      console.log("start upload");

      const formData = new FormData();
       formData.append('userfile', document.getElementById('userfile').files[0]);
      // formData.append('username', document.getElementById('username').value);
      // formData.append('useremail', document.getElementById('useremail').value);
      // formData.append('useraddress', document.getElementById('useraddress').value);
      // formData.append('usercity', document.getElementById('usercity').value);
      // formData.append('userpostcode', document.getElementById('userpostcode').value);


      let toJson = {};
      let ls = document.querySelectorAll(".toJson");
      
      for (const l of ls) {
        toJson[`${l.getAttribute('id')}`] = l.value;
      }
      console.log(toJson);
      formData.append('userdata', JSON.stringify(toJson));
      
      fetch(`/upload`,
        {
          method: 'post',
          body: formData
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("data: ", data);
        })
        .catch((error) => {
          console.log('error: ', error);
        });

    }
  }, [upload])

  return (
    <div className="App">
      <input type="text" className="toJson" id='username' placeholder="Name"/>
      <input type="email" className="toJson" id='useremail' placeholder="Email" />
      <input type="text" className="toJson" id='usercity' placeholder="City"/>
      <input type="number" className="toJson" id='userpostcode' placeholder="Postcode" />
      <input type="text" className="toJson" id='useraddress' placeholder="Address"/>
      <input type="file" id='userfile' />
      <button value='Upload!' onClick={handleClickUpload} >Upload</button>
    </div>
  );
}

export default App;
