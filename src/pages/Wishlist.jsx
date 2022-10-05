import Footer from "../components/Footer";
import NavBar from "../components/Homepage/navbar/NavBar";
import SecondHeader from "../components/Homepage/SecondHeader";

import WishlistItem from "../components/wishlist/WishlistItem";

function Wishlist() {
  return (
    <>
      <SecondHeader />
      <NavBar />
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl font-bold  text-gray-700 mt-5 mb-2">
          My Wishlist
        </h1>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-10 my-10">
          <WishlistItem item_name="demo" price={1234} />
          <WishlistItem />
          <WishlistItem />
          <WishlistItem />
          <WishlistItem />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;
