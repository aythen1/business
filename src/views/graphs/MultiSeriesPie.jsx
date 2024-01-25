import "./MultiSeriesPie.css";

const MultiSeriesPie = ({
  products = "1",
  value = "no",
  theme = "light",
  className,
  ...props
}) => {
  const variantsClassName =
    "products-" + products + " value-" + value + " theme-" + theme;

  return (
    <div className={"multi-series-pie " + className + " " + variantsClassName}>
      <div className="rectangle-2046"></div>
      <div className="primary-text">PRIMARY TEXT </div>
      <div className="secondary-text">Secondary text </div>
      <div className="group-2284">
        <div className="ellipse-16"></div>
        <div className="group-5">
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
        </div>
      </div>
      <svg
        className="vector-51"
        width="430"
        height="2"
        viewBox="0 0 430 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1H430" stroke="#ECECEC" strokeWidth="2" />
      </svg>
      <div className="_5-987-34">5.987,34 </div>
      <div className="ellipse-199"></div>
      <div className="ellipse-200"></div>
      <div className="ellipse-201"></div>
      <div className="group-2281">
        <div className="product-1">Product 1 </div>
        <div className="rectangle-1339"></div>
      </div>
      <div className="group-2282">
        <div className="product-12">Product 1 </div>
        <div className="rectangle-13392"></div>
      </div>
      <div className="ellipse-202"></div>
    </div>
  );
};

export default MultiSeriesPie;
