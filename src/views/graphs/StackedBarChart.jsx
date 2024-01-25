import "./StackedBarChart.css";

const StackedBarChart = ({
  products = "1",
  value = "no",
  size = "small",
  negativeScale = "yes",
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
    " negative-scale-" +
    negativeScale +
    " theme-" +
    theme;

  return (
<div className={"stacked-bar-chart " + className + " " + variantsClassName}>
      <div className="rectangle-2035"></div>
      <div className="primary-text">PRIMARY TEXT </div>
      <div className="secondary-text">Secondary text </div>
      <div className="group-2272">
        <div className="ellipse-16"></div>
        <div className="group-5">
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
        </div>
      </div>
      <svg
        className="group-2273"
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
      <svg
        className="vector-48"
        width="430"
        height="2"
        viewBox="0 0 430 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1H430" stroke="#ECECEC" strokeWidth="2" />
      </svg>
      <div className="group-2274">
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
      <div className="rectangle-2036"></div>
      <div className="rectangle-2042"></div>
      <div className="rectangle-2048"></div>
      <div className="rectangle-2049"></div>
      <div className="rectangle-2050"></div>
      <div className="rectangle-2051"></div>
      <div className="rectangle-2052"></div>
      <div className="rectangle-2053"></div>
      <div className="rectangle-2043"></div>
      <div className="rectangle-2044"></div>
      <div className="rectangle-2045"></div>
      <div className="rectangle-2046"></div>
      <div className="rectangle-2047"></div>
      <div className="rectangle-2037"></div>
      <div className="rectangle-2038"></div>
      <div className="rectangle-2039"></div>
      <div className="rectangle-2040"></div>
      <div className="rectangle-2041"></div>
    </div>
  );
};


export default StackedBarChart;
