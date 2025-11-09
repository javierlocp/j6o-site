function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`${className} inline-block decoration-wavy underline-offset-2 hover:text-neutral-50 hover:underline`}
    >
      {children}
    </a>
  );
}

export default ExternalLink;
