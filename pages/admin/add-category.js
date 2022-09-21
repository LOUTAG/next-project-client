import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  resetCreateCategoryAction,
} from "../../redux/slices/categorySlice.js";
import Link from "next/link";

const AddCategory = () => {
  const dispatch = useDispatch();
  const category = useSelector((store) => store.category);
  const { loading, isSuccess, error } = category;
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const textRef = useRef();
  const actionRef = useRef();

  actionRef.current = category;

  useEffect(() => {
    return () => {
      if (actionRef.current.error || actionRef.current.isSuccess)
        return dispatch(resetCreateCategoryAction());
    };
  }, [dispatch]);

  useEffect(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [content]);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setContent("");
      setImage("");
    }
  }, [isSuccess]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    formData.append("image", image);
    dispatch(createCategoryAction(formData));
  };

  return (
    <div className="font-Recoleta">
      <h1 className="mb-4 text-2xl font-semibold text-center">Add Category</h1>
      {isSuccess && (
        <div
          className="bg-green-400 text-green-700 
        font-semibold mb-4 p-2 w-3/4 mx-auto"
        >
          {isSuccess}
        </div>
      )}
      <form
        className="w-[300px] mx-auto text-center mb-4"
        onSubmit={(event) => onFormSubmit(event)}
      >
        <input
          type="text"
          placeholder="name"
          className="p-2 border-2 mb-4  border-gray-300 rounded w-full"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="p-2 border-2 mb-4  border-gray-300 rounded w-full"
          type="file"
          accept="image/*"
          required
          onChange={(event) => setImage(event.target.files[0])}
        />
        <textarea
          ref={textRef}
          placeholder="content"
          required
          className="p-2 border-2 mb-4  border-gray-300 rounded overflow-auto resize-none w-full"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-orange-300 block px-4 py-2 font-semibold rounded capitalize"
        >
          Create
        </button>
      </form>
      <Link href="/admin">
        <a>Home</a>
      </Link>
    </div>
  );
};
export async function getStaticProps() {
  return {
    props: {
      protected: true,
      admin: true,
    },
  };
}
export default AddCategory;
