const Footer = () => {
  return (
    <footer
      className="py-8 px-4 text-center"
      style={{
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <p
        className="text-sm"
        style={{
          color: "var(--text-body)",
          opacity: 0.7,
        }}
      >
        © {new Date().getFullYear()} Sathvik Konduri. Built with React & Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;
