import styles from "./About.module.css";

export default function AIStrategy() {
  return (
    <main className={`${styles.container} animate`}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.tag}>4.0 AI DEEP DIVE</span>
          <h1>Training & <span>Fine-Tuning</span></h1>
          <p className={styles.lead}>
            Solving the &quot;Domain Shift&quot; problem through a strategic, two-phase training process to create a universally effective Master Model.
          </p>
        </div>
      </section>

      {/* STRATEGY */}
      <section className={styles.missionSection}>
        <div className={styles.missionGrid}>
          <div className={styles.missionCard}>
            <h3>Phase 1: Foundational Training</h3>
            <p>Training a specialist model on large, homogenous datasets (Microsoft-style P&IDs) to teach the fundamental visual grammar of industrial symbols.</p>
          </div>
          <div className={styles.missionCard}>
            <h3>Phase 2: Transfer Learning</h3>
            <p>Fine-tuning the Specialist Model on new domains by freezing early layers and retraining later layers to handle diverse drawing styles without &quot;catastrophic forgetting.&quot;</p>
          </div>
        </div>
      </section>

      {/* CORE ALGORITHMS */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionHeader}>
          <h2>4.1 The Domain Shift Problem</h2>
          <p>Overcoming variations in line thickness, symbol proportions, and fonts across different CAD sources.</p>
        </div>
        <div className={styles.valuesGrid}>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>🧠</div>
            <h4>Transfer Learning</h4>
            <p>Leveraging pre-trained weights to adapt to new industrial standards with minimal data.</p>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>🎯</div>
            <h4>Master Model</h4>
            <p>Creating a true generalist capable of detecting symbols across multiple enterprise domains.</p>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>⚡</div>
            <h4>Optimization</h4>
            <p>Using low learning rates and selective layer freezing for robust real-world accuracy.</p>
          </div>
        </div>
      </section>

      {/* FUTURE WORK */}
      <section className={styles.teamSection}>
        <div className={styles.sectionHeader}>
          <h2>6.2 Future Work</h2>
          <p>The roadmap for Project Sentinel evolution.</p>
        </div>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.avatarPlaceholder}>LT</div>
            <h4>Line Classification</h4>
            <span>Semantic Segmentation</span>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.avatarPlaceholder}>HW</div>
            <h4>Handwriting OCR</h4>
            <span>As-Built Analysis</span>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.avatarPlaceholder}>MS</div>
            <h4>Microservices</h4>
            <span>Cloud Deployment</span>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.avatarPlaceholder}>3D</div>
            <h4>3D Generation</h4>
            <span>Digital Twin Creation</span>
          </div>
        </div>
      </section>

      {/* CONCLUSION */}
      <section className={styles.joinCta}>
        <h2>Setting the Standard for Digital Threads</h2>
        <p>Project Sentinel successfully exceeds the ABB Hackathon requirements for industrial digitization.</p>
        <button className={styles.btnPrimary}>Read Full Paper</button>
      </section>
    </main>
  );
}
