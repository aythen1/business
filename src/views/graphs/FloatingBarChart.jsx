import "./FloatingBarChart.css";

const FloatingBarChart = ({
  products = "1",
  value = "no",
  size = "small",
  theme = "light",
  className,
  ...props
}) => {
  const variantsClassName =
    "products-" +
    products +
    " value-" +
    value +
    " size-" +
    size +
    " theme-" +
    theme;

  return (
    <div
      className={"floating-bar-chart " + className + " " + variantsClassName}
    >
      <div className="rectangle-1798"></div>
      <div className="primary-text">PRIMARY TEXT </div>
      <div className="_5-987-34">5.987,34 </div>
      <div className="secondary-text">Secondary text </div>
      <div className="group-2195">
        <div className="ellipse-16"></div>
        <div className="group-5">
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
        </div>
      </div>
      <svg
        className="vector-47"
        width="430"
        height="2"
        viewBox="0 0 430 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1H430" stroke="#ECECEC" strokeWidth="2" />
      </svg>
      <svg
        className="group-2196"
        width="321"
        height="167"
        viewBox="0 0 321 167"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="320" height="166" stroke="#ECECEC" />
        <path d="M0 55H321" stroke="#ECECEC" />
        <path d="M0 28H321" stroke="#ECECEC" />
        <path d="M0 82H321" stroke="#ECECEC" />
        <path d="M0 109H321" stroke="#ECECEC" />
        <path d="M0 136H321" stroke="#ECECEC" />
        <path d="M54 0L54 167" stroke="#ECECEC" />
        <path d="M107 0L107 167" stroke="#ECECEC" />
        <path d="M160 0L160 167" stroke="#ECECEC" />
        <path d="M213 0L213 167" stroke="#ECECEC" />
        <path d="M266 0L266 167" stroke="#ECECEC" />
      </svg>
      <div className="_100">-100 </div>
      <div className="_60">-60 </div>
      <div className="_20">-20 </div>
      <div className="_0">0 </div>
      <div className="_202">20 </div>
      <div className="_602">60 </div>
      <div className="_1002">100 </div>
      <div className="group-2197">
        <div className="product-1">Product 1 </div>
        <div className="rectangle-1339"></div>
        <div className="product-2">Product 2 </div>
        <div className="rectangle-1340"></div>
        <div className="product-3">Product 3 </div>
        <div className="rectangle-1341"></div>
      </div>
      <div className="jan">Jan </div>
      <div className="feb">Feb </div>
      <div className="mar">Mar </div>
      <div className="apr">Apr </div>
      <div className="mai">Mai </div>
      <div className="jun">Jun </div>
      <div className="rectangle-2016"></div>
      <div className="rectangle-2028"></div>
      <div className="rectangle-2022"></div>
      <div className="rectangle-2017"></div>
      <div className="rectangle-2023"></div>
      <div className="rectangle-2029"></div>
      <div className="rectangle-2018"></div>
      <div className="rectangle-2024"></div>
      <div className="rectangle-2030"></div>
      <div className="rectangle-2019"></div>
      <div className="rectangle-2025"></div>
      <div className="rectangle-2031"></div>
      <div className="rectangle-2020"></div>
      <div className="rectangle-2026"></div>
      <div className="rectangle-2032"></div>
      <div className="rectangle-2021"></div>
      <div className="rectangle-2027"></div>
      <div className="rectangle-2033"></div>
    </div>
  );
};


export default FloatingBarChart;