import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
      <div class="items-center grid-flow-col">
        <p>Made with</p>
        <FaHeart className="text-rose-600 text-3xl" />
      </div>
    </footer>
  );
};

export default Footer;
