import { useEffect } from "react";
import { useState } from "react";
import useSWR from "swr";
import AdminLayout from "../../components/admin/AdminLayout";

function Dashboard() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res.json());

  const { data, error } = useSWR("/api/v1/dashboard", fetcher, {
    refreshInterval: 1000,
  });

  const [change, setChange] = useState(false);
  useEffect(() => {
    if (data) {
      sessionStorage.setItem("orderCount", data?.data?.length);
    }
  }, [change]);

  function playAudio() {
    var audio = new Audio(
      "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
    );
    audio.play();
  }

  if (data) {
    return (
      <>
        <AdminLayout>
          <h1>THis is dashboard of admin pabel</h1>

          {data.data.length != sessionStorage.getItem("orderCount") ? (
            <div
              className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
              onLoad={() => playAudio()}
            >
              <div className="bg-white rounded-md shadow-md w-64">
                <div className=" p-10">
                  <h1 className="text-xl font-semibold">New Orders Detect</h1>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => setChange(!change)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 my-3 py-1 rounded-md"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <button onClick={() => setChange(!change)}>Change</button>
        </AdminLayout>
      </>
    );
  }
}

export default Dashboard;
