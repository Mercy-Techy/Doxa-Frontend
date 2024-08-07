import NavBar from "../components/NavBar";
import { Button } from "../components/Button";
import dbEx from "../assets/dbEx.png";
import comp1 from "../assets/comp1.png";
import comp2 from "../assets/comp2.png";
import comp3 from "../assets/comp3.png";
import frame1 from "../assets/frame1.png";
import frame2 from "../assets/frame2.png";
import svg from "../assets/svg.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useRef } from "react";

const stars = [1, 2, 3, 4, 5];

const Home = () => {
  const aboutUsRef = useRef(null);

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="bg-base h-[550px] md:h-[800px] font-koho">
        <div className="container mx-auto px-16">
          <NavBar scrollToSection={scrollToSection} aboutUsRef={aboutUsRef} />
          <div className="text-center flex flex-col items-center h-2/5 gap-8">
            <p className="font-karla text-xs border font-medium border-stone-300 rounded-3xl text-stone-300 px-4 py-2">
              DOXA Database Management System
            </p>
            <p className="md:text-5xl text-white font-bold">
              Elevate your data management <br /> with our sophisticated DBMS
            </p>
            <p className="text-stone-300 px-4 py-2">
              Dive into our Database Management System for a transformative
              experience <br /> in data organization and retrieval.
            </p>
            <Link to="/signup">
              <Button styles="font-bold">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <img
          src={dbEx}
          alt="image"
          className="mx-auto w-2/3 -mt-24 sm:-mt-28 md:-mt-64 lg:-mt-80"
        />
      </div>
      <div ref={aboutUsRef} className="container mx-auto px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="font-semibold md:text-4xl mb-8">
            Trusted by Companies Like
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-14">
            <img src={comp1} alt="company logo" className="w-9 h-8" />
            <img src={comp2} alt="company logo" className="w-9 h-8" />
            <img src={comp3} alt="company logo" className="w-9 h-8" />
            <img src={comp1} alt="company logo" className="w-9 h-8" />
            <img src={comp2} alt="company logo" className="w-9 h-8" />
            <img src={comp3} alt="company logo" className="w-9 h-8" />
          </div>
        </div>
        <div className="mt-16 lg:flex lg:gap-16">
          <div className="flex flex-col justify-center py-4">
            <h1 className="md:text-3xl text-lg font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>
            <p className="text-textgray md:text-lg my-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              odio pellentesque pellentesque a. Amet ut lobortis pellentesque a,
              luctus maecenas.
            </p>
            <p className="text-textgray text-lg">
              Feugiat sed enim vitae viverra cras tristique eu. Pellentesque
              bibendum volutpat metus, dictum.
            </p>
          </div>
          <img src={frame1} alt="frame1" className="w-full max-h-[450px]" />
        </div>

        <div className="mt-16 lg:flex lg:gap-16">
          <img src={frame2} alt="frame2" className="w-full max-h-[450px]" />
          <div className="flex flex-col justify-center py-4">
            <h1 className="md:text-5xl font-bold text-lg">
              How DOXA DBMS Works
            </h1>
            <p className="text-textgray md:text-lg my-8">
              Lorem ipsum dolor sit amet consectetur. Nulla blandit urna
              ultricies feugiat non morbi luctus malesuada. Etiam massa.
            </p>
            <div className="grid grid-cols-3 gap-7">
              <div>
                <p className="font-bold text-3xl">1468%</p>
                <p className="text-textgray md:text-lg">ROI</p>
              </div>
              <div>
                <p className="font-bold text-3xl">35%</p>
                <p className="text-textgray md:text-lg">Growth</p>
              </div>
              <div>
                <p className="font-bold text-3xl">20000</p>
                <p className="text-textgray md:text-lg">Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50">
        <div className="my-14 container mx-auto px-16 py-12">
          <h1 className="font-bold text-4xl mb-10">TESTIMONIALS</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {stars.map((key) => (
              <article
                key={key}
                className="shadow-lg rounded-3xl text-xs p-4 bg-white"
              >
                <div className="flex">
                  {stars.map((key) => (
                    <img
                      key={key}
                      src={svg}
                      alt="star"
                      className="w-[24px] h-[24px]"
                    />
                  ))}
                </div>
                <p className="text-textgray my-5">
                  Does exactly what it says. Clear to read and understand. This
                  is now the second iPhone we’ve used it on and would certainly
                  recommend this app.
                </p>
                <p className="font-bold">Ella A, George</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-16">
        <div>
          <h2 className="font-semibold text-2xl md:text-5xl my-12 md:text-center">
            DOXA Unlimited Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((key) => (
              <article key={key} className="w-full">
                <h1 className="font-bold md:text-2xl">
                  Affordable and Reliable
                </h1>
                <p className="text-textgray my-5 text-lg ">
                  Our free plan gives you unlimited team members, 3 boards, and
                  300+ expert-made templates. Signing up with your work email
                  lets you bring in your team faster. See our
                  <span className="text-textlime"> pricing plans</span> for more
                  features.
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="w-full bg-base text-white flex flex-col items-center justify-center p-16 h-2/3 rounded-2xl my-16 shadow">
          <h2 className="font-semibold text-2xl md:text-5xl md:text-center">
            Join 10M+ users today
          </h2>
          <p className="my-5 text-lg text-center">
            Start for free — upgrade anytime. Discover a new era of
            <br /> database management. Embrace efficiency, embrace excellence.
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center p-16 h-2/3 rounded-2xl my-16 ">
          <h2 className="font-semibold text-2xl md:text-5xl md:text-center">
            Contact Us
          </h2>
          <p className="my-5 text-lg text-textgray text-center">
            We are always open to discuss new value-adding partnerships. Do
            reach out if
            <br /> you are an exchange or a project looking for liquidity; an
            algorithmic trader or a <br /> software developer looking to improve
            the markets with us or just have a great <br /> idea you can’t wait
            to share with us!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
