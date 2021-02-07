window.onload = function () {
  fetch("http://BACKEND:5000", {
    mode: "cors",
  })
    .then((res) => res.json())
    .then((out) => {
      console.log("Output: ", out);
      document.getElementById("bucket_name").innerHTML += out.bucket_name;
    })
    .catch((err) => console.error(err));
};

const input = document.querySelector("input");
document.getElementById("upload").addEventListener("click", upload);

function upload() {
  const files = input.files;
  if (files.length === 0) {
    alert("No files currently selected for upload");
  } else {
    for (const file of files) {
      fetch("http://BACKEND:5000/upload", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          file_name: file.name,
        }),
      })
        .then((res) => res.json())
        .then((out) => {
          const formData = new FormData();

          Object.keys(out.fields).forEach((key) => {
            formData.append(key, out.fields[key]);
          });

          formData.append("file", file);

          fetch(out.url, {
            mode: "cors",
            method: "POST",
            body: formData,
          }).then((response) => {
            console.log(response);
          });
        })
        .catch((err) => console.error(err));
    }
  }
}
