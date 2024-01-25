import "./LineStyling.css";

const LineStyling = ({
  value = "no",
  size = "small",
  theme = "light",
  className,
  ...props
}) => {
  const variantsClassName =
    "value-" + value + " size-" + size + " theme-" + theme;

  return (
    <div className={"line-styling " + className + " " + variantsClassName}>
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
      </div>
      <div className="group-2278">
        <div className="product-2">Product 2 </div>
        <div className="rectangle-13392"></div>
      </div>
      <div className="group-2279">
        <div className="product-3">Product 3 </div>
        <div className="rectangle-13393"></div>
      </div>
      <div className="jan">Jan </div>
      <div className="feb">Feb </div>
      <div className="mar">Mar </div>
      <div className="apr">Apr </div>
      <div className="mai">Mai </div>
      <div className="jun">Jun </div>
      <svg
        className="vector-58"
        width="214"
        height="81"
        viewBox="0 0 214 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 27V81H213.5L159.5 0L107 27L54 53.5L0.5 27Z"
          fill="#165BAA"
        />
      </svg>
      <svg
        className="vector-59"
        width="107"
        height="84"
        viewBox="0 0 107 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M52.5 27.5L0.5 0H107V84L52.5 27.5Z" fill="#165BAA" />
      </svg>
      <div className="ellipse-80"></div>
      <div className="ellipse-81"></div>
      <div className="ellipse-82"></div>
      <div className="ellipse-83"></div>
      <div className="ellipse-84"></div>
      <div className="ellipse-85"></div>
      <div className="ellipse-86"></div>
      <svg
        className="vector-60"
        width="320"
        height="108"
        viewBox="0 0 320 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 82L54.5 27.5L107.5 82L160.5 107.5L214 27.5L267 0L319.5 27.5"
          stroke="#A155B9"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="vector-61"
        width="320"
        height="81"
        viewBox="0 0 320 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 54L54 81L108.5 54L159.5 24L211.5 0L266 27L320 54"
          stroke="#F765A3"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
      <div className="ellipse-87"></div>
      <div className="ellipse-88"></div>
      <div className="ellipse-89"></div>
      <div className="ellipse-90"></div>
      <div className="ellipse-91"></div>
      <div className="ellipse-92"></div>
      <div className="ellipse-93"></div>
    </div>
  );
};


export default LineStyling;