function Comment(props) {
  return (
    <>
      <div className="border my-4 border-indigo-200 rounded-md shadow-md shadow-indigo-50 p-2 w-5/12">
        <p className="text-sm text-gray-600">{props.comment}</p>
        <div className="flex justify-end text-xs font-bold">{props.author}</div>
      </div>
    </>
  );
}

export default Comment;
