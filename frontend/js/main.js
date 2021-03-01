function start() {
  document.getElementById('upload').addEventListener('submit', handleClick);

  function handleClick(e) {
    e.preventDefault();
    console.log('click ', e.target.sampleFile.files[0])

    const formData = new FormData();
    formData.append('files', e.target.sampleFile.files[0]);

    fetch(`http://localhost:8000/upload`,
      {
        method: 'post',
        body: formData
      })
      .then((response) => {
        response.text();
      })
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }
}

window.addEventListener("load", start);