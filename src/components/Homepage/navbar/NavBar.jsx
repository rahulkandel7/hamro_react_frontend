import useSWR from "swr";
import NavLinks from "./NavLinks";

function Navbar() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: categoryData, error: categoryError } = useSWR(
    "/api/v1/fetchCategory",
    fetcher
  );
  const { data: subCategoryData, error: subCategoryError } = useSWR(
    "/api/v1/fetchSubCategory",
    fetcher
  );

  if (categoryData && subCategoryData) {
    const priorityCategories = [...categoryData.categories].sort(
      (a, b) => a.priority - b.priority
    );
    return (
      <>
        <div className="w-full bg-indigo-600 ">
          <div className="w-11/12 mx-auto flex justify-center items-center py-1">
            {priorityCategories.map((category) => {
              return (
                <NavLinks
                  key={category.id}
                  id={category.id}
                  name={category.category_name}
                  subCategories={subCategoryData.data}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
