import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sep"></div>
      <div className="footer-content">
        <p>Copyright &copy; 2023 All Rights reserved.</p>
        <p>
          <a target="_blank" rel="noreferrer" href="https://westworld.fandom.com/wiki/Incite_Inc.">
            AN INCITE COMPANY &trade;
          </a>
          |
          <a target="_blank" rel="noreferrer" href="https://westworld.fandom.com/wiki/Delos_Incorporated">
            &copy; DELOS INC
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
