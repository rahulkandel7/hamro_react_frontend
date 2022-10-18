import { mixed, number, object, string } from "yup";
import { Formik } from "formik";
import useSWR from "swr";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

import { Editor } from "@tinymce/tinymce-react";

function EditProduct() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

  const { data: categoryData, error: categoryError } = useSWR(
    "/api/v1/categories",
    fetcher
  );

  const { data: subcategoryData, error: subcategoryError } = useSWR(
    "/api/v1/subcategories",
    fetcher
  );

  const params = useParams();

  const { data: productData, error: productError } = useSWR(
    "/api/v1/products/" + params.id,
    fetcher
  );

  const navigate = useNavigate();

  const editorRef = useRef(null);

  const productAddSchemea = object({
    product_name: string().required("Product name is required"),
    price: number().required("Price is required"),
    discountPrice: number().nullable(),
    min_order: number().required("Minimum order is required"),
    description: string().required("Description is required"),
    photopath1: mixed().nullable("First photo is required"),
    photopath2: mixed().nullable("Photo is required"),
    photopath3: mixed().nullable("Photo is required"),
    category_id: number().required("Category is required"),
    sub_category_id: number().required("Sub Category is required"),
  });

  if (productError) {
    return <h1>Error Product</h1>;
  }

  if (!productError && !productData) {
    return <h1>Loading</h1>;
  }

  if (productData) {
    return (
      <>
        <div className="">
          <div className="h-fit w-full bg-gray-50  shadow-lg">
            <div className=" p-5 rounded-lg">
              <h1 className="text-gray-800 py-4 font-semibold text-4xl">
                Edit Product
              </h1>
              <hr />
              <Formik
                validateOnChange={false}
                initialValues={{
                  product_name: productData.product.product_name,
                  price: productData.product.price,
                  discountPrice: productData.product.discountPrice,
                  min_order: productData.product.min_order,
                  description: productData.product.description,
                  // photopath1: productData.product.photopath1,
                  // photopath2: productData.product.photopath2,
                  // photopath3: productData.product.photopath3,
                  category_id: productData.product.category_id,
                  sub_category_id: productData.product.sub_category_id,
                }}
                validationSchema={productAddSchemea}
                onSubmit={async (values) => {
                  const formData = new FormData();
                  formData.append("product_name", values.product_name);
                  formData.append("price", values.price);
                  formData.append("discountPrice", values.discountPrice);
                  formData.append("min_order", values.min_order);
                  formData.append("description", values.description);
                  formData.append(
                    "photopath1",
                    values.photopath1 == null
                      ? productData.product.photopath1
                      : values.photopath1
                  );
                  formData.append("photopath2", values.photopath2);
                  formData.append("photopath3", values.photopath3);
                  formData.append("category_id", values.category_id);
                  formData.append("sub_category_id", values.sub_category_id);

                  const res = await fetch(
                    `/api/v1/products/${productData.product.id}`,
                    {
                      method: "PUT",
                      body: formData,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  console.log(res.text());
                  // navigate("/distributor/products");
                }}
              >
                {({
                  errors,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => {
                  return (
                    <form onSubmit={handleSubmit} className="my-4 w-full">
                      <div className="mx-2">
                        <label
                          htmlFor="product_name"
                          className="my-2 text-gray-500"
                        >
                          Product Name <sup className="text-red-600">*</sup>
                        </label>

                        <input
                          type="text"
                          name="product_name"
                          id="product_name"
                          onChange={handleChange}
                          value={values.product_name}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.product_name}
                        </p>
                      </div>

                      <div className="mx-2">
                        <label
                          htmlFor="category_id"
                          className="my-2 text-gray-500"
                        >
                          Select Category <sup className="text-red-600">*</sup>
                        </label>
                        <select
                          name="category_id"
                          onChange={handleChange}
                          id="category_id"
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                        >
                          <option value="" disabled>
                            -- Select Category --
                          </option>
                          {!categoryData ? (
                            <></>
                          ) : (
                            categoryData.categories.map((category) => {
                              return (
                                <option
                                  value={category.id}
                                  key={category.id}
                                  selected={
                                    values.category_id == category.id
                                      ? true
                                      : false
                                  }
                                >
                                  {category.name}
                                </option>
                              );
                            })
                          )}
                        </select>

                        <p className="text-sm text-red-500 pb-3">
                          {errors.category_id}
                        </p>
                      </div>

                      <div className="mx-2">
                        <label
                          htmlFor="sub_category_id"
                          className="my-2 text-gray-500"
                        >
                          Select Sub Category{" "}
                          <sup className="text-red-600">*</sup>
                        </label>

                        <select
                          name="sub_category_id"
                          onChange={handleChange}
                          id="sub_category_id"
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                        >
                          <option value="" disabled>
                            -- Select Sub Category --
                          </option>
                          {!subcategoryData ? (
                            <></>
                          ) : (
                            subcategoryData.subCategories.map((sub) => {
                              if (values.category_id == sub.category_id) {
                                return (
                                  <option
                                    value={sub.id}
                                    key={sub.id}
                                    selected={
                                      values.sub_category_id == sub.id
                                        ? true
                                        : false
                                    }
                                  >
                                    {sub.name}
                                  </option>
                                );
                              }
                            })
                          )}
                        </select>

                        <p className="text-sm text-red-500 pb-3">
                          {errors.sub_category_id}
                        </p>
                      </div>

                      <div className="mx-2">
                        <label htmlFor="price" className="my-2 text-gray-500">
                          Product Price <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          value={values.price}
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.price}
                        </p>
                      </div>

                      <div className="mx-2">
                        <label
                          htmlFor="discountPrice"
                          className="my-2 text-gray-500"
                        >
                          Product Discounted Price
                        </label>
                        <input
                          type="text"
                          name="discountPrice"
                          id="discountPrice"
                          value={values.discountPrice}
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.discountPrice}
                        </p>
                      </div>

                      <div className="mx-2">
                        <label
                          htmlFor="min_order"
                          className="my-2 text-gray-500"
                        >
                          Minimum Order <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="text"
                          name="min_order"
                          id="min_order"
                          value={values.min_order}
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.min_order}
                        </p>
                      </div>

                      <div className="mx-2">
                        <label
                          htmlFor="description"
                          className="my-2 text-gray-500"
                        >
                          Description <sup className="text-red-600">*</sup>
                        </label>

                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          textareaName="description"
                          onEditorChange={(e) => {
                            handleChange({
                              target: { name: "description", value: e },
                            });
                          }}
                          initialValue={values.description}
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              " autolink lists link charmap print preview anchor",
                            ],
                            toolbar:
                              "undo redo | formatselect | " +
                              "bold italic backcolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                        />

                        <p className="text-sm text-red-500 pb-3">
                          {errors.description}
                        </p>
                      </div>

                      <div className="flex">
                        <div className="mx-2">
                          <p className="my-2 text-gray-500 ">
                            Select First Photo (500 X 600){" "}
                            <sup className="text-red-600">*</sup>
                          </p>
                          <label
                            htmlFor="photopath1"
                            className="my-2 text-gray-500 "
                          >
                            <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                              {values.photopath1 ? (
                                <img
                                  src={URL.createObjectURL(values.photopath1)}
                                  className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1 object-cover"
                                  alt=""
                                />
                              ) : (
                                <i className="text-6xl text-gray-300 ri-add-line "></i>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            hidden
                            name="photopath1"
                            id="photopath1"
                            onChange={(e) => {
                              setFieldValue(
                                "photopath1",
                                e.currentTarget.files[0]
                              );
                            }}
                            className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                          />
                          <p className="text-sm text-red-500 pb-3">
                            {errors.photopath1}
                          </p>
                        </div>
                        <div className="mx-2">
                          <p className="my-2 text-gray-500 ">
                            Select Second Photo (500 X 600)
                          </p>
                          <label
                            htmlFor="photopath2"
                            className="my-2 text-gray-500 "
                          >
                            <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                              {values.photopath2 ? (
                                <img
                                  src={URL.createObjectURL(values.photopath2)}
                                  className="w-full h-full border border-gray-200 rounded-lg object-cover shadow-lg p-1"
                                  alt=""
                                />
                              ) : (
                                <i className="text-6xl text-gray-300 ri-add-line "></i>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            hidden
                            name="photopath2"
                            id="photopath2"
                            onChange={(e) => {
                              setFieldValue(
                                "photopath2",
                                e.currentTarget.files[0]
                              );
                            }}
                            className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                          />
                          <p className="text-sm text-red-500 pb-3">
                            {errors.photopath2}
                          </p>
                        </div>

                        <div className="mx-2">
                          <p className="my-2 text-gray-500 ">
                            Select Third Photo (500/600)
                          </p>
                          <label
                            htmlFor="photopath3"
                            className="my-2 text-gray-500 "
                          >
                            <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                              {values.photopath3 ? (
                                <img
                                  src={URL.createObjectURL(values.photopath3)}
                                  className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1"
                                  alt=""
                                />
                              ) : (
                                <i className="text-6xl text-gray-300 ri-add-line "></i>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            hidden
                            name="photopath3"
                            id="photopath3"
                            onChange={(e) => {
                              setFieldValue(
                                "photopath3",
                                e.currentTarget.files[0]
                              );
                            }}
                            className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                          />
                          <p className="text-sm text-red-500 pb-3">
                            {errors.photopath3}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end my-2">
                        <div>
                          <NavLink to="/distributor/products">
                            <button className="px-8 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2">
                              Cancel
                            </button>
                          </NavLink>
                          <button
                            type="submit"
                            className="px-8 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                          >
                            Add Product
                          </button>
                        </div>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditProduct;
