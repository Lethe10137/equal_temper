// src/components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const GITHUB_URL = "https://github.com/Lethe10137/equal_temper";
  const LICENSE_URL = GITHUB_URL + "/blob/main/LICENSE";

  // 极简内联样式（您可以改为 CSS Modules）
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "15px 0",
    marginTop: "auto", // 帮助页脚粘在页面底部
    borderTop: "1px solid #ddd",
    color: "#666",
    fontSize: "0.9rem",
    width: "100%",
  };

  return (
    <footer style={footerStyle}>
      <p>
        &copy; {currentYear} Tsinghua University Chinese Orchestra. This work is
        **Copyleft**. <br />
        Licensed under the
        <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">
          GNU General Public License (GPL)
        </a>
        .
      </p>
      <p>
        This project is open source and available on the
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub Repository
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
