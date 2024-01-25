import "./BarChartBorderRadius.css";

const BarChartBorderRadius = ({
  products = "1",
  value = "no",
  size = "small",
  theme = "light",
  negativeScale = "yes",
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
    theme +
    " negative-scale-" +
    negativeScale;

  return (
    <div
      className={
        "bar-chart-border-radius " + className + " " + variantsClassName
      }
    >
      <div className="group-2268">
        <div className="rectangle-1727"></div>
        <div className="primary-text">PRIMARY TEXT </div>
        <div className="secondary-text">Secondary text </div>
        <div className="_5-987-34">5.987,34 </div>
        <div className="group-2174">
          <div className="ellipse-16"></div>
          <div className="group-5">
            <div className="rectangle-8"></div>
            <div className="rectangle-9"></div>
          </div>
        </div>
        <svg
          className="group-2175"
          width="321"
          height="167"
          viewBox="0 0 321 167"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="320" height="166" stroke="#ECECEC" />
          <path d="M0 31H321" stroke="#ECECEC" />
          <path d="M0 66H321" stroke="#ECECEC" />
          <path d="M0 101H321" stroke="#ECECEC" />
          <path d="M0 136H321" stroke="#ECECEC" />
          <path d="M53.5859 0L53.5859 167" stroke="#ECECEC" />
          <path d="M106.66 0L106.66 167" stroke="#ECECEC" />
          <path d="M159.734 0L159.734 167" stroke="#ECECEC" />
          <path d="M213.32 0L213.32 167" stroke="#ECECEC" />
          <path d="M266.395 0L266.395 167" stroke="#ECECEC" />
        </svg>
        <div className="_100">-100 </div>
        <div className="_60">-60 </div>
        <div className="_20">-20 </div>
        <div className="_202">20 </div>
        <div className="_602">60 </div>
        <div className="_1002">100 </div>
        <svg
          className="vector-42"
          width="430"
          height="2"
          viewBox="0 0 430 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1H430" stroke="#ECECEC" strokeWidth="2" />
        </svg>
        <div className="rectangle-1728"></div>
        <div className="rectangle-1729"></div>
        <div className="rectangle-1730"></div>
        <div className="rectangle-1731"></div>
        <div className="rectangle-1732"></div>
        <div className="rectangle-1733"></div>
        <div className="rectangle-1734"></div>
        <div className="rectangle-1735"></div>
        <div className="rectangle-1736"></div>
        <div className="rectangle-1737"></div>
        <div className="rectangle-1738"></div>
        <div className="rectangle-1739"></div>
        <div className="rectangle-1740"></div>
        <div className="rectangle-1741"></div>
        <div className="rectangle-1742"></div>
        <div className="rectangle-1743"></div>
        <div className="rectangle-1744"></div>
        <div className="rectangle-1745"></div>
        <div className="group-2176">
          <div className="product-1">Product 1 </div>
          <div className="rectangle-1339"></div>
        </div>
        <div className="group-2177">
          <div className="product-2">Product 2 </div>
          <div className="rectangle-1340"></div>
        </div>
        <div className="group-2178">
          <div className="product-3">Product 3 </div>
          <div className="rectangle-13402"></div>
        </div>
        <div className="jan">Jan </div>
        <div className="feb">Feb </div>
        <div className="mar">Mar </div>
        <div className="apr">Apr </div>
        <div className="mai">Mai </div>
        <div className="jun">Jun </div>
      </div>
      <div className="rectangle-2015"></div>
    </div>
  );
};

export default BarChartBorderRadius;