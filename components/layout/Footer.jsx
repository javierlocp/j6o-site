import ExternalLink from "../ui/ExternalLink";
// Footer Component
// This is written in arrow function
const Footer = () => {
  return (
    <footer className="mt-40">
      <div className="mb-6 flex flex-col">
        <h2 className="mb-2 text-base text-gray-50">Colophon</h2>
        <div className="flex flex-col justify-between md:flex-row">
          <p className="mb-6 text-sm leading-6 text-neutral-400">
            Design and code by Javier Lo. <br />
            Source code at{" "}
            <ExternalLink
              className="text-sm text-neutral-400"
              href="https://github.com/javierlocp/j6o-site"
            >
              Github
            </ExternalLink>{" "}
            <br />
            <ExternalLink
              className="text-sm text-neutral-400"
              href="/public-key.txt"
            >
              My GPG Public Key
            </ExternalLink>
          </p>

          <p className="flex flex-col gap-1">
            <ExternalLink
              className="text-sm text-neutral-400 md:self-end"
              href="mailto:hello@javierlo.com"
            >
              hello@javierlo.com
            </ExternalLink>
            <ExternalLink
              className="text-sm text-neutral-400 md:self-end"
              href="https://www.linkedin.com/in/javierlo"
            >
              LinkedIn
            </ExternalLink>
          </p>
        </div>
      </div>
      <p className="text-sm">© {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
