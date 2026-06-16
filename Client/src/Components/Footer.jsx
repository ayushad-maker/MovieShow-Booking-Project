import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <footer className="px-6 mt-30 md:px-16 lg:px-36 w-full text-gray-300">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
          <div className="md:max-w-96">
            <img
              alt=""
              className="hover:scale-110 transition ease-in-out duration-100 h-8"
              src={assets.logo}
            />
            <p className="mt-6 text-sm">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
                alt="google play"
                className="h-10 w-auto border border-white rounded hover:scale-110 transition ease-in duration-100"
              />
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
                alt="app store"
                className="h-10 w-auto border border-white rounded hover:scale-110 transition ease-in duration-100"
              />
            </div>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
            <div>
              <h2 className="font-semibold mb-5 hover:text-primary-dull">Company</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a className="hover:text-primary-dull" href="#">Home</a>
                </li>
                <li>
                  <a className="hover:text-primary-dull" href="#">About us</a>
                </li>
                <li>
                  <a className="hover:text-primary-dull" href="#">Contact us</a>
                </li>
                <li>
                  <a className="hover:text-primary-dull" href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-5 hover:text-primary-dull">Get in touch</h2>
              <div className="text-sm space-y-2">
                <p className="hover:text-primary-dull">+1-234-567-890</p>
                <p className="hover:text-primary-dull">contact@example.com</p>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-sm pb-5">
          Copyright {new Date().getFullYear()} ©{" "}
          <a className="hover:text-primary-dull" href="https://prebuiltui.com">QuickShow</a>. All Right Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
