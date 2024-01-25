import "./PolarArea.css";

const PolarArea = ({
  products = "2",
  value = "no",
  theme = "light",
  className,
  ...props
}) => {
  const variantsClassName =
    "products-" + products + " value-" + value + " theme-" + theme;

  return (
    <div className={"polar-area " + className + " " + variantsClassName}>
      <div className="rectangle-2045"></div>
      <div className="primary-text">PRIMARY TEXT </div>
      <div className="_5-987-34">5.987,34 </div>
      <div className="secondary-text">Secondary text </div>
      <div className="group-2290">
        <div className="ellipse-16"></div>
        <div className="group-5">
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
        </div>
      </div>
      <svg
        className="vector-50"
        width="430"
        height="2"
        viewBox="0 0 430 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1H430" stroke="#ECECEC" strokeWidth="2" />
      </svg>
      <div className="group-2291">
        <div className="product-1">Product 1 </div>
        <div className="rectangle-1339"></div>
      </div>
      <div className="group-2293">
        <div className="product-2">Product 2 </div>
        <div className="rectangle-13392"></div>
        <div className="product-3">Product 3 </div>
        <div className="rectangle-1340"></div>
        <div className="product-4">Product 4 </div>
        <div className="rectangle-1341"></div>
        <div className="product-5">Product 5 </div>
        <div className="rectangle-1342"></div>
      </div>
      <div className="ellipse-224"></div>
      <div className="ellipse-227"></div>
      <div className="_10">10 </div>
      <div className="_20">20 </div>
      <div className="_30">30 </div>
      <div className="_40">40 </div>
      <div className="_50">50 </div>
      <div className="_60">60 </div>
      <div className="_70">70 </div>
      <div className="group-2292">
        <div className="ellipse-217"></div>
        <div className="ellipse-216"></div>
        <div className="ellipse-215"></div>
        <div className="ellipse-214"></div>
        <div className="ellipse-213"></div>
        <div className="ellipse-212"></div>
        <div className="ellipse-211"></div>
      </div>
      <div className="ellipse-223"></div>
      <div className="ellipse-2232"></div>
      <div className="ellipse-2233"></div>
    </div>
  );
};


export default PolarArea;
