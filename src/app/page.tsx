import News_letter from "@components/footer/news_letter";
import Country_section from "@components/home/country_section";
import Electronics_gadgets from "@components/home/electronics_gadgets";
import Home_outdoor from "@components/home/home_outdoor";
import Inquiry_section from "@components/home/inquiry_section";
import Main_section from "@components/home/main_section";
import Recommended_section from "@components/home/recommended_section";
import Sale_section from "@components/home/sale_section";
import Service_section from "@components/home/service_section";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-10 p-5 bg-gray-50 shadow-lg rounded-lg">
      <Main_section />
      <Sale_section />
      <Home_outdoor />
      <Electronics_gadgets />
      <Inquiry_section />
      <Recommended_section />
      <Service_section />
      <Country_section />
      <News_letter />
    </div>
  );
}
