import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {
  categoryListAction,
  categoryDeleteAction,
  resetCategoryDeleteAction,
} from "../../redux/slices/categorySlice";
import Spinner from "../../components/Spinner";

const Admin = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((store) => store.category);
  const { loading, list, error, deleteLoading, deleteSuccess, deleteError } =
    category;
  useEffect(() => {
    deleteLoading && console.log("loading");
    deleteError && console.log(deleteError);
    deleteSuccess && console.log("delete");
  }, [deleteSuccess, deleteError, deleteLoading]);
  useEffect(() => {
    setMounted(true);
    dispatch(categoryListAction());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(resetCategoryDeleteAction());
      dispatch(categoryListAction());
    }
  }, [deleteSuccess, dispatch]);

  const onDeleteCategory = (slug) => {
    if (window.confirm(`Do you really want to delete ${slug}`)) {
      dispatch(categoryDeleteAction(slug));
    }
  };

  const renderList = () => {
    return list.map((item) => {
      return (
        <div key={uuidv4()}>
          <Link href={`/categories/${item.slug}`}>
            <a>
              <div>
                <Image
                  src={item.image.url}
                  alt={item.name}
                  width={968}
                  height={719}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={item.image.url}
                />
              </div>
              <div>{item.name}</div>
            </a>
          </Link>
          <div className="flex items-center justify-around">
            <button
              className="bg-red-500 p-1 rounded"
              onClick={() => onDeleteCategory(item.slug)}
            >
              Delete
            </button>
            <button className="bg-orange-400 p-1 rounded">Update</button>
          </div>
        </div>
      );
    });
  };

  if (!mounted || loading) {
    return <Spinner />;
  }

  return error ? (
    <div>{error}</div>
  ) : (
    <>
      <div className="grid grid-cols-3 items-center gap-3 mb-3">
        {renderList()}
      </div>
      <Link href="/admin/add-category">
        <a className="p-2 rounded bg-orange-300 ">add category</a>
      </Link>
    </>
  );
};
export default Admin;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      admin: true,
    },
  };
}
