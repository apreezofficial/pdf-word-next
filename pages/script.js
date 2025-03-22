// public/script.js
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const uploadBox = document.getElementById("uploadBox");
  const fileName = document.getElementById("fileName");
  const convertBtn = document.getElementById("convertBtn");
  const statusText = document.getElementById("status");
  const downloadLink = document.getElementById("downloadLink");

  let selectedFile = null;

  fileInput.addEventListener("change", (e) => {
    handleFile(e.target.files[0]);
  });

  uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = "#007bff";
  });

  uploadBox.addEventListener("dragleave", () => {
    uploadBox.style.borderColor = "#ccc";
  });

  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = "#ccc";
    handleFile(e.dataTransfer.files[0]);
  });

  function handleFile(file) {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      fileInput.value = "";
      convertBtn.disabled = true;
      return;
    }

    selectedFile = file;
    fileName.textContent = file.name;
    convertBtn.disabled = false;
    statusText.textContent = "";
    downloadLink.style.display = "none";
  }

  convertBtn.addEventListener("click", async () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first.");
      return;
    }

    convertBtn.disabled = true;
    statusText.textContent = "Converting...";

    try {
      const reader = new FileReader();
      reader.onload = async function (event) {
        const pdfData = new Uint8Array(event.target.result);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map((item) => item.str).join(" ") + "\n\n";
        }

        const doc = new docx.Document({
          sections: [{ properties: {}, children: [new docx.Paragraph({ text: extractedText })] }],
        });

        const docBlob = await docx.Packer.toBlob(doc);
        const docUrl = URL.createObjectURL(docBlob);

        downloadLink.href = docUrl;
        downloadLink.download = selectedFile.name.replace(".pdf", ".docx");
        downloadLink.style.display = "inline-block";

        statusText.textContent = "Conversion complete!";
        convertBtn.disabled = false;
      };

      reader.readAsArrayBuffer(selectedFile);
    } catch (error) {
      console.error("Conversion failed:", error);
      statusText.textContent = "Conversion failed. Please try again.";
      convertBtn.disabled = false;
    }
  });
});
