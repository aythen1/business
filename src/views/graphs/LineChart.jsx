import "./LineChart.css";

const LineChart = ({
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
<div className={"line-chart " + className + " " + variantsClassName}>
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
      <div className="jan">Jan </div>
      <div className="feb">Feb </div>
      <div className="mar">Mar </div>
      <div className="apr">Apr </div>
      <div className="mai">Mai </div>
      <div className="jun">Jun </div>
      <div className="group-2278">
        <div className="ellipse-27"></div>
        <div className="ellipse-28"></div>
        <div className="ellipse-29"></div>
        <div className="ellipse-30"></div>
        <div className="ellipse-31"></div>
        <div className="ellipse-32"></div>
        <div className="ellipse-33"></div>
      </div>
      <svg
        className="vector-52"
        width="320"
        height="108"
        viewBox="0 0 320 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 108L55 80L107.5 108L160.5 0L213.5 53L266.5 26.5L319.5 108"
          stroke="#165BAA"
          strokeWidth="2"
        />
      </svg>
      <div className="group-2280">
        <div className="ellipse-34"></div>
        <div className="ellipse-35"></div>
        <div className="ellipse-36"></div>
        <div className="ellipse-37"></div>
        <div className="ellipse-38"></div>
        <div className="ellipse-39"></div>
        <div className="ellipse-40"></div>
      </div>
      <svg
        className="vector-53"
        width="319"
        height="83"
        viewBox="0 0 319 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 26L54 0.5L106.5 26L159 54.5L212.5 82.5L265.5 54.5L319 26"
          stroke="#A155B9"
          strokeWidth="2"
        />
      </svg>
      <div className="ellipse-41"></div>
      <div className="ellipse-42"></div>
      <div className="ellipse-43"></div>
      <div className="ellipse-44"></div>
      <div className="ellipse-45"></div>
      <div className="ellipse-46"></div>
      <div className="ellipse-47"></div>
      <svg
        className="vector-54"
        width="318"
        height="58"
        viewBox="0 0 318 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 0L52.5 27L105.5 0L158.5 27L211.5 57.5L264.5 27L317.5 0"
          stroke="#F765A3"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
 

export default LineChart;