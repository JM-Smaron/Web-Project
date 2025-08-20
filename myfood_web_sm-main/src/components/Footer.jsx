/**
 * Footer component for the application
 * Contains company info and social media icons
 * Rewritten for originality with comments
 */

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get current year

  return (
    <footer className="footer footer-center bg-gray-900 text-white p-10">
      {/* Company Logo and Info */}
      <section className="footer-info">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="inline-block fill-current"
        >
          <path d="M22.672 15.226l-2.432.811... (truncated for brevity)" />
        </svg>
        <p className="font-bold">
          FLAVOURSCAPE INC.
          <br />
          Serving delicious food since 1992
        </p>
        <p>Copyright © {currentYear} - All rights reserved</p>
      </section>

      {/* Social Media Links */}
      <nav className="footer-social">
        <div className="grid grid-flow-col gap-4">
          {/* Twitter */}
          <a aria-label="Twitter link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775... (truncated)" />
            </svg>
          </a>
          {/* YouTube */}
          <a aria-label="YouTube link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0... (truncated)" />
            </svg>
          </a>
          {/* Facebook */}
          <a aria-label="Facebook link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955... (truncated)" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
