import { useState, useEffect } from "react";

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
      formData.append('username', document.getElementById('username').value);
      console.log([...formData]);
      fetch(`/upload`,
        {
          method: 'post',
          body: formData
        })
        .then((response) => response.text())
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
      <input type="file" id="userfile" />
      <input type="text" id='username' />
      <button value='Upload!' onClick={handleClickUpload} >Upload</button>
    </div>
  );
}

export default App;
