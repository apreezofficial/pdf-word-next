import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Load script files dynamically
    const pdfLibScript = document.createElement("script");
    pdfLibScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
    pdfLibScript.async = true;

    const docxScript = document.createElement("script");
    docxScript.src = "https://cdn.jsdelivr.net/npm/docx@7.1.2/build/index.min.js";
    docxScript.async = true;

    const pdfjsScript = document.createElement("script");
    pdfjsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    pdfjsScript.async = true;

    document.body.appendChild(pdfLibScript);
    document.body.appendChild(docxScript);
    document.body.appendChild(pdfjsScript);

    return () => {
      document.body.removeChild(pdfLibScript);
      document.body.removeChild(docxScript);
      document.body.removeChild(pdfjsScript);
    };
  }, []);

  return (
    <>
      <Head>
        <title>AP PDF to Word Converter</title>
        <link rel="stylesheet" href="../globals.css" />
      </Head>
      <div className="container">
        <marquee style={{ color: "black" }}>
          Made with love 💕💕💕 from <a href="https://apcodesphere.vercel.app">Apcodesphere</a>
        </marquee>
        <h1>PDF ~ Word</h1>
        <p>Convert your PDF files to Word documents easily.</p>
        <div className="upload-box" id="uploadBox">
          <input type="file" id="fileInput" accept=".pdf" hidden />
          <label htmlFor="fileInput" className="upload-label">
            <span className="drag-text">Drag & Drop or Click to Upload</span>
            <span className="file-name" id="fileName"></span>
          </label>
        </div>
        <button id="convertBtn" className="btn" disabled>
          Convert to Word
        </button>
        <div className="status" id="status"></div>
        <a id="downloadLink" className="download-link" style={{ display: "none" }}>
          Download Word File
        </a>
      </div>
      <script src="script.js"></script>
    </>
  );
}
