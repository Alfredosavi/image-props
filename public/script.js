const { ipcRenderer } = require("electron");

document.querySelector("form").addEventListener("submit", (e) => {
  event.preventDefault();
  // debugger;
  const { path } = document.querySelector("input").files[0];

  ipcRenderer.send("dimensoes", path);
});

ipcRenderer.on("dimensoesImage", (event, dimensions) => {
  const { height, width } = dimensions;
  document.querySelector("#result-W").innerHTML = `${width}px`;
  document.querySelector("#result-H").innerHTML = `${height}px`;
});

function ResultDisplay() {
  document.getElementById("result").style.display = "flex";
}
