import social from "../assets/Social.png";
import social2 from "../assets/Social2.png";
import social4 from "../assets/Social4.png";
import social5 from "../assets/Social5.png";
import logo from "../assets/logo.png";

const Footer = () => (
  <footer className="bg-base text-white">
    <div className="container mx-auto p-16 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <div className="flex gap-3">
          <img src={logo} alt="logo" className="w-10 h-8" />
          <h1 className="text-lg font-bold">DOXA</h1>
        </div>
        <p className="text-sm my-5">
          Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
          mattis odio at.
        </p>
        <div className="flex gap-2">
          <img src={social} alt="logo" className="w-9 h-8" />
          <img src={social2} alt="logo" className="w-9 h-8" />
          <img src={social4} alt="logo" className="w-9 h-8" />
          <img src={social5} alt="logo" className="w-9 h-8" />
        </div>
      </div>
      <ul>
        <li className="font-bold">Top 4 Category</li>
        <li>Development</li>
        <li>Finance & Accounting</li>
        <li>Design</li>
        <li>Business</li>
      </ul>
      <ul>
        <li className="font-bold">Support</li>
        <li>Help Center</li>
        <li>FAQs</li>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
