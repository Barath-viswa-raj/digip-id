"use client";

import { useState, useEffect } from "react";
import styles from "./Demo.module.css";

export default function Demo() {
  const [status, setStatus] = useState("idle"); // idle, uploading, processing, completed
  const [progress, setProgress] = useState(0);

  const handleStartDemo = () => {
    setStatus("uploading");
    setProgress(0);
  };

  useEffect(() => {
    if (status === "uploading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("processing");
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }

    if (status === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 200) { // Using 0-200 to represent two stages
            clearInterval(interval);
            setStatus("completed");
            return 200;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <main className={`${styles.container} animate`}>
      <header className={styles.header}>
        <span className={styles.tag}>INTERACTIVE DEMO</span>
        <h1>Experience <span>Project Sentinel</span></h1>
        <p className={styles.lead}>
          Simulate the end-to-end transformation from a static P&ID image to a structured digital graph.
        </p>
      </header>

      <div className={styles.demoBox}>
        {status === "idle" && (
          <div className={styles.uploadArea} onClick={handleStartDemo}>
            <div className={styles.uploadIcon}>📁</div>
            <h3>Upload P&ID Diagram</h3>
            <p>Drag and drop or click to select a scanned PDF or image</p>
            <button className={styles.startBtn}>Start Simulation</button>
          </div>
        )}

        {(status === "uploading" || status === "processing") && (
          <div className={styles.processingArea}>
            <div className={styles.loader}>
              <div className={styles.loaderInner} style={{ width: `${(progress / 200) * 100}%` }}></div>
            </div>
            <h3>{status === "uploading" ? "Uploading Diagram..." : "AI Engine Processing..."}</h3>
            <div className={styles.steps}>
              <div className={`${styles.step} ${progress > 20 ? styles.active : ""}`}>De-skewing</div>
              <div className={`${styles.step} ${progress > 60 ? styles.active : ""}`}>Symbol Detection</div>
              <div className={`${styles.step} ${progress > 100 ? styles.active : ""}`}>OCR Extraction</div>
              <div className={`${styles.step} ${progress > 150 ? styles.active : ""}`}>Graph Assembly</div>
            </div>
          </div>
        )}

        {status === "completed" && (
          <div className={styles.resultArea}>
            <div className={styles.resultHeader}>
              <div className={styles.badge}>SUCCESS</div>
              <h3>Digitization Complete</h3>
            </div>
            <div className={styles.resultGrid}>
              <div className={styles.resultCard}>
                <h4>Extracted JSON</h4>
                <pre className={styles.codeBlock}>
{`{
  "project": "Sentinel_Alpha",
  "nodes": [
    {"id": "V-101", "type": "Gate Valve"},
    {"id": "P-202", "type": "Centrifugal Pump"},
    {"id": "TK-500", "type": "Storage Tank"}
  ],
  "edges": [
    {"source": "TK-500", "target": "V-101"},
    {"source": "V-101", "target": "P-202"}
  ]
}`}
                </pre>
              </div>
              <div className={styles.resultCard}>
                <h4>Visual Graph</h4>
                <div className={styles.mockGraph}>
                  <div className={styles.node} style={{top: '20%', left: '20%'}}>TK-500</div>
                  <div className={styles.line} style={{top: '35%', left: '35%', width: '50px', transform: 'rotate(45deg)'}}></div>
                  <div className={styles.node} style={{top: '50%', left: '50%'}}>V-101</div>
                  <div className={styles.line} style={{top: '65%', left: '65%', width: '50px', transform: 'rotate(45deg)'}}></div>
                  <div className={styles.node} style={{top: '80%', left: '80%'}}>P-202</div>
                </div>
              </div>
            </div>
            <button className={styles.resetBtn} onClick={() => setStatus("idle")}>Upload New Diagram</button>
          </div>
        )}
      </div>

      <section className={styles.info}>
        <div className={styles.infoCard}>
          <h4>Real-time Validation</h4>
          <p>Our pipeline provides immediate visual confirmation of detected symbols and connectivity.</p>
        </div>
        <div className={styles.infoCard}>
          <h4>Standardized Output</h4>
          <p>Export results directly to industry-standard formats for IT/OT integration.</p>
        </div>
      </section>
    </main>
  );
}
