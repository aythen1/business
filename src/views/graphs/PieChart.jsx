import "./PieChart.css";

const PieChart = ({
  products = "2",
  value = "no",
  theme = "light",
  className,
  ...props
}) => {
  const variantsClassName =
    "products-" + products + " value-" + value + " theme-" + theme;

  return (
    <div className={"pie-chart " + className + " " + variantsClassName}>
      <div className="rectangle-2044"></div>
      <div className="primary-text">PRIMARY TEXT </div>
      <div className="secondary-text">Secondary text </div>
      <div className="group-2275">
        <div className="ellipse-16"></div>
        <div className="group-5">
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
        </div>
      </div>
      <svg
        className="vector-49"
        width="430"
        height="3"
        viewBox="0 0 430 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1.13672H430" stroke="#ECECEC" strokeWidth="2" />
      </svg>
      <div className="_5-987-34">5.987,34 </div>
      <div className="group-2278">
        <div className="product-1">Product 1 </div>
        <div className="rectangle-1339"></div>
      </div>
      <div className="group-2279">
        <div className="product-2">Product 2 </div>
        <div className="rectangle-13392"></div>
        <div className="product-3">Product 3 </div>
        <div className="rectangle-1340"></div>
      </div>
      <div className="ellipse-207"></div>
      <div className="ellipse-209"></div>
      <div className="ellipse-208"></div>
    </div>
  );
};


export default PieChart;