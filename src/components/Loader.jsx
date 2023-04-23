import images from "../assets";

const Loader = () => (
  <div className="flex justify-center items-center w-full my-4">
    <img src={images.loader} alt="loader" width={100} objectFit="contain" />
  </div>
);

export default Loader;
