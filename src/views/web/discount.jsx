import "./discount.css";

const discount = ({ className, ...props }) => {
  return (
    <div className={"duolingo-pricing " + className}>
      <div className="plans">
        <div className="view-all-plans">View all plans </div>
        <div className="button">
          <div className="background"></div>
          <div className="start-my-free-2-weeks">Start my free 2 weeks </div>
        </div>
        <div className="_7-d-as-grartuitos-despu-s-sd-per-year-6-99-usd-month-billed-annually-plus-applicable-taxes">
          7 días grartuitos, después SD per year ($6.99 USD/month, billed
          annually) plus applicable taxes{" "}
        </div>
        <div className="selected">
          <svg
            className="bb-5-b-95-ca-0592-b-47-dc-211-a-007591099-b-3-svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1604_42395)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5887 30.1755C23.7536 30.1755 30.3727 23.5564 30.3727 15.3915C30.3727 7.22644 23.7536 0.607422 15.5887 0.607422C7.4237 0.607422 0.804688 7.22644 0.804688 15.3915C0.804688 23.5564 7.4237 30.1755 15.5887 30.1755Z"
                fill="#227FFF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.253 17.0578L11.3321 14.2033C10.52 13.4097 9.21825 13.4154 8.41176 14.2036C7.59963 14.9972 7.60513 16.2694 8.41147 17.0574L12.793 21.3391C13.605 22.1327 14.9067 22.127 15.7132 21.3389C15.7947 21.2592 15.868 21.1747 15.9331 21.0863C16.0243 21.0221 16.1114 20.9501 16.1934 20.8699L24.313 12.9352C25.1227 12.1439 25.1274 10.8615 24.3209 10.0734C23.5088 9.27972 22.2032 9.28866 21.3924 10.081L14.253 17.0578Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1604_42395">
                <rect
                  width="30.8"
                  height="29.568"
                  fill="white"
                  transform="translate(0.1875 0.607422)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="group-1171276768">
          <div className="plan">
            <div className="content">
              <div className="start-up">Start up </div>
              <div className="_399-eur-mes">399€ EUR / MES </div>
              <div className="_12-meses">12 meses </div>
            </div>
            <div className="label">
              <div className="label2"></div>
              <div className="_15-miembros">15 miembros </div>
            </div>
          </div>
          <div className="plan2">
            <div className="content">
              <div className="start-up">Start up </div>
              <div className="_399-eur-mes">399€ EUR / MES </div>
              <div className="_12-meses">12 meses </div>
            </div>
            <div className="label">
              <div className="label2"></div>
              <div className="_15-miembros">15 miembros </div>
            </div>
          </div>
          <div className="plan3">
            <div className="content2">
              <div className="_149-eur-mes">149€ EUR / MES </div>
              <div className="_12-meses-5-usuarios">
                <span>
                  <span className="_12-meses-5-usuarios-span">12 MESES</span>
                  <span className="_12-meses-5-usuarios-span2">
                    {" "}
                    5 usuarios
                  </span>
                </span>{" "}
              </div>
            </div>
            <div className="label3">
              <div className="background2"></div>
              <div className="m-s-popular">MÁS POPULAR </div>
            </div>
          </div>
        </div>
        <div className="escoge-tu-plan-perfecto-despu-s-de-tu-7-d-as-de-prueba">
          Escoge tu plan perfecto después de tu 7 días de PRUEBA{" "}
        </div>
      </div>
      <svg
        className="close-icon"
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1604_42403)">
          <path
            d="M1.82031 1.42578L17.5768 17.1823"
            stroke="white"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.42188 17.1823L17.1784 1.42578"
            stroke="white"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1604_42403">
            <rect width="19" height="19" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};


export default discount;