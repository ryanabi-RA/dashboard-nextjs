import { getData } from "../api/posts";
import { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Modal from "../../components/modal";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const posts = await getData();

  return {
    props: {
      posts,
      token,
    },
  };
}

export default function PostIndex(props) {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState(props.posts);
  const { token } = props;

  // const posts = props.posts;
  // console.log(props.posts);

  async function deleteHandler(id, e) {
    e.preventDefault();

    const ask = confirm("Apakah data ini akan dihapus");

    if (ask) {
      const deletePost = await fetch("/api/posts/delete/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const res = await deletePost.json();

      const postFiltered = posts.filter((post) => {
        return post.id !== id && post;
      });

      setPosts(postFiltered);
    }
  }

  function editHandler(id) {
    Router.push("/posts/edit/" + id);
  }

  return (
    <div className="h-screen w-full px-4">
      <h1 className="my-6 text-4xl">Posts Page</h1>
      <button
        className="mb-4 rounded-lg border-2 border-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white active:bg-gray-300"
        onClick={() => setShow(true)}
      >
        Add new
      </button>
      <Modal onClose={() => setShow(false)} show={show} token={token} />
      <div className="rounded-lg border-2 border-gray-200 p-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="my-2 flex items-center justify-between rounded-md bg-gray-200 p-2 dark:bg-gray-800"
          >
            <div className="ml-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p>{post.content}</p>
            </div>
            <div className="">
              <button
                onClick={editHandler.bind(this, post.id)}
                className="mx-2 rounded-lg border-2 border-yellow-500 bg-yellow-500 py-1 px-3 text-white hover:bg-transparent hover:text-yellow-500 active:bg-gray-500"
              >
                Edit
              </button>
              <button
                onClick={deleteHandler.bind(this, post.id)}
                className="mx-2 rounded-lg border-2 border-red-500 bg-red-500 py-1 px-3 text-white hover:bg-transparent hover:text-red-500 active:bg-gray-500"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
