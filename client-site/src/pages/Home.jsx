import Banner from "../components/Banner";
import Counter from "../components/Counter";
import FaqItems from "../components/FaqItems";
import RecentBlog from "../components/RecentBlog";
import Subscribe from "../components/Subscribe";

const Home = () => {
  return (
    <>
      <section className="">
        <Banner/>
        <RecentBlog/>
        <Counter/>
        <FaqItems/>
        <Subscribe/>
      </section>
    </>
  );
};

export default Home;