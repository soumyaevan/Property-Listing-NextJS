import FeaturedProperties from "@/components/FeaturedProperties";
import HeroSection from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
// import connectDB from "@/config/database";

const HomePage = () => {
  // console.log(process.env.MONGODB_URI);
  // connectDB();
  return (
    <>
      <HeroSection />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
