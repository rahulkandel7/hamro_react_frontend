import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Footer from "./components/Footer";
import Navbar from "./components/Homepage/navbar/NavBar";
import SecondHeader from "./components/Homepage/SecondHeader";
import Slideshow from "./components/Homepage/Slideshow";
import TopHeader from "./components/Homepage/TopHeader";
import ItemWrapper from "./components/Items/ItemWrapper";
import Spinner from "./components/utils/Spinner";
import ServerError from "./pages/500";

function App() {
  const fetcher = (...args) =>
    fetch(...args).then((response) => response.json());
  const { data: productData, error: productError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/products",
    fetcher
  );

  const { data: categoryData, error: categoryError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/fetchCategory",
    fetcher
  );

  const { data: adsData, error: adsError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/ads/list",
    fetcher
  );

  const { data: toppicks, error: toppickserror } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/toppicks",
    fetcher
  );

  const navigate = useNavigate();

  if (categoryError || productError || toppickserror || adsError) return <ServerError />;

  if (!productData || !categoryData) return <Spinner />;

  if (categoryData && productData && toppicks && adsData) {
    const saleProduct = productData.data.filter((product) => {
      if (product.flashsale == 1) {
        return product;
      }
    });

    const priorityCategory = categoryData.categories.sort((a, b) => {
      return a.priority - b.priority;
    });

    let i = 1;
    let adsNumber = 2;

    return (
      <>
        <TopHeader />
        <hr />
        <div className="sticky top-0 z-10">
          <SecondHeader />
          <Navbar />

        </div>
        <Slideshow />
        <ItemWrapper
          title="Flash Sale"
          description="Get the best Flash Sale"
          slide={5}
          products={saleProduct}
        />
        {adsData.data.map((ad) => {
          if (ad.ad_code == "A1") {
            return (
              <div className="w-11/12 mx-auto">
                <img
                  src={`https://api.hamroelectronics.com.np/public/${ad.photopath}`}
                  alt="ads"
                  className="rounded-md shadow-md w-full"
                />
              </div>
            );
          }
        })}

        <ItemWrapper
          title="Top Picks"
          description="Get the best deals on the top picks of the week. We have the best"
          slide={5}
          products={toppicks.data}
        />
        <div className="w-[98%] mx-auto">
          <div className="">
            {adsData.data.map((ad) => {
              if (ad.ad_code == "A2") {
                return (
                  <div>
                    <img
                      src={`https://api.hamroelectronics.com.np/public/${ad.photopath}`}
                      alt="ads"
                      className="rounded-md shadow-md w-full"
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
        {priorityCategory.map((category) => {
          const products = productData.data.filter((product) => {
            return product.category_id == category.id;
          });

          return (
            <div>
              <ItemWrapper
                key={category.id}
                title={category.category_name}
                description={`Get the best deals on ${category.category_name}. We have the best`}
                slide={5}
                products={products}
              />
              <div className="text-center mb-4">
                <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded-md text-white" onClick={() => navigate(`/category/${category.id}`)}>
                  See More
                </button>
              </div>
              {i % 2 === 0
                ? adsData.data.map((ad) => {
                  if (ad.ad_code == `A${adsNumber}`) {
                    return (
                      <div className="w-[98%] mx-auto">
                        <img
                          src={`https://api.hamroelectronics.com.np/public/${ad.photopath}`}
                          alt="ads"
                          className="rounded-md shadow-md"
                        />
                      </div>
                    );
                  }
                }, adsNumber++)
                : null}
              <p className="hidden">{i++}</p>
            </div>
          );
        })}

        <Footer />
      </>
    );
  }
}

export default App;
