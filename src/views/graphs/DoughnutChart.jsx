import "./DoughnutChart.css";

const DoughnutChart = ({
  prodducts = "2",
  value = "no",
  theme = "light",
  className,
  ...props
}) => {
  const variantsClassName =
    "prodducts-" + prodducts + " value-" + value + " theme-" + theme;

  return (
    <div className={"doughnut-chart " + className + " " + variantsClassName}>
      <div className="rectangle-2051"></div>
      <div className="primary-text">PRIMARY TEXT </div>
      <div className="_5-987-34">5.987,34 </div>
      <div className="secondary-text">Secondary text </div>
      <div className="group-2278">
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
      <div className="group-2282">
        <div className="product-1">Product 1 </div>
        <div className="rectangle-1339"></div>
      </div>
      <div className="group-2283">
        <div className="product-2">Product 2 </div>
        <div className="rectangle-13392"></div>
        <div className="product-3">Product 3 </div>
        <div className="rectangle-1340"></div>
        <div className="product-4">Product 4 </div>
        <div className="rectangle-1341"></div>
        <div className="product-5">Product 5 </div>
        <div className="rectangle-1342"></div>
        <div className="product-6">Product 6 </div>
        <div className="rectangle-1343"></div>
      </div>
      <div className="ellipse-187"></div>
      <div className="ellipse-188"></div>
      <div className="ellipse-189"></div>
      <div className="ellipse-190"></div>
      <div className="ellipse-191"></div>
      <div className="ellipse-192"></div>
    </div>
  );
};


export default DoughnutChart