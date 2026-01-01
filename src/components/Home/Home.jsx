import styles from "./Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={`${styles.container} animate`}>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroLeft}>
          <div className={styles.glassCard}>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot}></span>
              SYSTEM OPERATIONAL
            </div>
            <span className={styles.tag}>PROJECT SENTINEL</span>
            <h1 id="hero-title">
              DigiP&ID: <br /> <span>From static P&ID to machine-ready JSON.</span>
            </h1>
            <p className={styles.lead}>
              Revolutionizing Industrial Intelligence by transmuting visual engineering language into logical, machine-readable digital process graphs.
            </p>
            <div className={styles.actions}>
              <a href="#github" className={styles.btn}>Github Code</a>
              <a href="#demo" className={`${styles.btn} ${styles.btnOutline}`}>Live Demo</a>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/images/home-image.jpg"
              alt="Industrial Process Diagram Analysis"
              fill
              className={styles.heroImage}
              priority
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className={styles.servicesSection}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionTag}>1.0 EXECUTIVE SUMMARY</span>
          <h2>The Industrial Challenge</h2>
          <p>Critical engineering knowledge remains trapped in unstructured, static Process & Instrumentation Diagrams (P&IDs).</p>
        </header>

        <div className={styles.servicesGrid}>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3>The Problem</h3>
            <p>Scanned PDFs and images represent a &quot;digital dead end,&quot; acting as a barrier to true digital transformation and operational intelligence.</p>
          </article>

          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Our Solution</h3>
            <p>Project Sentinel is an AI-powered engine that ingests P&ID images and transmutes them into a structured, intelligent digital process graph.</p>
          </article>

          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3>Core Innovation</h3>
            <p>A custom-trained YOLOv8 &quot;Master&quot; AI model achieving exceptional accuracy in symbol detection across varied drawing styles.</p>
          </article>
        </div>
      </section>

      {/* KEY CAPABILITIES */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContent}>
          <span className={styles.sectionTag}>2.0 KEY CAPABILITIES</span>
          <h2>Engineered for Precision</h2>
          
          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featurePoint}>01</div>
              <div className={styles.featureText}>
                <h4>Neural Symbol Detection</h4>
                <p>Advanced computer vision identifying pumps, valves, and instruments with high confidence scores.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featurePoint}>02</div>
              <div className={styles.featureText}>
                <h4>Topological Graph Assembly</h4>
                <p>Context-aware line tracing that reconstructs the logical connections between physical assets.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featurePoint}>03</div>
              <div className={styles.featureText}>
                <h4>OCR Label Association</h4>
                <p>Optical Character Recognition to extract tag numbers and technical specifications from the drawing.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featurePoint}>04</div>
              <div className={styles.featureText}>
                <h4>CFIHOS Aligned JSON</h4>
                <p>Standardized data export ready for direct ingestion into Asset Management systems.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.featuresVisual}>
          <div className={styles.codeWindow}>
            <div className={styles.codeHeader}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <span>output.json</span>
            </div>
            <pre className={styles.codeContent}>
              <code>{`{
  "project": "Sentinel",
  "assets": [
    {
      "id": "VLV-001",
      "type": "Ball Valve",
      "status": "Detected",
      "coordinates": [452, 128]
    },
    {
      "id": "PMP-102",
      "type": "Centrifugal",
      "connections": ["VLV-001"]
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>YOLOv8</span>
          <span className={styles.statLabel}>Core Engine</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>98.4%</span>
          <span className={styles.statLabel}>Symbol mAP</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>JSON</span>
          <span className={styles.statLabel}>Interoperable</span>
        </div>
      </section>

      {/* CONCLUSION */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to unlock latent industrial value?</h2>
          <p>Project Sentinel meets and exceeds the requirements of the ABB Hackathon challenge.</p>
          <button className={styles.btn}>Download Project Specs</button>
        </div>
      </section>
    </main>
  );
}
