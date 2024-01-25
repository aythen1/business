import "./Radar.css";

const Radar = ({
  products = "1",
  value = "no",
  theme = "light",
  className,
  ...props
}) => {
  const variantsClassName =
    "products-" + products + " value-" + value + " theme-" + theme;

  return (
    <div className={"radar " + className + " " + variantsClassName}>
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
      <svg
        className="vector-71"
        width="115"
        height="100"
        viewBox="0 0 115 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.6"
          d="M49.5 15.5L0.5 60.5L63.5 79.5L111.5 100L102.5 46.5L114.5 15.5L82.5 0.5L49.5 15.5Z"
          fill="#E697FF"
          stroke="#A155B9"
          strokeWidth="2"
        />
      </svg>
      <div className="_100">100 </div>
      <div className="_80">80 </div>
      <div className="_60">60 </div>
      <div className="_40">40 </div>
      <div className="_20">20 </div>
      <div className="group-2291">
        <div className="product-1">Product 1 </div>
        <div className="rectangle-1339"></div>
        <div className="product-2">Product 2 </div>
        <div className="rectangle-1340"></div>
        <div className="product-3">Product 3 </div>
        <div className="rectangle-1341"></div>
        <div className="product-4">Product 4 </div>
        <div className="rectangle-1342"></div>
      </div>
      <svg
        className="group-2294"
        width="215"
        height="225"
        viewBox="0 0 215 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.887 40.8209L107.5 0.554958L191.113 40.8209L211.764 131.298L153.902 203.854H61.0983L3.2363 131.298L23.887 40.8209Z"
          stroke="#BDBDBD"
        />
        <path
          d="M41.0873 54.5376L107.5 22.555L173.913 54.5376L190.315 126.402L144.356 184.033H70.6437L24.6847 126.402L41.0873 54.5376Z"
          stroke="#BDBDBD"
        />
        <path
          d="M56.7239 67.0074L107.5 42.555L158.276 67.0074L170.817 121.952L135.679 166.013H79.3214L44.1833 121.952L56.7239 67.0074Z"
          stroke="#BDBDBD"
        />
        <path
          d="M74.706 81.3477L107.5 65.555L140.294 81.3477L148.393 116.834L125.699 145.291H89.3007L66.6066 116.834L74.706 81.3477Z"
          stroke="#BDBDBD"
        />
        <path
          d="M91.1245 94.441L107.5 86.555L123.875 94.441L127.92 112.161L116.588 126.371H98.4123L87.0801 112.161L91.1245 94.441Z"
          stroke="#BDBDBD"
        />
        <path d="M3.5 131L107.5 107.5L190.5 41" stroke="#BDBDBD" />
        <path
          d="M154.32 204.122L108.295 107.945L25.0122 41.7994"
          stroke="#BDBDBD"
        />
        <path
          d="M108.271 0.915966L107.936 107.537L61.0644 203.007"
          stroke="#BDBDBD"
        />
        <path d="M108 108L211.5 131.5" stroke="#BDBDBD" />
      </svg>
      <svg
        className="vector-70"
        width="95"
        height="170"
        viewBox="0 0 95 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.6"
          d="M0.5 68.5L48.5 0.5L63.5 93.5L95 116.5L56.5 122.5L17.5 169.5L34.5 109.5L0.5 68.5Z"
          fill="#63ABFD"
          stroke="#165BAA"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="group-2295"
        width="193"
        height="174"
        viewBox="0 0 193 174"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="106.5" cy="2.5" r="2.5" fill="#165BAA" />
        <circle cx="58.5" cy="70.5" r="2.5" fill="#165BAA" />
        <circle cx="92.5" cy="111.5" r="2.5" fill="#165BAA" />
        <circle cx="75.5" cy="171.5" r="2.5" fill="#165BAA" />
        <circle cx="114.5" cy="124.5" r="2.5" fill="#165BAA" />
        <circle cx="152.5" cy="118.5" r="2.5" fill="#165BAA" />
        <circle cx="121.5" cy="95.5" r="2.5" fill="#165BAA" />
        <circle cx="24.5" cy="127.5" r="2.5" fill="#A155B9" />
        <circle cx="87.5" cy="146.5" r="2.5" fill="#A155B9" />
        <circle cx="135.5" cy="166.5" r="2.5" fill="#A155B9" />
        <circle cx="138.5" cy="82.5" r="2.5" fill="#A155B9" />
        <circle cx="106.5" cy="24.5" r="2.5" fill="#F765A3" />
        <circle cx="173.5" cy="55.5" r="2.5" fill="#F765A3" />
        <circle cx="169.5" cy="122.5" r="2.5" fill="#F765A3" />
        <circle cx="124.5" cy="145.5" r="2.5" fill="#F765A3" />
        <circle cx="126.5" cy="113.5" r="2.5" fill="#A155B9" />
        <circle cx="106.5" cy="67.5" r="2.5" fill="#A155B9" />
        <circle cx="73.5" cy="82.5" r="2.5" fill="#A155B9" />
        <circle cx="124.5" cy="145.5" r="2.5" fill="#F765A3" />
        <circle cx="86.5" cy="112.5" r="2.5" fill="#F765A3" />
        <circle cx="39.5" cy="55.5" r="2.5" fill="#F765A3" />
        <circle cx="97.5" cy="127.5" r="2.5" fill="#F765A3" />
        <path
          opacity="0.6"
          d="M106.5 24.5L39.5 55.5L86.5 112.5L97.5 127.5L124.5 145.5L169.5 122.5L173.5 55.5L106.5 24.5Z"
          fill="#FFA5CB"
          stroke="#F765A3"
          strokeWidth="2"
        />
        <circle cx="39.5" cy="55.5" r="2.5" fill="#16BFD6" />
        <circle cx="2.5" cy="131.5" r="2.5" fill="#16BFD6" />
        <circle cx="97.5" cy="127.5" r="2.5" fill="#16BFD6" />
        <circle cx="126.5" cy="114.5" r="2.5" fill="#16BFD6" />
        <circle cx="190.5" cy="42.5" r="2.5" fill="#16BFD6" />
        <circle cx="106.5" cy="44.5" r="2.5" fill="#16BFD6" />
        <path
          opacity="0.6"
          d="M2.5 131.5L39.5 55.5L106.5 44.5L190.5 42.5L126.5 114L97.5 127.5L2.5 131.5Z"
          fill="#82F0FF"
          stroke="#16BFD6"
          strokeWidth="2"
        />
      </svg>
      <div className="jan">Jan </div>
      <div className="feb">Feb </div>
      <div className="mar">Mar </div>
      <div className="apr">Apr </div>
      <div className="may">May </div>
      <div className="jun">Jun </div>
      <div className="jul">Jul </div>
    </div>
  );
};


export default Radar;