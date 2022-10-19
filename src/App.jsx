import useSWR from "swr";
import Footer from "./components/Footer";
import Navbar from "./components/Homepage/navbar/NavBar";
import SecondHeader from "./components/Homepage/SecondHeader";
import Slideshow from "./components/Homepage/Slideshow";
import TopHeader from "./components/Homepage/TopHeader";
import ItemWrapper from "./components/Items/ItemWrapper";

function App() {
  const fetcher = (...args) =>
    fetch(...args).then((response) => response.json());
  const { data: productData, error: productError } = useSWR(
    "/api/v1/products",
    fetcher
  );

  const { data: categoryData, error: categoryError } = useSWR(
    "/api/v1/fetchCategory",
    fetcher
  );

  if (categoryData && productData) {
    return (
      <>
        <TopHeader />
        <hr />
        <div className="sticky top-0 z-10">
          <SecondHeader />
        </div>
        <Navbar />
        <Slideshow />
        <ItemWrapper
          title="Top Picks"
          description="Get the best deals on the top picks of the week. We have the best"
          slide={5}
        />
        <div className="w-[98%] mx-auto">
          <div className="grid md:grid-cols-2 gap-7">
            <div>
              <img
                src="/slide1.jpeg"
                alt="ads"
                className="rounded-md shadow-md"
              />
            </div>

            <div>
              <img
                src="/slide1.jpeg"
                alt="ads"
                className="rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
        {categoryData.categories.map((category) => {
          const products = productData.data.filter((product) => {
            return product.category_id === category.id;
          });

          return (
            <ItemWrapper
              key={category.id}
              title={category.category_name}
              description={`Get the best deals on ${category.category_name}. We have the best`}
              slide={5}
              products={products}
            />
          );
        })}

        {/* <ItemWrapper
          title="Mobile Phones"
          description="Get the best deals on the Smart Phonee picks of the week."
          slide={5}
        />

        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div>
              <img src="/ads.jpeg" alt="Slideshow" />
            </div>
            <div className="md:col-span-2">
              <ItemWrapper
                title="EarPods "
                description="Get the best deals on the Earpods of the week. We have the best"
                slide={4}
              />
            </div>
          </div>
        </div>

        <ItemWrapper
          title="Smart Watch"
          description="Get the best deals on the Smart Watch picks of the week."
          slide={5}
        />

        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 order-2 md:order-1">
              <ItemWrapper
                title="Trimmer "
                description="Get the best deals on the trimmer of the week. We have the best"
                slide={4}
              />
            </div>

            <div className="order-1 md:order-2">
              <img src="/ads.jpeg" alt="Slideshow" className="w-full " />
            </div>
          </div>
        </div> */}
        <Footer />
      </>
    );
  }
}

export default App;
