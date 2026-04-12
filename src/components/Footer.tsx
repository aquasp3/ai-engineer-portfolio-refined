const Footer = () => {
  return (
    <footer className="py-8 px-4 text-center border-t border-border">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Sathvik Konduri. Built with React & Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;
