import "./ScatterChart.css";

const ScatterChart = ({
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
    <div className={"scatter-chart " + className + " " + variantsClassName}>
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
    <div className="group-2292">
      <div className="product-1">Product 1 </div>
      <div className="rectangle-1339"></div>
    </div>
    <svg
      className="group-2291"
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
    <div className="_0">0 </div>
    <div className="_10">10 </div>
    <div className="_20">20 </div>
    <div className="_30">30 </div>
    <div className="_40">40 </div>
    <div className="_50">50 </div>
    <div className="_60">60 </div>
    <div className="_102">10 </div>
    <div className="_202">20 </div>
    <div className="_302">30 </div>
    <div className="_402">40 </div>
    <div className="_502">50 </div>
    <div className="_602">60 </div>
    <div className="ellipse-263"></div>
    <div className="ellipse-265"></div>
    <div className="ellipse-264"></div>
    <div className="ellipse-266"></div>
    <div className="ellipse-267"></div>
    <div className="ellipse-279"></div>
    <div className="ellipse-280"></div>
    <div className="ellipse-281"></div>
    <div className="ellipse-282"></div>
    <div className="ellipse-283"></div>
    <div className="ellipse-284"></div>
    <div className="ellipse-285"></div>
    <div className="ellipse-268"></div>
    <div className="ellipse-269"></div>
    <div className="ellipse-270"></div>
    <div className="ellipse-271"></div>
    <div className="ellipse-272"></div>
    <div className="ellipse-273"></div>
    <div className="ellipse-274"></div>
    <div className="ellipse-286"></div>
    <div className="ellipse-287"></div>
    <div className="ellipse-288"></div>
    <div className="ellipse-289"></div>
    <div className="ellipse-290"></div>
    <div className="ellipse-291"></div>
    <div className="ellipse-292"></div>
    <div className="ellipse-293"></div>
    <div className="ellipse-294"></div>
    <div className="ellipse-295"></div>
    <div className="ellipse-296"></div>
    <div className="ellipse-297"></div>
    <div className="ellipse-298"></div>
    <div className="ellipse-299"></div>
    <div className="ellipse-300"></div>
    <div className="ellipse-301"></div>
    <div className="ellipse-302"></div>
    <div className="ellipse-303"></div>
    <div className="ellipse-304"></div>
    <div className="ellipse-305"></div>
    <div className="ellipse-306"></div>
    <div className="ellipse-307"></div>
    <div className="ellipse-308"></div>
    <div className="ellipse-309"></div>
    <div className="ellipse-310"></div>
    <div className="ellipse-311"></div>
    <div className="ellipse-312"></div>
    <div className="ellipse-313"></div>
    <div className="ellipse-314"></div>
    <div className="ellipse-315"></div>
    <div className="ellipse-316"></div>
    <div className="ellipse-317"></div>
    <div className="ellipse-318"></div>
    <div className="ellipse-319"></div>
    <div className="ellipse-320"></div>
    <div className="ellipse-321"></div>
    <div className="ellipse-322"></div>
    <div className="ellipse-323"></div>
    <div className="ellipse-324"></div>
    <div className="ellipse-325"></div>
    <div className="ellipse-326"></div>
    <div className="ellipse-327"></div>
    <div className="ellipse-328"></div>
    <div className="ellipse-329"></div>
    <div className="ellipse-330"></div>
    <div className="ellipse-331"></div>
    <div className="ellipse-332"></div>
    <div className="ellipse-333"></div>
    <div className="ellipse-275"></div>
    <div className="ellipse-276"></div>
    <div className="ellipse-277"></div>
    <div className="ellipse-278"></div>
    <div className="product-2">Product 2 </div>
    <div className="rectangle-1342"></div>
    <div className="product-3">Product 3 </div>
    <div className="rectangle-1343"></div>
  </div>
  );
};


export default ScatterChart;