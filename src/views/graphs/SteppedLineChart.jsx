import "./SteppedLineChart.css";

const SteppedLineChart = ({
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
      className={"stepped-line-chart " + className + " " + variantsClassName}
    >
      <div className="rectangle-2042"></div>
      <div className="primary-text">PRIMARY TEXT </div>
      <div className="_5-987-37">5.987,37 </div>
      <div className="secondary-text">Secondary text </div>
      <div className="group-2275">
        <div className="ellipse-16"></div>
        <div className="group-5">
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
        </div>
      </div>
      <svg
        className="group-2276"
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
        className="vector-49"
        width="430"
        height="2"
        viewBox="0 0 430 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1H430" stroke="#ECECEC" strokeWidth="2" />
      </svg>
      <div className="group-2277">
        <div className="product-1">Product 1 </div>
        <div className="rectangle-1339"></div>
        <div className="product-2">Product 2 </div>
        <div className="rectangle-1340"></div>
        <div className="product-3">Product 3 </div>
        <div className="rectangle-1341"></div>
      </div>
      <div className="day-1">Day 1 </div>
      <div className="day-2">Day 2 </div>
      <div className="day-3">Day 3 </div>
      <div className="day-4">Day 4 </div>
      <div className="day-5">Day 5 </div>
      <div className="day-6">Day 6 </div>
      <div className="ellipse-48"></div>
      <div className="ellipse-49"></div>
      <div className="ellipse-50"></div>
      <div className="ellipse-51"></div>
      <div className="ellipse-52"></div>
      <div className="ellipse-53"></div>
      <div className="ellipse-54"></div>
      <div className="ellipse-55"></div>
      <div className="ellipse-58"></div>
      <div className="ellipse-56"></div>
      <div className="ellipse-57"></div>
      <svg
        className="vector-55"
        width="321"
        height="109"
        viewBox="0 0 321 109"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 82H54V55H107V109H213V55H266.5V27V0.5H321"
          stroke="#165BAA"
          strokeWidth="2"
        />
      </svg>
      <div className="ellipse-59"></div>
      <div className="ellipse-60"></div>
      <div className="ellipse-61"></div>
      <div className="ellipse-62"></div>
      <div className="ellipse-63"></div>
      <div className="ellipse-64"></div>
      <div className="ellipse-65"></div>
      <div className="ellipse-66"></div>
      <div className="ellipse-67"></div>
      <div className="ellipse-68"></div>
      <div className="ellipse-69"></div>
      <svg
        className="vector-56"
        width="321"
        height="108"
        viewBox="0 0 321 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 27H54.5V0H107V27H213V81H266V108H321"
          stroke="#A155B9"
          strokeWidth="2"
        />
      </svg>
      <div className="ellipse-70"></div>
      <div className="ellipse-71"></div>
      <div className="ellipse-72"></div>
      <div className="ellipse-73"></div>
      <div className="ellipse-74"></div>
      <div className="ellipse-75"></div>
      <div className="ellipse-76"></div>
      <div className="ellipse-77"></div>
      <div className="ellipse-78"></div>
      <div className="ellipse-79"></div>
      <svg
        className="vector-57"
        width="321"
        height="58"
        viewBox="0 0 321 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 27.5H54.5V0H108H160.5V27.5V58H321"
          stroke="#F765A3"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};


export default SteppedLineChart;