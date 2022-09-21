import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Home = ({ data }) => {
  const renderList = () => {
    return data.map((item) => {
      return (
        <Link href={`/categories/${item.slug}`} key={uuidv4()}>
          <a>
            <img
              src={item.image.url}
              alt={item.name}
            />
            <div>{item.name}</div>
          </a>
        </Link>
      );
    });
  };
  return (
    <div className="grid grid-cols-3 items-center gap-3">{renderList()}</div>
  );
};
export default Home;

export async function getStaticProps() {
  try {
    const response = await axios.get(`${process.env.API}/api/categories/list`);
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
