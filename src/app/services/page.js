import styles from "./Services.module.css";

export default function Architecture() {
  const stack = [
    {
      title: "Python 3.x",
      description: "Core language for AI/ML development, orchestrating OpenCV, PyTorch, and diverse data processing libraries.",
      icon: "🐍"
    },
    {
      title: "YOLOv8",
      description: "Ultralytics single-shot architecture for superior speed and accuracy in real-time symbol detection.",
      icon: "👁️"
    },
    {
      title: "Hybrid OCR",
      description: "Combining DocTR for document layout analysis with Tesseract for high-precision character recognition.",
      icon: "📝"
    },
    {
      title: "OpenCV",
      description: "Advanced image processing and computer vision algorithms like the Hough Transform for connectivity tracing.",
      icon: "⚙️"
    },
    {
      title: "NetworkX",
      description: "Premier graph engine for the creation and manipulation of complex P&ID network structures.",
      icon: "🕸️"
    },
    {
      title: "JSON Output",
      description: "Standardized, machine-readable data serialization for seamless enterprise-wide IT/OT integration.",
      icon: "📦"
    }
  ];

  return (
    <main className={`${styles.container} animate`}>
      <header className={styles.header}>
        <span className={styles.tag}>3.0 SYSTEM ARCHITECTURE</span>
        <h1>Engineered for <span>Performance</span></h1>
        <p className={styles.lead}>A meticulously selected stack of best-in-class open-source technologies for industrial scalability.</p>
      </header>

      <div className={styles.grid}>
        {stack.map((tech, index) => (
          <article key={index} className={styles.card}>
            <div className={styles.icon}>{tech.icon}</div>
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
          </article>
        ))}
      </div>

      <section className={styles.cta}>
        <h2>5.0 Core Algorithms</h2>
        <p>Utilizing cv2.HoughLinesP for finite segment detection and BFS for advanced graph traversal queries.</p>
        <button className={styles.btn}>View Implementation Details</button>
      </section>
    </main>
  );
}
