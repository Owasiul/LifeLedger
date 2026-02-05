import React from "react";
import { Link } from "react-router";
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Logo from "../../assets/Logo.png";

function Footer() {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Website Name Section */}

          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-36 rounded-lg flex items-center justify-center">
              <img className="object-contain" src={Logo} alt="" />
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:sanisuper0@gmail.com"
                    className="text-sm text-base-content/70 hover:text-primary transition"
                  >
                    sanisuper0@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a
                    href="tel:+8801234567890"
                    className="text-sm text-base-content/70 hover:text-primary transition"
                  >
                    +880(123)-4567890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-base-content/70">
                    123/22 Gulisthan
                    <br />
                    Dhaka, 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-sm text-base-content/70 hover:text-primary transition"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>

            {/* Social Media Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                {/* Twitter */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-base-content/60 text-center md:text-left">
              © {new Date().getFullYear()} YourBrand. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-base-content/60">
              <Link to="/sitemap" className="hover:text-primary transition">
                Sitemap
              </Link>
              <Link
                to="/accessibility"
                className="hover:text-primary transition"
              >
                Accessibility
              </Link>
              <Link to="/support" className="hover:text-primary transition">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
