import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="container w-100">
      <div className="bg-[#f8fafe] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-10 py-10 rounded-3xl items-center justify-center ">
        <div className="flex flex-col items-center lg:items-start gap-5">
          <img width={100} height={100} src="/assets/images/logo.png" alt="footer lgo" />
        </div>
        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="text-xl font-medium">Company</p>
          <p className="text-base">Careers</p>
          <p className="text-base">Support</p>
          <p className="text-base">Contact</p>
        </div>
        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="text-xl font-medium">Product</p>
          <p className="text-base">Courses</p>
          <p className="text-base">Pricing</p>
          <p className="text-base">Blog</p>
        </div>
        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="text-xl font-medium">Legal</p>
          <p className="text-base">Terms & Conditions</p>
          <p className="text-base">Privacy policy</p>
        </div>
        <div className="flex items-center gap-5">
                <BsFacebook className="text-3xl text-gray-500"/>
                <BsTwitter className="text-3xl text-gray-500"/>
                <BsInstagram className="text-3xl text-gray-500"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
