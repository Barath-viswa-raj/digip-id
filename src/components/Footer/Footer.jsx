import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logo}>
              <strong>Techgium</strong>
            </Link>
            <p className={styles.description}>
              Pioneering the digital frontier with innovation and creativity. 
              We transform ideas into digital reality.
            </p>
          </div>

          <div className={styles.linksSection}>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/digitalization">Digitalization</Link>
          </div>

          <div className={styles.linksSection}>
            <h4>Support</h4>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>

          <div className={styles.linksSection}>
            <h4>Social</h4>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Techgium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
