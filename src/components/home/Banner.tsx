import bannerImage from "@/assets/home/banner.webp";
import RegisterForm from "@/components/register/RegisterFrom";
import Cookies from "@/components/home/Cookies";

const Banner = () => {
  return (
    <div
      className="md:pt-[208px] pt-[160px] pb-[110px] md:pb-[168px] banner bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bannerImage.src})` }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white">
          <div>
            <h1 className="md:text-[56px] text-2xl md:text-left text-center font-bold leading-[1.2] mb-7">
              Where Solo Travelers Connect To Save On Stays Together
            </h1>
            <p className="text-[18px] max-w-[500px] before:content-[''] before:h-[3px] before:w-[56px] before:flex-shrink-0 before:inline-block flex before:mt-[10px] gap-3 before:bg-[#D9D9D9] before:rounded-xl">
              Find a Housemate or Travel Companion to share costs on housing &
              lodging
            </p>
          </div>
          <div>
            <RegisterForm />
            <Cookies />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
