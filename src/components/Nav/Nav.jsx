"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <Link href="/" className={`${styles.brand} ${pathname === "/" ? styles.active : ""}`} aria-label="DigiP&ID home">
          <strong>DigiP&ID</strong>
        </Link>

        <div className={styles.links}>
          <Link href="/" className={pathname === "/" ? styles.active : ""}>Home</Link>
          <Link href="/digitalization" className={pathname === "/digitalization" ? styles.active : ""}>Workflow</Link>
          <Link href="/services" className={pathname === "/services" ? styles.active : ""}>Architecture</Link>
          <Link href="/demo" className={pathname === "/demo" ? styles.active : ""}>Live Demo</Link>
          <Link href="/about" className={pathname === "/about" ? styles.active : ""}>AI Strategy</Link>
          <Link href="/contact" className={`${styles.cta} ${pathname === "/contact" ? styles.ctaActive : ""}`}>Links</Link>
        </div>
      </div>
    </nav>
  );
}
