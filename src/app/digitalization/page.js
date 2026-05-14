import styles from "./Digitalization.module.css";

export default function Workflow() {
  const stages = [
    {
      id: "01",
      title: "The Foundation Layer: Pre-processing",
      description: "Standardizing input via angular de-skewing, denoising algorithms, and adaptive thresholding to create a pristine binary image for AI analysis."
    },
    {
      id: "02",
      title: "The Cognition Layer: Symbol Detection",
      description: "Custom-trained YOLOv8 Master model performs a single-pass inference to classify symbols (valves, pumps, etc.) and map their precise pixel coordinates."
    },
    {
      id: "03",
      title: "The Cognition Layer: Text Extraction",
      description: "A dual-engine OCR strategy using DocTR for layout analysis and Tesseract for character recognition to extract unique identifiers and tags."
    },
    {
      id: "04",
      title: "The Mapping Layer: Connectivity Tracing",
      description: "Skeletonization and Progressive Probabilistic Hough Transform detect straight-line segments (pipelines/signals) to identify component connections."
    },
    {
      id: "05",
      title: "The Intelligence Layer: Graph Assembly",
      description: "Synthesizing extracted data into a cohesive digital graph using NetworkX. Symbols become nodes, and pipelines become edges based on P&ID topology."
    },
    {
      id: "06",
      title: "The Integration Layer: Output Generation",
      description: "Graph serialization into machine-readable JSON files and generation of validation images for enterprise system integration."
    }
  ];

  return (
    <main className={`${styles.container} animate`}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.tag}>2.0 THE DIGITIZATION WORKFLOW</span>
          <h1>From Image to <span>Intelligence</span></h1>
          <p className={styles.lead}>
            A sequential, high-precision pipeline transforming unstructured pixels into structured engineering knowledge.
          </p>
        </div>
      </section>

      {/* ENHANCED WORKFLOW PATH */}
      <section className={styles.workflowPathSection}>
        <div className={styles.pathLine}></div>
        <div className={styles.stagesList}>
          {stages.map((stage, index) => (
            <div key={stage.id} className={`${styles.stageItem} ${index % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.stageContent}>
                <div className={styles.stageNumber}>STAGE {stage.id}</div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
              <div className={styles.dot}></div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>End-to-End Automation</h2>
        <p>Our system systematically solves the digital dead-end problem of static diagrams.</p>
        <button className={styles.btnLarge}>Explore Technical Deep Dive</button>
      </section>
    </main>
  );
}
