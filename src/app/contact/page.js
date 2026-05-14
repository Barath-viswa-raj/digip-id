import styles from "./Contact.module.css";

export default function Links() {
  return (
    <main className={`${styles.container} animate`}>
      <header className={styles.header}>
        <span className={styles.tag}>PROJECT LINKS</span>
        <h1>Explore the <span>Project Sentinel</span></h1>
        <p className={styles.lead}>Access the code, presentation, and live demonstration of our P&ID digitization engine.</p>
      </header>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <h4>GitHub Repository</h4>
            <p><a href="#github" className={styles.link}>Access the Codebase</a></p>
          </div>
          <div className={styles.infoItem}>
            <h4>Presentation</h4>
            <p><a href="#canva" className={styles.link}>View on Canva</a></p>
          </div>
          <div className={styles.infoItem}>
            <h4>Live Demo</h4>
            <p><a href="#youtube" className={styles.link}>Watch on YouTube</a></p>
          </div>
        </div>

        <div className={styles.form}>
           <h3>Submit an Inquiry</h3>
           <p style={{marginBottom: '24px', color: 'rgba(255,255,255,0.6)'}}>Interested in integrating Project Sentinel into your enterprise? Send us a message.</p>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="your@email.com" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Tell us about your requirements"></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>Send Message</button>
        </div>
      </div>
    </main>
  );
}
