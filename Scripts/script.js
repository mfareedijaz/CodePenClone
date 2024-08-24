const untitled = document.getElementById("untitled");
const untitledInput = document.getElementById("untitledInput");
const editTitleButton = document.querySelector(".editButton");

const htmlCode = document.getElementById("htmlContent");
const cssCode = document.getElementById("cssContent");
const jsCode = document.getElementById("jsContent");
const outputContent = document.getElementById("outputContent");
const saveButton = document.getElementById("saveButton");

let timerId;

editTitleButton.addEventListener("click", () => {
  untitled.style.display = "none";
  untitledInput.style.display = "block";
  untitledInput.focus();

  untitledInput.removeEventListener("keypress", handleKeyPress);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (untitledInput.value === "") {
        untitled.textContent = "Untitled";
        untitled.style.display = "block";
        untitledInput.style.display = "none";
      } else {
        untitled.textContent = untitledInput.value;
        untitled.style.display = "block";
        untitledInput.style.display = "none";
      }
    }
  }

  untitledInput.addEventListener("keypress", handleKeyPress);
});

const handleOutput = (event) => {
  if (
    event.target.id === "htmlContent" ||
    event.target.id === "cssContent" ||
    event.target.id === "jsContent"
  ) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      outputContent.contentWindow.document.open();
      outputContent.contentWindow.document.writeln(
        `${htmlCode.value}
        <style>${cssCode.value}</style>
        <script type="module">${jsCode.value}<\/script>`
      );
      outputContent.contentWindow.document.close();
    }, 3000);
  }
};

document.addEventListener("input", handleOutput);

saveButton.addEventListener("click", () => {
  const editorsContent = [
    {
      fileName: "html",
      value: htmlCode.value,
    },
    {
      fileName: "css",
      value: cssCode.value,
    },
    {
      fileName: "js",
      value: jsCode.value,
    },
  ];
  editorsContent.forEach((file) => {
    let blob = new Blob([`${file.value}`], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${untitled.textContent}-${file.fileName}.txt`);
  });
});