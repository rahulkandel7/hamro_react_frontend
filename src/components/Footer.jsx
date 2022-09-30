function Footer() {
  return (
    <>
      <div className="w-full bg-gray-50 mt-5 shadow-inner">
        <div className="grid w-11/12 mx-auto grid-cols-4 py-10">
          <div>
            <h1 className="text-xl text-gray-600 font-bold">Get Us on</h1>
          </div>

          <div>
            <h1 className="text-xl text-gray-600 font-bold">Links</h1>
            <ul className="py-4 text-md">
              <li className="text-gray-500 hover:text-gray-700 py-1">
                About Us
              </li>

              <li className="text-gray-500 hover:text-gray-700 py-1">
                Contact Us
              </li>

              <li className="text-gray-500 hover:text-gray-700 py-1">FAQ's</li>
            </ul>
          </div>

          <div>
            <h1 className="text-xl text-gray-600 font-bold">Policy</h1>
            <ul className="py-4 text-md">
              <li className="text-gray-500 hover:text-gray-700 py-1">
                Terms &amp; Conditions
              </li>

              <li className="text-gray-500 hover:text-gray-700 py-1">
                Return Policy
              </li>

              <li className="text-gray-500 hover:text-gray-700 py-1">
                Refund Policy
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-xl text-gray-600 font-bold">Contact Us</h1>
            <div className="text-gray-700 py-4">
              <p className="flex items-center py-1">
                <i className="ri-map-pin-2-line mr-1"></i> Sahid Chowk,
                Narayanghat
              </p>

              <p className="flex items-center py-1">
                <i className="ri-map-pin-2-line mr-1"></i> Tandi, Chitwan
              </p>

              <p className="flex items-center py-1">
                <i className="ri-phone-line mr-1"></i>{" "}
                <a href="tel:+9779864068268">9864068268</a>, SahidChowk
              </p>

              <p className="flex items-center py-1">
                <i className="ri-phone-line mr-1"></i>{" "}
                <a href="tel:+9779801521884">9801521884</a>, Tandi
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200">
        <div className="w-11/12 mx-auto text-gray-600 py-1 text-sm flex justify-between items-center h-full">
          <p>Copyright &copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
