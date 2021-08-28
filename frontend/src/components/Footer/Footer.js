import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <div className="copyright">
          © {new Date().getFullYear()} Group 35
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
