function Comment(props) {
  return (
    <>
      <div className="border-b my-4 border-gray-200 rounded-md shadow-sm  p-2 w-full">
        <div className="flex   text-sm font-bold items-center">
          <p className="capitalize">{props.author} </p>
          <p className="text-gray-400 text-xs font-light ">
            &nbsp; - 2022/12/10
          </p>
        </div>
        <p className="text-sm text-gray-600">{props.comment}</p>
      </div>
    </>
  );
}

export default Comment;
