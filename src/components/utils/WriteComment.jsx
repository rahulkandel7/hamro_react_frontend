import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

function WriteComment(props) {
  //* For Comment
  const [comment, setComment] = useState("");

  //* For Options
  const [options, setOptions] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());

  const { data, error, mutate } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/comment/product/${props.id}`,
    fetcher
  );

  //* Function for posting comment
  function postComment() {
    fetch("https://api.hamroelectronics.com.np/api/v1/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        product_id: props.id,
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast(data.message, { type: "success" });
          setComment("");
          props.mutate();
          mutate();
        }
      });
  }

  //* Function for updating comment
  function updateComment(id) {
    fetch(`https://api.hamroelectronics.com.np/api/v1/comment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        product_id: props.id,
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast(data.message, { type: "success" });
        }
      });
    props.mutate();
    setIsEdit(false);
    setOptions(false);
    mutate();
  }

  //* Function for deleting comment
  function deleteComment(id) {
    fetch(`https://api.hamroelectronics.com.np/api/v1/comment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast(data.message, { type: "success" });
        }
      });
    props.mutate();
    mutate();

    setOptions(false);
  }
  if (data) {
    if (data.data != null) {
      return (
        <>
          {isEdit ? (
            <div className=" w-full relative">
              <textarea
                name="comment"
                id="comment"
                onChange={(e) => setComment(e.target.value)}
                className="max-h-32 w-full border border-gray-200 rounded-md shadow-md  p-2 outline-none focus-visible:border-indigo-400 pr-20 py-2"
                rows="2"
                placeholder="Write a review"
              >
                {data.data.comment
                  ? data.data.comment
                  : comment == ""
                  ? ""
                  : comment}
              </textarea>

              <div className="absolute top-[30%] -translate-y-[30%] right-2">
                {data.data ? (
                  <div>
                    <button
                      className="px-2 text-xs py-1 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md shadow-md"
                      onClick={() => updateComment(data.data.id)}
                    >
                      <i class="ri-refresh-line"></i>
                    </button>
                  </div>
                ) : (
                  <button
                    className="px-4 py-1 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md shadow-md"
                    onClick={() => postComment()}
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="relative border-b my-4 border-gray-200 rounded-md shadow-sm  p-2 w-full">
              <p className="text-sm text-gray-600">{data.data.comment}</p>
              <div className="flex justify-end text-xs font-bold">
                <button onClick={() => setOptions(!options)}>
                  <i class="ri-more-2-line"></i>
                </button>
              </div>
              {options ? (
                <div className="absolute bg-white shadow-md w-fit right-0">
                  <button onClick={() => setIsEdit(true)}>
                    <i class="ri-edit-box-line px-1 text-gray-500 hover:text-indigo-500"></i>
                  </button>
                  <button onClick={() => deleteComment(data.data.id)}>
                    <i class="ri-delete-bin-7-line px-1 text-gray-500 hover:text-red-600"></i>
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          <div className=" w-full relative">
            <textarea
              name="comment"
              id="comment"
              onChange={(e) => setComment(e.target.value)}
              className="max-h-32 w-full border border-indigo-200 rounded-md shadow-md  p-2 outline-none focus-visible:border-indigo-400 pr-20 py-2"
              rows="2"
              placeholder="Write a review"
            >
              {comment == "" ? "" : comment}
            </textarea>

            <div className="absolute top-[30%] -translate-y-[30%] right-2">
              <button
                className="px-4 py-1 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md shadow-md"
                onClick={() => postComment()}
              >
                Post
              </button>
            </div>
          </div>
        </>
      );
    }
  }
}

export default WriteComment;
