import "./BubbleChart.css";

const BubbleChart = ({
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
    <div className={"bubble-chart " + className + " " + variantsClassName}>
      <div className="rectangle-2042"></div>
      <div className="primary-text">PRIMARY TEXT </div>
      <div className="_5-987-34">5.987,34 </div>
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
      <div className="ellipse-94"></div>
      <div className="ellipse-95"></div>
      <div className="ellipse-96"></div>
      <div className="ellipse-97"></div>
      <div className="ellipse-98"></div>
      <div className="ellipse-99"></div>
      <div className="ellipse-100"></div>
      <div className="ellipse-101"></div>
      <div className="ellipse-102"></div>
      <div className="ellipse-103"></div>
      <div className="ellipse-104"></div>
      <div className="ellipse-105"></div>
      <div className="ellipse-106"></div>
      <div className="ellipse-107"></div>
      <div className="ellipse-108"></div>
      <div className="ellipse-109"></div>
      <div className="ellipse-110"></div>
      <div className="ellipse-111"></div>
      <div className="ellipse-112"></div>
      <div className="ellipse-113"></div>
      <div className="ellipse-114"></div>
      <div className="ellipse-115"></div>
      <div className="ellipse-116"></div>
      <div className="ellipse-117"></div>
      <div className="ellipse-118"></div>
    </div>
  );
};


export default BubbleChart;