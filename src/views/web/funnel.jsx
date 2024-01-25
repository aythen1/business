import "./funnel.css";
import TopBar from "./components/TopBar";

const funnel = ({ className, ...props }) => {
  return (
    <div className={"basecamp-pricing " + className}>
      <div className="legal">
        <svg
          className="logo"
          width="108"
          height="31"
          viewBox="0 0 108 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M89.7383 29.4217C88.0975 27.7847 88.13 25.0869 89.7383 23.4293C91.1024 22.0642 91.1026 19.8557 89.7383 18.4929C88.3838 17.14 86.1735 17.167 84.8015 18.4929C83.1502 20.1446 80.4617 20.1447 78.8081 18.4929C77.1672 16.8539 77.2 14.1429 78.8082 12.4847C80.1587 11.1339 80.1319 8.91408 78.8082 7.5465C77.1508 5.89074 77.1507 3.21085 78.8082 1.55496C80.4614 -0.101749 83.1505 -0.101749 84.8022 1.55553C86.4435 3.19425 86.4107 5.88804 84.8014 7.5465C83.4392 8.9106 83.4392 11.1199 84.8019 12.4847C86.1569 13.8364 88.3672 13.8098 89.7383 12.4847C91.3917 10.831 94.0907 10.8306 95.7423 12.4847C97.3859 14.1222 97.3536 16.8336 95.7423 18.4929C94.3802 19.8553 94.3795 22.0644 95.7423 23.4299C97.4025 25.0831 97.4033 27.7684 95.7423 29.4223C94.0914 31.0755 91.392 31.0755 89.7383 29.4217ZM95.7416 1.55863C97.4026 3.2189 97.4026 5.90624 95.7418 7.56634C94.0846 9.22499 91.3929 9.22499 89.7385 7.56686C88.0741 5.90755 88.075 3.21871 89.7385 1.55924C91.3937 -0.102979 94.0848 -0.102978 95.7416 1.55863ZM106.667 12.4845C108.327 14.1448 108.327 16.8326 106.667 18.4927C105.01 20.1513 102.318 20.1508 100.664 18.4927C98.9992 16.8334 99.0001 14.1445 100.664 12.4851C102.318 10.8229 105.01 10.8229 106.667 12.4845ZM9.12513 9.417V11.2978L5.77415 14.2044C7.94546 14.2557 9.56965 15.5894 9.56965 17.8121C9.56965 19.7785 8.04803 21.8473 5.07318 21.8473C3.46608 21.8473 2.14962 21.437 0.457031 20.2743L1.56833 18.65C2.93608 19.5049 3.8764 19.881 5.00479 19.881C6.42383 19.881 7.26157 19.0603 7.26157 17.8292C7.26157 16.5811 6.30415 15.88 4.88511 15.88C4.13285 15.88 3.68834 16.0168 3.44898 16.1023L2.44027 14.7173L6.35545 11.3319H1.08961V9.417H9.12513ZM10.4511 11.3319H16.6572C14.6056 14.0677 12.6566 17.9148 12.1607 21.5566H14.7424C15.3066 17.6411 17.2215 13.7086 19.3073 11.1439V9.417H10.4511V11.3319ZM19.0899 15.2646C19.0899 13.777 20.3893 12.5288 22.7316 12.5288C24.2019 12.5288 25.2619 12.8708 26.4928 13.8967L25.296 15.35C24.2361 14.5293 23.5693 14.3241 22.6803 14.3241C21.7912 14.3241 21.21 14.6832 21.21 15.1962C21.21 15.7394 21.733 15.8547 23.0845 16.1526C23.1366 16.164 23.1899 16.1757 23.2445 16.1878C25.6381 16.7179 26.6296 17.3505 26.6296 18.9748C26.6296 20.6504 25.2619 21.8302 22.8854 21.8302C21.2783 21.8302 20.0815 21.437 18.6625 20.1717L19.9448 18.7354C21.2271 19.7785 21.9109 20.0349 22.9367 20.0349C23.8086 20.0349 24.4584 19.7101 24.4584 19.1116C24.4584 18.4475 23.6834 18.2806 22.5796 18.0429C22.4899 18.0235 22.398 18.0037 22.3042 17.9832C19.8422 17.436 19.0899 16.8205 19.0899 15.2646ZM30.3834 10.4771C30.3834 11.1952 29.802 11.7766 29.0669 11.7766C28.3317 11.7766 27.7504 11.1952 27.7504 10.4771C27.7504 9.75897 28.3317 9.17763 29.0669 9.17763C29.802 9.17763 30.3834 9.75897 30.3834 10.4771ZM27.9556 21.5566V12.8195H30.1781V21.5566H27.9556ZM38.0864 13.7941C37.5564 13.0075 36.7016 12.5288 35.4194 12.5288C33.2138 12.5288 31.5725 14.3241 31.5725 16.9402C31.5725 19.5733 33.2138 21.3515 35.4194 21.3515C36.599 21.3515 37.4197 20.9239 37.9667 20.2401V20.941C37.9667 22.4799 37.0265 23.0613 35.8297 23.0613C34.8209 23.0613 34.0174 22.7535 32.7864 22.0183L31.7093 23.6255C33.1283 24.5488 34.479 24.9078 35.8638 24.9078C38.2746 24.9078 40.1381 23.6255 40.1381 21.1292V12.8195H38.0864V13.7941ZM35.9151 19.4707C34.6499 19.4707 33.8123 18.4448 33.8123 16.9402C33.8123 15.4355 34.6499 14.4267 35.9151 14.4267C37.1461 14.4267 38.0351 15.4355 38.0351 16.9402C38.0351 18.4448 37.1461 19.4707 35.9151 19.4707ZM46.6615 12.5288C45.4647 12.5288 44.5757 13.0246 44.0285 13.8112V12.8195H41.9598V21.5566H44.1824V16.2904C44.1824 15.1962 44.9176 14.4438 45.9434 14.4438C47.0034 14.4438 47.5676 15.0936 47.5676 16.2391V21.5566H49.7902V15.5723C49.7902 13.7941 48.696 12.5288 46.6615 12.5288ZM55.4416 12.5288C53.7148 12.5288 52.4497 13.1957 51.3555 14.4951L52.7575 15.7775C53.6636 14.9055 54.2791 14.3583 55.4758 14.3583C56.4846 14.3583 57.1171 14.8371 57.1171 15.692V15.8971L55.0655 16.2733C53.0823 16.6324 51.2871 17.3334 51.2871 19.3509C51.2871 21.1292 52.7575 21.8473 54.4159 21.8473C55.7665 21.8473 56.7068 21.3857 57.2369 20.6504V21.5566H59.2372V15.6578C59.2372 13.8112 57.9549 12.5288 55.4416 12.5288ZM54.792 20.0691C53.9542 20.0691 53.4584 19.7443 53.4584 19.1971C53.4584 18.3764 54.3304 18.0687 55.6468 17.795L57.1171 17.4873V18.0003C57.1171 19.522 55.9204 20.0691 54.792 20.0691ZM61.0931 9.417V21.5566H63.3157V9.417H61.0931ZM64.881 15.2646C64.881 13.777 66.1804 12.5288 68.5227 12.5288C69.993 12.5288 71.053 12.8708 72.284 13.8967L71.0872 15.35C70.0272 14.5293 69.3604 14.3241 68.4714 14.3241C67.5823 14.3241 67.0011 14.6832 67.0011 15.1962C67.0011 15.7394 67.5242 15.8547 68.8756 16.1526C68.9277 16.164 68.981 16.1757 69.0356 16.1878C71.4292 16.7179 72.4207 17.3505 72.4207 18.9748C72.4207 20.6504 71.053 21.8302 68.6766 21.8302C67.0695 21.8302 65.8727 21.437 64.4536 20.1717L65.7359 18.7354C67.0182 19.7785 67.702 20.0349 68.7278 20.0349C69.5997 20.0349 70.2495 19.7101 70.2495 19.1116C70.2495 18.4475 69.4745 18.2806 68.3708 18.0429C68.281 18.0235 68.1891 18.0037 68.0953 17.9832C65.6333 17.436 64.881 16.8205 64.881 15.2646Z"
            fill="white"
          />
        </svg>
        <div className="built-by">
          <div className="a">
            <svg
              className="icon-basecamp-453-e-0-f-836-ee-2-bd-663-f-0-fb-72402-f-92244-bef-7-fc-7-bd-2-f-8-c-0-bb-87-e-6913738-c-6-c-732-svg"
              width="31"
              height="32"
              viewBox="0 0 31 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1604_41529)">
                <path
                  d="M15.8562 28.9727C10.9803 29.037 6.31656 26.9812 3.07474 23.3384C2.72849 22.9538 2.62451 22.4087 2.80488 21.9237C3.67988 19.5685 6.0759 14.0896 9.06888 14.0733C10.5899 14.0733 11.7266 15.2835 12.6425 16.2484C12.9461 16.5852 13.2712 16.902 13.6156 17.1971C14.9008 15.5713 15.9726 13.7877 16.8048 11.8898C17.1499 11.2343 17.9485 10.9644 18.6204 11.2764C19.2924 11.5884 19.6016 12.3725 19.3235 13.0592C16.0525 20.0674 14.3025 20.0674 13.7301 20.0674C12.4544 20.0674 11.5303 19.0861 10.6389 18.1456C10.2383 17.7204 9.40414 16.8373 9.08522 16.8373C8.37381 16.9599 6.82821 19.405 5.71609 22.0872C8.39583 24.7779 12.0596 26.2552 15.8562 26.176C21.3434 26.176 25.4403 24.6795 27.2066 22.0872C26.6015 15.1608 22.7581 5.66672 15.8562 5.66672C10.0093 5.66672 5.60978 9.75552 2.77217 17.7695C2.48565 18.4461 1.72202 18.783 1.02914 18.5382C0.336257 18.2936 -0.0465482 17.552 0.155361 16.8454C3.42637 7.58841 8.70907 2.89453 15.8562 2.89453C25.1868 2.89453 29.5127 14.8174 30.0116 22.3407C30.0325 22.625 29.97 22.9092 29.8316 23.1585C27.6564 26.8956 22.6927 28.9727 15.8562 28.9727Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1604_41529">
                  <rect
                    width="30.3552"
                    height="30.3552"
                    fill="white"
                    transform="translate(0.101562 0.957031)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="basecamp">Basecamp </div>
          </div>
          <div className="is-designed-built-and-backed-by-37-signals-enjoy-the-rest-of-your">
            <span>
              <span className="is-designed-built-and-backed-by-37-signals-enjoy-the-rest-of-your-span">
                is designed, built, and backed by{" "}
              </span>
              <span className="is-designed-built-and-backed-by-37-signals-enjoy-the-rest-of-your-span2">
                37signals
              </span>
              <span className="is-designed-built-and-backed-by-37-signals-enjoy-the-rest-of-your-span3">
                . Enjoy the rest of your
              </span>
            </span>{" "}
          </div>
          <div className="sunday">Sunday </div>
          <div className="div">! </div>
        </div>
      </div>
      <div className="footer">
        <div className="awards">
          <img className="app-store-ratings" src="app-store-ratings0.png" />
          <div className="awards2">
            <img className="award" src="award0.png" />
            <img className="award2" src="award1.png" />
            <img className="award3" src="award2.png" />
            <img className="award4" src="award3.png" />
            <img className="award5" src="award4.png" />
          </div>
          <img className="play-store-ratings" src="play-store-ratings0.png" />
        </div>
        <div className="site-map">
          <div className="links">
            <div className="product">
              <div className="product2">Product </div>
              <div className="pricing">Pricing </div>
              <div className="features">Features </div>
              <div className="apps-desktop">Apps + Desktop </div>
              <div className="integrations">Integrations </div>
              <div className="updates">Updates </div>
              <div className="status">Status </div>
            </div>
            <div className="company">
              <div className="company2">Company </div>
              <div className="about">About </div>
              <div className="customers">Customers </div>
              <div className="newsletter">Newsletter </div>
              <div className="handbook">Handbook </div>
              <div className="podcast">Podcast </div>
              <div className="jobs">Jobs </div>
            </div>
            <div className="resources">
              <div className="resources2">Resources </div>
              <div className="support">Support </div>
              <div className="learn">Learn </div>
              <div className="articles">Articles </div>
              <div className="remote-resources">Remote Resources </div>
              <div className="customer-rights">Customer Rights </div>
              <div className="policies-terms">Policies &amp; Terms </div>
              <div className="books">Books </div>
            </div>
            <div className="and-more">
              <div className="and-more2">And more… </div>
              <div className="we-small-business">We ❤️ small business </div>
              <div className="new-features">New Features </div>
              <div className="before-after">Before &amp; After </div>
              <div className="yes-yes-and-yes">Yes, Yes, and Yes </div>
              <div className="dazzle-your-clients">Dazzle your clients </div>
              <div className="long-thoughts">Long Thoughts </div>
            </div>
          </div>
          <div className="contact-us">
            <div className="contact">
              <div className="we-re-here-to-help">We’re here to help. </div>
              <div className="always-humans-never-bots-for-pre-sales-questions-existing-customers-who-need-a-hand-or-other-inquiries-contact-us-and-we-ll-get-back-to-you-within-an-hour">
                <span>
                  <span className="always-humans-never-bots-for-pre-sales-questions-existing-customers-who-need-a-hand-or-other-inquiries-contact-us-and-we-ll-get-back-to-you-within-an-hour-span">
                    Always humans, never bots. For pre-sales questions, existing
                    customers who need a hand, or other inquiries,{" "}
                  </span>
                  <span className="always-humans-never-bots-for-pre-sales-questions-existing-customers-who-need-a-hand-or-other-inquiries-contact-us-and-we-ll-get-back-to-you-within-an-hour-span2">
                    contact us
                  </span>
                  <span className="always-humans-never-bots-for-pre-sales-questions-existing-customers-who-need-a-hand-or-other-inquiries-contact-us-and-we-ll-get-back-to-you-within-an-hour-span3">
                    {" "}
                    and{" "}
                  </span>
                  <span className="always-humans-never-bots-for-pre-sales-questions-existing-customers-who-need-a-hand-or-other-inquiries-contact-us-and-we-ll-get-back-to-you-within-an-hour-span4">
                    we’ll get back to you within an hour.
                  </span>
                </span>{" "}
              </div>
            </div>
            <div className="hey-email-advert">
              <div className="if-you-love-basecamp-you-ll-love">
                If you love Basecamp, you’ll love{" "}
              </div>
              <div className="logo2">
                <svg
                  className="icon-hey-b-7-d-8-bcc-0468-e-86-b-7-e-71977-eff-316-f-7-ebdc-58-f-41-f-2-a-0-e-6076-a-66-f-69-cbeac-12-b-70-svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_41587)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.8571 16.3723C14.784 16.4786 14.7191 16.5196 14.6624 16.5356C14.2454 16.0407 14.2432 13.0867 14.7027 10.6676C15.5713 14.8427 15.0656 16.0694 14.8571 16.3723ZM17.3625 5.96474C16.5465 6.15493 15.7162 6.67002 15.0575 7.33354C14.3317 4.75591 12.7548 0.859401 11.2203 0.223101C10.7646 0.0336289 10.4065 0.143284 10.1879 0.268605C9.22678 0.815762 8.59903 2.63104 9.14772 6.04642C7.02583 2.1693 6.28584 2.17415 5.94494 2.17191C5.61599 2.17266 5.33141 2.36735 5.18481 2.69258C4.95358 3.20356 4.51197 4.79321 5.613 8.2123C4.26431 6.36642 3.8503 6.1318 3.36991 6.15047C3.19722 6.15831 2.87385 6.23175 2.65044 6.63869C2.23979 7.38839 2.29498 9.3189 3.55117 12.1767C2.98164 11.7545 2.45425 11.506 2.00556 11.5381C1.68293 11.5646 1.4114 11.7373 1.26072 12.0126C0.751233 12.9457 1.84256 15.5763 3.14165 17.3528C4.2106 18.8149 6.36119 21.0651 9.47516 21.0651C9.8903 21.0651 10.3226 21.0248 10.7709 20.9379C11.0801 20.8782 11.2819 20.5791 11.2218 20.2703C11.1614 19.9614 10.8619 19.7601 10.5542 19.8201C7.96724 20.3225 6.01508 18.9018 4.83272 17.6218C3.06966 15.7125 2.29797 13.4187 2.25247 12.7182C2.62321 12.8663 3.68433 13.4951 5.76184 16.1537C5.94904 16.3939 6.29368 16.4439 6.54282 16.2653C6.79085 16.087 6.85391 15.7442 6.68569 15.4891C3.76862 11.0693 3.4859 8.3954 3.58176 7.48946C4.437 8.36336 6.57678 11.5717 8.1888 13.9882C8.35773 14.2419 8.6964 14.3176 8.95673 14.1602C9.21706 14.0024 9.30846 13.6682 9.16301 13.4008C5.81366 7.23693 5.9207 4.42096 6.11913 3.49896C6.62005 4.00733 7.96162 5.78604 10.7765 11.9156C10.9052 12.1938 11.2293 12.3214 11.5109 12.2043C11.794 12.0879 11.9339 11.7686 11.8283 11.4818C9.09772 4.03978 10.2842 1.52405 10.7366 1.26072C11.3251 1.279 12.995 4.09871 14.008 7.8087C14.0703 8.03886 14.1307 8.26336 14.1874 8.48158C14.0412 8.74601 13.9274 9.01681 13.8528 9.28721C13.2833 11.3438 12.7533 16.0325 13.8133 17.2913C14.0527 17.5759 14.3724 17.7135 14.7222 17.6789C15.156 17.6359 15.5267 17.4073 15.7949 17.0179C16.7986 15.5588 16.2134 11.8872 15.4119 8.67774C15.9546 7.92474 16.8307 7.25783 17.6214 7.07397C18.1156 6.95833 18.4986 7.04821 18.7601 7.34027C19.2177 7.85348 20.0204 9.7814 17.5912 16.5763C17.4849 16.8725 17.6393 17.1981 17.9358 17.3044C18.229 17.4088 18.5572 17.2559 18.6635 16.9597C20.6007 11.5415 20.9189 8.0504 19.6093 6.58236C19.0663 5.97329 18.27 5.75472 17.3625 5.96474Z"
                      fill="#5522FA"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_41587">
                      <rect
                        width="20.944"
                        height="20.944"
                        fill="white"
                        transform="translate(0.242188 0.121094)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div className="hey">HEY </div>
              </div>
              <div className="our-take-on-email">— our take on email </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="notification">
          <div className="p">
            <div className="we-re-thrilled-to-announce-the-launch-of-our-first-sweepstakes-and-brand-campaign">
              We’re thrilled to announce the launch of our first sweepstakes and
              brand campaign{" "}
            </div>
            <div className="just-let-me-do-my-job">JUST LET ME DO MY JOB. </div>
          </div>
        </div>
        <div className="header-container">
          <TopBar />
          <div className="logo3">
            <div>
            Aythen
              </div>
            <div className="div2">
              <div className="span">
                <svg
                  className="tagline-2044-f-59-af-4-b-54-b-41873-bffcf-29-c-2-abf-18-a-4-e-552-e-76-ffcc-4361783748-a-1-b-5-b-1-e-8-svg"
                  width="77"
                  height="17"
                  viewBox="0 0 77 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_41611)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.18431 2.87805L9.4984 7.11734L14.3125 7.6213L10.9843 11.1228L11.9922 15.83L7.62158 13.7652L3.43067 16.1739L4.05779 11.401L0.459495 8.17769L5.21765 7.28927L7.18431 2.87805ZM22.4955 2.26309L24.8096 6.50238L29.6237 7.00634L26.2955 10.5079L27.3033 15.215L22.9328 13.1503L18.7419 15.5589L19.369 10.7861L15.7707 7.56273L20.5289 6.67431L22.4955 2.26309ZM40.1208 5.88742L37.8067 1.64813L35.8401 6.05935L31.0819 6.94777L34.6802 10.1711L34.0531 14.9439L38.244 12.5353L42.6145 14.6001L41.6067 9.89292L44.9349 6.39138L40.1208 5.88742ZM53.1179 1.03317L55.432 5.27245L60.2461 5.77642L56.9179 9.27795L57.9257 13.9851L53.5552 11.9204L49.3643 14.329L49.9914 9.55615L46.3931 6.33281L51.1512 5.44439L53.1179 1.03317ZM70.7432 4.65749L68.4291 0.418207L66.4624 4.82942L61.7043 5.71785L65.3026 8.94119L64.6755 13.714L68.8664 11.3054L73.2369 13.3702L72.2291 8.66299L75.5573 5.16145L70.7432 4.65749Z"
                      fill="#FFE200"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_41611">
                      <rect
                        width="75.888"
                        height="13.1345"
                        fill="white"
                        transform="translate(0.257812 3.15625) rotate(-2.3)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div className="truly-amazing">“Truly amazing!” </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gradient"></div>
      <div className="body">
        <div className="quotes">
          <div className="quote-row">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q">
                <div className="much">“Much </div>
                <div className="mark-wrapper">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg"
                    width="279"
                    height="28"
                    viewBox="0 0 279 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41623)">
                      <path
                        d="M277.681 5.76444C268.498 6.51067 236.009 5.43819 226.72 5.57874C217.43 5.71929 178.377 4.99137 168.688 4.74182C158.998 4.49227 120.525 3.77272 110.956 3.25038C101.386 2.72805 11.3762 2.02698 1.74098 1.23828C0.903912 6.56546 0.738215 17.2677 0.648438 23.0664C29.2738 24.5539 64.1104 23.5607 108.875 25.1739C153.639 26.7872 157.79 26.2637 167.714 26.4068C177.637 26.5499 216.52 27.0009 226.394 26.6491C236.267 26.2974 254.032 27.5304 277.462 27.3856C277.988 27.1736 278.203 5.77217 277.681 5.76444Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41623">
                        <rect
                          width="277.703"
                          height="27.2485"
                          fill="white"
                          transform="translate(0.46875 0.671875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="easier-to-track-progress">
                    easier to track progress{" "}
                  </div>
                  <div className="mark">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg"
                      width="281"
                      height="25"
                      viewBox="0 0 281 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41627)">
                        <path
                          d="M0.591185 24.2906C9.83744 23.3432 42.609 23.7335 51.9723 23.3944C61.3356 23.0552 100.72 22.9587 110.493 23.0042C120.266 23.0497 159.065 22.9571 168.721 23.2802C178.377 23.6032 269.03 20.838 278.861 22.9864C280.734 23.3613 281.553 1.33546 279.622 0.960903C270.142 -1.07912 180.074 1.57153 170.477 1.13738C160.879 0.703236 121.144 1.07885 111.137 1.14556C101.13 1.21228 61.9208 1.58438 51.9723 2.14883C42.0238 2.71329 24.0938 1.84808 0.474143 2.49217C-0.0525422 2.71707 0.064499 24.2939 0.591185 24.2906Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41627">
                          <rect
                            width="280.595"
                            height="24.5521"
                            fill="white"
                            transform="translate(0.128906 0.121094)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div3">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q2">
                <div className="div4">“ </div>
                <div className="mark-wrapper2">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg2"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41634)">
                      <path
                        d="M326.282 6.65136C315.498 7.52771 277.344 6.26821 266.435 6.43327C255.525 6.59834 209.662 5.74348 198.283 5.45042C186.903 5.15735 141.722 4.31232 130.484 3.69891C119.246 3.08549 13.5399 2.26217 2.22446 1.33594C1.24143 7.59206 1.04684 20.1605 0.941406 26.9704C34.5584 28.7173 75.4697 27.5508 128.04 29.4454C180.611 31.34 185.485 30.7252 197.139 30.8933C208.793 31.0614 254.457 31.591 266.052 31.1779C277.646 30.7648 298.509 32.2129 326.025 32.0428C326.642 31.7938 326.895 6.66043 326.282 6.65136Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41634">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.726562 0.671875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="better-at-supporting-our-clients">
                    Better at supporting our clients{" "}
                  </div>
                  <div className="mark2">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg2"
                      width="287"
                      height="26"
                      viewBox="0 0 287 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41638)">
                        <path
                          d="M1.30974 25.281C10.7096 24.3179 44.0256 24.7147 53.5445 24.3699C63.0634 24.0251 103.102 23.927 113.037 23.9733C122.973 24.0196 162.417 23.9254 172.233 24.2538C182.049 24.5822 274.208 21.7711 284.203 23.9551C286.107 24.3363 286.94 1.94451 284.977 1.56373C275.339 -0.510188 183.774 2.1845 174.018 1.74314C164.261 1.30178 123.865 1.68363 113.692 1.75145C103.519 1.81928 63.6583 2.19756 53.5445 2.77139C43.4307 3.34523 25.2028 2.46564 1.19075 3.12043C0.655316 3.34907 0.774302 25.2844 1.30974 25.281Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41638">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.839844 0.710938)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div5">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row2">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q3">
                <div className="div4">“ </div>
                <div className="mark-wrapper3">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg3"
                    width="190"
                    height="20"
                    viewBox="0 0 190 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41648)">
                      <path
                        d="M188.81 4.42906C182.566 4.93645 160.476 4.20723 154.159 4.3028C147.843 4.39836 121.29 3.90342 114.701 3.73375C108.113 3.56407 81.9538 3.07482 75.4472 2.71966C68.9406 2.36451 7.73953 1.88783 1.18817 1.35156C0.619019 4.9737 0.506355 12.2506 0.445312 16.1933C19.9087 17.2047 43.5954 16.5294 74.0324 17.6263C104.469 18.7232 107.292 18.3673 114.039 18.4646C120.786 18.5619 147.225 18.8685 153.938 18.6293C160.651 18.3902 172.73 19.2286 188.661 19.1301C189.018 18.9859 189.165 4.43432 188.81 4.42906Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41648">
                        <rect
                          width="188.82"
                          height="18.5272"
                          fill="white"
                          transform="translate(0.320312 0.96875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="fewer-meetings">Fewer meetings </div>
                  <div className="mark3">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg3"
                      width="192"
                      height="17"
                      viewBox="0 0 192 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41652)">
                        <path
                          d="M1.17495 16.7064C7.46181 16.0622 29.7444 16.3276 36.1108 16.097C42.4773 15.8664 69.2561 15.8007 75.9011 15.8317C82.5461 15.8627 108.927 15.7997 115.492 16.0194C122.058 16.239 183.696 14.3588 190.381 15.8196C191.654 16.0745 192.211 1.09835 190.898 0.843677C184.452 -0.543407 123.212 1.25886 116.686 0.963672C110.161 0.66848 83.1429 0.92387 76.3388 0.969233C69.5347 1.0146 42.8752 1.2676 36.1108 1.65139C29.3465 2.03519 17.1552 1.4469 1.09536 1.88484C0.737252 2.03776 0.816832 16.7086 1.17495 16.7064Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41652">
                          <rect
                            width="190.787"
                            height="16.6939"
                            fill="white"
                            transform="translate(0.863281 0.273438)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div6">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q4">
                <div className="basecamp3">“Basecamp </div>
                <div className="mark-wrapper4">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg4"
                    width="189"
                    height="20"
                    viewBox="0 0 189 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41659)">
                      <path
                        d="M188.542 4.42699C182.302 4.93403 160.227 4.2053 153.915 4.3008C147.603 4.39631 121.067 3.9017 114.483 3.73214C107.9 3.56257 81.7581 3.07365 75.2559 2.71874C68.7537 2.36383 7.59398 1.88747 1.04704 1.35156C0.478276 4.97126 0.365689 12.2432 0.304688 16.1833C19.755 17.194 43.4256 16.5191 73.8421 17.6153C104.259 18.7115 107.079 18.3558 113.822 18.453C120.564 18.5502 146.985 18.8567 153.693 18.6177C160.402 18.3786 172.473 19.2165 188.393 19.1181C188.75 18.974 188.897 4.43223 188.542 4.42699Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41659">
                        <rect
                          width="188.693"
                          height="18.5147"
                          fill="white"
                          transform="translate(0.179688 0.96875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="made-me-a-hero">made me a hero </div>
                  <div className="mark4">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg4"
                      width="192"
                      height="17"
                      viewBox="0 0 192 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41663)">
                        <path
                          d="M1.22161 16.707C7.50423 16.0633 29.7717 16.3285 36.1339 16.0981C42.496 15.8676 69.2568 15.802 75.8973 15.833C82.5378 15.8639 108.901 15.801 115.462 16.0205C122.023 16.24 183.62 14.3611 190.3 15.8208C191.572 16.0756 192.129 1.10954 190.817 0.855037C184.375 -0.53111 123.176 1.26994 116.655 0.974951C110.134 0.679958 83.1343 0.935176 76.3347 0.980508C69.5352 1.02584 42.8937 1.27867 36.1339 1.66221C29.3741 2.04575 17.1911 1.45785 1.14208 1.8955C0.784212 2.04831 0.863739 16.7093 1.22161 16.707Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41663">
                          <rect
                            width="190.658"
                            height="16.6826"
                            fill="white"
                            transform="translate(0.910156 0.285156)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div7">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q5">
                <div className="div4">“ </div>
                <div className="mark-wrapper5">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg5"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41670)">
                      <path
                        d="M326.274 6.94824C315.49 7.82459 277.336 6.56509 266.427 6.73015C255.518 6.89521 209.654 6.04036 198.275 5.74729C186.896 5.45423 141.714 4.6092 130.476 3.99578C119.238 3.38236 13.5321 2.55905 2.21665 1.63281C1.23362 7.88893 1.03903 20.4574 0.933594 27.2672C34.5506 29.0142 75.4619 27.8477 128.032 29.7423C180.603 31.6369 185.477 31.0221 197.131 31.1902C208.785 31.3582 254.449 31.8878 266.044 31.4747C277.638 31.0617 298.502 32.5097 326.017 32.3397C326.635 32.0907 326.887 6.95731 326.274 6.94824Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41670">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.71875 0.96875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="reduced-miscommunication">
                    Reduced miscommunication{" "}
                  </div>
                  <div className="mark5">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg5"
                      width="286"
                      height="25"
                      viewBox="0 0 286 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41674)">
                        <path
                          d="M1.01677 24.5779C10.4166 23.6147 43.7327 24.0116 53.2515 23.6668C62.7704 23.322 102.809 23.2238 112.744 23.2701C122.68 23.3164 162.124 23.2223 171.94 23.5507C181.756 23.8791 273.916 21.0679 283.91 23.252C285.814 23.6332 286.647 1.24139 284.684 0.860601C275.046 -1.21331 183.481 1.48137 173.725 1.04001C163.968 0.598653 123.572 0.980503 113.399 1.04833C103.226 1.11615 63.3653 1.49443 53.2515 2.06827C43.1377 2.64211 24.9098 1.76251 0.897783 2.41731C0.362347 2.64595 0.481333 24.5813 1.01677 24.5779Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41674">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.546875 0.0078125)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div8">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row3">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q6">
                <div className="div4">“ </div>
                <div className="mark-wrapper6">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg6"
                    width="232"
                    height="23"
                    viewBox="0 0 232 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41684)">
                      <path
                        d="M230.796 4.48982C223.177 5.10898 196.221 4.21912 188.513 4.33573C180.806 4.45235 148.402 3.84838 140.363 3.64133C132.323 3.43427 100.401 2.83725 92.4615 2.40385C84.5216 1.97046 9.83855 1.38878 1.844 0.734375C1.14947 5.15443 1.01199 14.0343 0.9375 18.8456C24.6885 20.0798 53.5931 19.2557 90.735 20.5942C127.877 21.9328 131.321 21.4984 139.555 21.6172C147.788 21.7359 180.051 22.1101 188.243 21.8182C196.434 21.5264 211.175 22.5495 230.615 22.4293C231.051 22.2534 231.23 4.49623 230.796 4.48982Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41684">
                        <rect
                          width="230.415"
                          height="22.6086"
                          fill="white"
                          transform="translate(0.785156 0.265625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="managed-my-chaos">Managed my chaos </div>
                  <div className="mark6">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg6"
                      width="234"
                      height="22"
                      viewBox="0 0 234 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41688)">
                        <path
                          d="M1.36469 20.9467C9.03649 20.1606 36.2277 20.4845 43.9966 20.2031C51.7655 19.9216 84.4434 19.8416 92.5522 19.8793C100.661 19.9171 132.853 19.8403 140.865 20.1083C148.877 20.3764 224.093 18.082 232.251 19.8645C233.805 20.1756 234.484 1.90038 232.882 1.5896C225.016 -0.103048 150.285 2.09624 142.322 1.73602C134.359 1.3758 101.389 1.68745 93.0863 1.74281C84.7833 1.79817 52.251 2.1069 43.9966 2.57524C35.7421 3.04359 20.8652 2.3257 1.26758 2.86012C0.830583 3.04672 0.927694 20.9494 1.36469 20.9467Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41688">
                          <rect
                            width="232.815"
                            height="20.3713"
                            fill="white"
                            transform="translate(0.980469 0.894531)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div9">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q7">
                <div className="div4">“ </div>
                <div className="mark-wrapper7">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg7"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41695)">
                      <path
                        d="M326.176 6.24511C315.392 7.12146 277.238 5.86196 266.329 6.02702C255.42 6.19209 209.557 5.33723 198.177 5.04417C186.798 4.7511 141.616 3.90607 130.378 3.29266C119.14 2.67924 13.4344 1.85592 2.11899 0.929688C1.13596 7.18581 0.94137 19.7543 0.835938 26.5641C34.4529 28.3111 75.3642 27.1446 127.935 29.0392C180.505 30.9338 185.38 30.319 197.034 30.4871C208.688 30.6551 254.351 31.1847 265.946 30.7716C277.541 30.3585 298.404 31.8066 325.92 31.6365C326.537 31.3875 326.79 6.25418 326.176 6.24511Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41695">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.621094 0.265625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="stopped-looking-in-multiple-places">
                    Stopped looking in multiple places{" "}
                  </div>
                  <div className="mark7">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg7"
                      width="287"
                      height="26"
                      viewBox="0 0 287 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41699)">
                        <path
                          d="M1.38005 24.8748C10.7799 23.9116 44.096 24.3084 53.6148 23.9636C63.1337 23.6188 103.172 23.5207 113.108 23.567C123.043 23.6133 162.487 23.5191 172.303 23.8476C182.119 24.176 274.279 21.3648 284.274 23.5489C286.177 23.9301 287.01 1.53826 285.047 1.15748C275.409 -0.916438 183.845 1.77825 174.088 1.33689C164.331 0.895528 123.935 1.27738 113.762 1.3452C103.589 1.41303 63.7286 1.79131 53.6148 2.36514C43.501 2.93898 25.2731 2.05939 1.26106 2.71418C0.725628 2.94282 0.844614 24.8781 1.38005 24.8748Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41699">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.910156 0.304688)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="for-our-work">for our work.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row4">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q8">
                <div className="div10">“ </div>
                <div className="mark-wrapper8">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg8"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41709)">
                      <path
                        d="M326.364 6.54199C315.58 7.41834 277.426 6.15884 266.517 6.3239C255.607 6.48896 209.744 5.63411 198.365 5.34104C186.986 5.04798 141.804 4.20295 130.566 3.58953C119.328 2.97611 13.6219 2.1528 2.30649 1.22656C1.32346 7.48268 1.12887 20.0512 1.02344 26.861C34.6404 28.608 75.5517 27.4415 128.122 29.3361C180.693 31.2307 185.567 30.6159 197.221 30.7839C208.875 30.952 254.539 31.4816 266.134 31.0685C277.728 30.6554 298.591 32.1035 326.107 31.9334C326.724 31.6844 326.977 6.55106 326.364 6.54199Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41709">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.808594 0.5625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="accountability-has-improved">
                    Accountability has improved{" "}
                  </div>
                  <div className="mark8">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg8"
                      width="286"
                      height="26"
                      viewBox="0 0 286 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41713)">
                        <path
                          d="M0.715988 25.1716C10.1159 24.2085 43.4319 24.6053 52.9508 24.2605C62.4696 23.9157 102.508 23.8176 112.444 23.8639C122.379 23.9102 161.823 23.816 171.639 24.1444C181.455 24.4729 273.615 21.6617 283.61 23.8458C285.513 24.2269 286.346 1.83514 284.383 1.45435C274.745 -0.619563 183.181 2.07512 173.424 1.63376C163.667 1.1924 123.271 1.57425 113.098 1.64208C102.925 1.7099 63.0645 2.08818 52.9508 2.66202C42.837 3.23586 24.6091 2.35626 0.597002 3.01106C0.0615657 3.2397 0.180552 25.175 0.715988 25.1716Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41713">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.246094 0.601562)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div11">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q9">
                <div className="div4">“ </div>
                <div className="mark-wrapper9">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg9"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41720)">
                      <path
                        d="M325.762 6.54199C314.978 7.41834 276.824 6.15884 265.915 6.3239C255.006 6.48896 209.143 5.63411 197.763 5.34104C186.384 5.04798 141.202 4.20295 129.964 3.58953C118.726 2.97611 13.0204 2.1528 1.70493 1.22656C0.721898 7.48268 0.527308 20.0512 0.421875 26.861C34.0389 28.608 74.9502 27.4415 127.521 29.3361C180.091 31.2307 184.966 30.6159 196.62 30.7839C208.273 30.952 253.937 31.4816 265.532 31.0685C277.127 30.6554 297.99 32.1035 325.506 31.9334C326.123 31.6844 326.376 6.55106 325.762 6.54199Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41720">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.207031 0.5625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="never-seen-productivity-at-this-level">
                    Never seen productivity at this level{" "}
                  </div>
                  <div className="mark9">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg9"
                      width="287"
                      height="26"
                      viewBox="0 0 287 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41724)">
                        <path
                          d="M1.39958 25.1716C10.7995 24.2085 44.1155 24.6053 53.6343 24.2605C63.1532 23.9157 103.192 23.8176 113.127 23.8639C123.063 23.9102 162.506 23.816 172.323 24.1444C182.139 24.4729 274.298 21.6617 284.293 23.8458C286.197 24.2269 287.03 1.83514 285.067 1.45435C275.429 -0.619563 183.864 2.07512 174.107 1.63376C164.351 1.1924 123.955 1.57425 113.782 1.64208C103.608 1.7099 63.7481 2.08818 53.6343 2.66202C43.5206 3.23586 25.2926 2.35626 1.2806 3.01106C0.745159 3.2397 0.864145 25.175 1.39958 25.1716Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41724">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.929688 0.601562)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div12">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row5">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q10">
                <div className="div4">“ </div>
                <div className="mark-wrapper10">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg10"
                    width="200"
                    height="21"
                    viewBox="0 0 200 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41734)">
                      <path
                        d="M199.239 4.50778C192.662 5.04232 169.389 4.27408 162.735 4.37476C156.081 4.47544 128.107 3.95402 121.166 3.77526C114.225 3.59651 86.6663 3.08108 79.8116 2.70692C72.9569 2.33277 8.48136 1.83058 1.57948 1.26562C0.979875 5.08156 0.861184 12.7477 0.796875 16.9014C21.3017 17.967 46.2556 17.2555 78.3211 18.4111C110.387 19.5667 113.36 19.1917 120.468 19.2942C127.577 19.3967 155.429 19.7198 162.502 19.4678C169.574 19.2158 182.299 20.0991 199.083 19.9954C199.459 19.8435 199.613 4.51332 199.239 4.50778Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41734">
                        <rect
                          width="198.923"
                          height="19.5185"
                          fill="white"
                          transform="translate(0.667969 0.859375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="better-alignment">Better alignment </div>
                  <div className="mark10">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg10"
                      width="202"
                      height="18"
                      viewBox="0 0 202 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41738)">
                        <path
                          d="M0.699433 17.5874C7.32267 16.9088 30.7974 17.1884 37.5045 16.9454C44.2116 16.7025 72.4232 16.6333 79.4237 16.666C86.4242 16.6986 114.217 16.6322 121.133 16.8636C128.05 17.095 192.986 15.1143 200.029 16.6532C201.37 16.9218 201.957 1.14431 200.574 0.876003C193.783 -0.585295 129.266 1.3134 122.391 1.00242C115.516 0.691432 87.053 0.960487 79.8848 1.00828C72.7166 1.05607 44.6308 1.32261 37.5045 1.72694C30.3782 2.13127 17.5347 1.5115 0.615594 1.97287C0.238321 2.13397 0.32216 17.5898 0.699433 17.5874Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41738">
                          <rect
                            width="200.995"
                            height="17.587"
                            fill="white"
                            transform="translate(0.371094 0.273438)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="across-teams">across teams.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q11">
                <div className="able-to-get">“Able to get </div>
                <div className="mark-wrapper11">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg11"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41745)">
                      <path
                        d="M325.575 6.83886C314.791 7.71521 276.637 6.45571 265.728 6.62077C254.818 6.78584 208.955 5.93098 197.576 5.63792C186.196 5.34485 141.015 4.49982 129.777 3.88641C118.539 3.27299 12.8329 2.44967 1.51743 1.52344C0.534398 7.77956 0.339808 20.348 0.234375 27.1579C33.8514 28.9048 74.7627 27.7383 127.333 29.6329C179.904 31.5275 184.778 30.9127 196.432 31.0808C208.086 31.2489 253.75 31.7785 265.344 31.3654C276.939 30.9523 297.802 32.4004 325.318 32.2303C325.935 31.9813 326.188 6.84793 325.575 6.83886Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41745">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.0195312 0.859375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="projects-done-in-record-time">
                    projects done in record time{" "}
                  </div>
                  <div className="mark11">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg11"
                      width="286"
                      height="26"
                      viewBox="0 0 286 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41749)">
                        <path
                          d="M1.11052 25.4685C10.5104 24.5054 43.8264 24.9022 53.3453 24.5574C62.8642 24.2126 102.903 24.1145 112.838 24.1608C122.774 24.2071 162.217 24.1129 172.034 24.4413C181.85 24.7697 274.009 21.9586 284.004 24.1426C285.908 24.5238 286.741 2.13201 284.777 1.75123C275.14 -0.322688 183.575 2.372 173.818 1.93064C164.062 1.48928 123.666 1.87113 113.493 1.93895C103.319 2.00678 63.4591 2.38506 53.3453 2.95889C43.2315 3.53273 25.0036 2.65314 0.991533 3.30793C0.456097 3.53657 0.575083 25.4719 1.11052 25.4685Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41749">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.640625 0.898438)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div13">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row6">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q12">
                <div className="ability-to">“Ability to </div>
                <div className="mark-wrapper12">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg12"
                    width="262"
                    height="26"
                    viewBox="0 0 262 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41759)">
                      <path
                        d="M261.44 4.94009C252.812 5.64121 222.287 4.63355 213.559 4.76561C204.832 4.89767 168.139 4.21374 159.035 3.97928C149.931 3.74481 113.783 3.06875 104.792 2.57799C95.8014 2.08722 11.2317 1.42853 2.17885 0.6875C1.39238 5.69269 1.23669 15.7481 1.15234 21.1963C28.0475 22.5939 60.7785 21.6607 102.837 23.1764C144.896 24.6922 148.796 24.2003 158.12 24.3348C167.443 24.4693 203.977 24.8929 213.253 24.5625C222.529 24.232 239.221 25.3905 261.235 25.2544C261.729 25.0552 261.931 4.94735 261.44 4.94009Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41759">
                        <rect
                          width="260.918"
                          height="25.6015"
                          fill="white"
                          transform="translate(0.980469 0.15625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="make-better-decisions">
                    make better decisions{" "}
                  </div>
                  <div className="mark12">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg12"
                      width="264"
                      height="24"
                      viewBox="0 0 264 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41763)">
                        <path
                          d="M0.454104 22.7981C9.1415 21.908 39.9323 22.2747 48.7296 21.956C57.527 21.6374 94.5309 21.5467 103.713 21.5895C112.895 21.6323 149.349 21.5452 158.422 21.8488C167.494 22.1523 252.668 19.5542 261.905 21.5727C263.665 21.925 264.434 1.23045 262.62 0.878528C253.713 -1.03819 169.088 1.45225 160.071 1.04434C151.054 0.636435 113.72 0.989342 104.318 1.05203C94.9157 1.11471 58.0768 1.46432 48.7296 1.99466C39.3824 2.525 22.5361 1.71208 0.344137 2.31724C-0.150714 2.52855 -0.0407469 22.8012 0.454104 22.7981Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41763">
                          <rect
                            width="263.635"
                            height="23.0681"
                            fill="white"
                            transform="translate(0.0195312 0.0898438)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div14">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q13">
                <div className="everyone-is">“Everyone is </div>
                <div className="mark-wrapper13">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg13"
                    width="295"
                    height="30"
                    viewBox="0 0 295 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41770)">
                      <path
                        d="M294.37 5.55083C284.638 6.3417 250.206 5.20506 240.361 5.35401C230.516 5.50297 189.126 4.73151 178.857 4.46703C168.588 4.20255 127.813 3.43996 117.672 2.88638C107.53 2.33279 12.1352 1.58979 1.92352 0.753906C1.03638 6.39976 0.860773 17.7422 0.765625 23.8878C31.1034 25.4643 68.0239 24.4116 115.466 26.1214C162.909 27.8312 167.308 27.2764 177.825 27.4281C188.342 27.5797 229.551 28.0577 240.015 27.6849C250.479 27.3121 269.307 28.6189 294.138 28.4654C294.696 28.2407 294.924 5.55901 294.37 5.55083Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41770">
                        <rect
                          width="294.315"
                          height="28.8785"
                          fill="white"
                          transform="translate(0.574219 0.15625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="always-on-the-same-page">
                    always on the same page{" "}
                  </div>
                  <div className="mark13">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg13"
                      width="286"
                      height="26"
                      viewBox="0 0 286 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41774)">
                        <path
                          d="M1.11833 24.7654C10.5182 23.8022 43.8342 24.1991 53.3531 23.8543C62.872 23.5095 102.911 23.4113 112.846 23.4576C122.781 23.5039 162.225 23.4098 172.041 23.7382C181.858 24.0666 274.017 21.2554 284.012 23.4395C285.916 23.8207 286.749 1.42889 284.785 1.0481C275.147 -1.02581 183.583 1.66887 173.826 1.22751C164.069 0.786153 123.674 1.168 113.5 1.23583C103.327 1.30365 63.4669 1.68193 53.3531 2.25577C43.2393 2.82961 25.0114 1.95001 0.999346 2.60481C0.463909 2.83345 0.582895 24.7688 1.11833 24.7654Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41774">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.648438 0.195312)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div15">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row7">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q14">
                <div className="projects-are">“Projects are </div>
                <div className="mark-wrapper14">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg14"
                    width="114"
                    height="12"
                    viewBox="0 0 114 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41784)">
                      <path
                        d="M113.487 2.53283C109.735 2.83772 96.4614 2.39954 92.666 2.45696C88.8707 2.51438 72.9149 2.21698 68.956 2.11502C64.9971 2.01307 49.2784 1.71908 45.3686 1.50567C41.4589 1.29226 4.6838 1.00583 0.747156 0.683594C0.40516 2.8601 0.337461 7.23268 0.300781 9.60183C11.9962 10.2096 26.2292 9.80378 44.5185 10.4629C62.8078 11.122 64.5036 10.9081 68.5581 10.9666C72.6125 11.0251 88.4989 11.2093 92.5327 11.0656C96.5666 10.9219 103.825 11.4257 113.398 11.3665C113.612 11.2799 113.7 2.53599 113.487 2.53283Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41784">
                        <rect
                          width="113.46"
                          height="11.1328"
                          fill="white"
                          transform="translate(0.226562 0.453125)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="smoother">smoother </div>
                  <div className="mark14">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg14"
                      width="115"
                      height="11"
                      viewBox="0 0 115 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41788)">
                        <path
                          d="M0.452901 10.2962C4.23061 9.90914 17.62 10.0686 21.4455 9.93005C25.271 9.79148 41.3622 9.75204 45.3551 9.77065C49.348 9.78926 65.2 9.75141 69.1451 9.8834C73.0902 10.0154 110.128 8.88561 114.145 9.76336C114.91 9.91656 115.245 0.917524 114.456 0.764491C110.582 -0.0689933 73.7836 1.01397 69.8624 0.836595C65.9412 0.659217 49.7066 0.812679 45.6181 0.839936C41.5296 0.867194 25.5101 1.01922 21.4455 1.24984C17.3809 1.48046 10.0553 1.12696 0.405081 1.39012C0.189895 1.482 0.237714 10.2976 0.452901 10.2962Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41788">
                          <rect
                            width="114.642"
                            height="10.0312"
                            fill="white"
                            transform="translate(0.265625 0.421875)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div16">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q15">
                <div className="div17">“ </div>
                <div className="mark-wrapper15">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg15"
                    width="189"
                    height="19"
                    viewBox="0 0 189 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41795)">
                      <path
                        d="M188.527 3.90366C182.304 4.40943 160.284 3.68253 153.987 3.77779C147.691 3.87306 121.222 3.37969 114.655 3.21055C108.087 3.04141 82.0112 2.55372 75.5253 2.19969C69.0394 1.84567 8.03276 1.3705 1.50221 0.835938C0.934873 4.44657 0.822568 11.7003 0.761719 15.6305C20.1633 16.6387 43.7747 15.9655 74.115 17.0589C104.455 18.1524 107.269 17.7976 113.994 17.8946C120.72 17.9916 147.075 18.2972 153.766 18.0588C160.458 17.8204 172.499 18.6561 188.379 18.558C188.736 18.4143 188.881 3.9089 188.527 3.90366Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41795">
                        <rect
                          width="188.22"
                          height="18.4684"
                          fill="white"
                          transform="translate(0.640625 0.453125)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="we-never-forget">We never forget </div>
                  <div className="mark15">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg15"
                      width="191"
                      height="18"
                      viewBox="0 0 191 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41799)">
                        <path
                          d="M0.728642 17.1933C6.99553 16.5512 29.2073 16.8158 35.5535 16.5859C41.8997 16.356 68.5935 16.2906 75.2174 16.3215C81.8412 16.3523 108.138 16.2895 114.683 16.5085C121.227 16.7275 182.67 14.8533 189.333 16.3094C190.603 16.5635 191.158 1.63492 189.849 1.38105C183.424 -0.00162494 122.378 1.79492 115.873 1.50067C109.368 1.20641 82.4362 1.46099 75.6537 1.50621C68.8711 1.55143 42.2964 1.80363 35.5535 2.1862C28.8106 2.56878 16.6581 1.98236 0.649315 2.41891C0.29234 2.57134 0.371668 17.1956 0.728642 17.1933Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41799">
                          <rect
                            width="190.181"
                            height="16.6408"
                            fill="white"
                            transform="translate(0.417969 0.8125)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div18">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q16">
                <div className="div4">“ </div>
                <div className="mark-wrapper16">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg16"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41806)">
                      <path
                        d="M326.243 6.43261C315.459 7.30896 277.305 6.04946 266.396 6.21452C255.486 6.37959 209.623 5.52473 198.244 5.23167C186.864 4.9386 141.683 4.09357 130.445 3.48016C119.207 2.86674 13.5008 2.04342 2.1854 1.11719C1.20237 7.37331 1.00778 19.9418 0.902344 26.7516C34.5194 28.4986 75.4306 27.3321 128.001 29.2267C180.571 31.1213 185.446 30.5065 197.1 30.6746C208.754 30.8426 254.418 31.3722 266.012 30.9591C277.607 30.546 298.47 31.9941 325.986 31.824C326.603 31.575 326.856 6.44168 326.243 6.43261Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41806">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.6875 0.453125)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="easier-to-track-conversations">
                    Easier to track conversations{" "}
                  </div>
                  <div className="mark16">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg16"
                      width="286"
                      height="26"
                      viewBox="0 0 286 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41810)">
                        <path
                          d="M0.883956 25.0623C10.2838 24.0991 43.5999 24.4959 53.1187 24.1511C62.6376 23.8063 102.676 23.7082 112.612 23.7545C122.547 23.8008 161.991 23.7066 171.807 24.0351C181.623 24.3635 273.783 21.5523 283.778 23.7364C285.681 24.1176 286.514 1.72576 284.551 1.34498C274.913 -0.728938 183.349 1.96575 173.592 1.52439C163.835 1.08303 123.439 1.46488 113.266 1.5327C103.093 1.60053 63.2325 1.97881 53.1187 2.55264C43.0049 3.12648 24.777 2.24689 0.764971 2.90168C0.229534 3.13032 0.34852 25.0656 0.883956 25.0623Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41810">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.414062 0.492188)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div19">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row8">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q17">
                <div className="div4">“ </div>
                <div className="mark-wrapper17">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg17"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41820)">
                      <path
                        d="M325.571 6.72949C314.787 7.60584 276.633 6.34634 265.724 6.5114C254.814 6.67646 208.951 5.82161 197.572 5.52854C186.193 5.23548 141.011 4.39045 129.773 3.77703C118.535 3.16361 12.829 2.3403 1.51352 1.41406C0.530492 7.67018 0.335901 20.2387 0.230469 27.0485C33.8475 28.7955 74.7588 27.629 127.329 29.5236C179.9 31.4182 184.774 30.8034 196.428 30.9714C208.082 31.1395 253.746 31.6691 265.341 31.256C276.935 30.8429 297.798 32.291 325.314 32.1209C325.932 31.8719 326.184 6.73856 325.571 6.72949Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41820">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.015625 0.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="no-more-messy-email-threads">
                    No more messy email threads{" "}
                  </div>
                  <div className="mark17">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg17"
                      width="287"
                      height="26"
                      viewBox="0 0 287 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41824)">
                        <path
                          d="M1.28239 25.3591C10.6823 24.396 43.9983 24.7928 53.5172 24.448C63.036 24.1032 103.075 24.0051 113.01 24.0514C122.945 24.0977 162.389 24.0035 172.205 24.3319C182.022 24.6604 274.181 21.8492 284.176 24.0333C286.08 24.4144 286.913 2.02264 284.949 1.64185C275.312 -0.432063 183.747 2.26262 173.99 1.82126C164.233 1.3799 123.838 1.76175 113.664 1.82958C103.491 1.8974 63.631 2.27568 53.5172 2.84952C43.4034 3.42336 25.1755 2.54376 1.16341 3.19856C0.627972 3.4272 0.746958 25.3625 1.28239 25.3591Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41824">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.8125 0.789062)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div20">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q18">
                <div className="i-feel">“I feel </div>
                <div className="mark-wrapper18">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg18"
                    width="261"
                    height="27"
                    viewBox="0 0 261 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41831)">
                      <path
                        d="M260.458 5.51844C251.862 6.21702 221.447 5.21301 212.751 5.34459C204.055 5.47617 167.495 4.79472 158.424 4.5611C149.353 4.32749 113.336 3.65388 104.378 3.16489C95.4195 2.6759 11.1562 2.0196 2.13607 1.28125C1.35244 6.26831 1.19733 16.2873 1.11328 21.7157C27.9111 23.1083 60.5235 22.1785 102.43 23.6887C144.336 25.199 148.222 24.7089 157.512 24.8429C166.802 24.9769 203.203 25.399 212.446 25.0697C221.688 24.7404 238.319 25.8948 260.254 25.7592C260.746 25.5607 260.947 5.52567 260.458 5.51844Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41831">
                        <rect
                          width="259.973"
                          height="25.5088"
                          fill="white"
                          transform="translate(0.945312 0.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="much-more-organized">
                    much more organized{" "}
                  </div>
                  <div className="mark18">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg18"
                      width="264"
                      height="24"
                      viewBox="0 0 264 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41835)">
                        <path
                          d="M1.31583 23.3918C9.97175 22.5049 40.651 22.8703 49.4165 22.5528C58.182 22.2353 95.0518 22.145 104.201 22.1876C113.35 22.2302 149.672 22.1435 158.711 22.4459C167.751 22.7484 252.616 20.1597 261.82 22.1709C263.573 22.5219 264.34 1.9023 262.532 1.55165C253.657 -0.358124 169.339 2.12329 160.355 1.71686C151.37 1.31043 114.172 1.66206 104.803 1.72452C95.4353 1.78698 58.7298 2.13532 49.4165 2.66374C40.1031 3.19216 23.3179 2.38218 1.20626 2.98515C0.713198 3.1957 0.822767 23.3949 1.31583 23.3918Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41835">
                          <rect
                            width="262.681"
                            height="22.9845"
                            fill="white"
                            transform="translate(0.882812 0.765625)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div21">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row9">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q19">
                <div className="div4">“ </div>
                <div className="mark-wrapper19">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg19"
                    width="231"
                    height="23"
                    viewBox="0 0 231 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41845)">
                      <path
                        d="M230.327 4.27412C222.702 4.89379 195.723 4.0032 188.01 4.11991C180.296 4.23663 147.866 3.63217 139.82 3.42494C131.774 3.21772 99.826 2.62021 91.8797 2.18646C83.9333 1.75272 9.18955 1.17056 1.18849 0.515625C0.493394 4.93928 0.355801 13.8264 0.28125 18.6415C24.0516 19.8768 52.9797 19.052 90.1518 20.3916C127.324 21.7313 130.771 21.2966 139.011 21.4154C147.252 21.5343 179.54 21.9087 187.739 21.6166C195.937 21.3246 210.689 22.3485 230.146 22.2282C230.582 22.0521 230.761 4.28054 230.327 4.27412Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41845">
                        <rect
                          width="230.602"
                          height="22.627"
                          fill="white"
                          transform="translate(0.128906 0.046875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="in-sync-in-one-place">
                    In sync in one place{" "}
                  </div>
                  <div className="mark19">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg19"
                      width="234"
                      height="22"
                      viewBox="0 0 234 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41849)">
                        <path
                          d="M0.708754 20.7286C8.38679 19.9419 35.6001 20.266 43.3753 19.9844C51.1505 19.7027 83.8551 19.6226 91.9705 19.6604C100.086 19.6982 132.304 19.6213 140.323 19.8895C148.341 20.1578 223.619 17.8616 231.783 19.6456C233.338 19.9569 234.018 1.66678 232.414 1.35575C224.542 -0.338273 149.75 1.86281 141.781 1.5023C133.811 1.14178 100.815 1.45369 92.505 1.50909C84.1953 1.56449 51.6365 1.87348 43.3753 2.3422C35.1141 2.81092 20.2252 2.09245 0.611564 2.6273C0.174208 2.81406 0.271398 20.7313 0.708754 20.7286Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41849">
                          <rect
                            width="233.005"
                            height="20.3879"
                            fill="white"
                            transform="translate(0.324219 0.660156)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div22">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q20">
                <div className="div17">“ </div>
                <div className="mark-wrapper20">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg20"
                    width="293"
                    height="29"
                    viewBox="0 0 293 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41856)">
                      <path
                        d="M292.065 5.40002C282.41 6.1847 248.247 5.05695 238.479 5.20475C228.711 5.35254 187.645 4.58711 177.456 4.3247C167.267 4.06229 126.812 3.30566 116.749 2.75641C106.687 2.20716 12.0384 1.46997 1.90665 0.640625C1.02645 6.24231 0.852216 17.496 0.757812 23.5935C30.8583 25.1577 67.4899 24.1133 114.561 25.8097C161.632 27.5061 165.997 26.9556 176.432 27.1061C186.867 27.2566 227.754 27.7308 238.136 27.3609C248.518 26.991 267.198 28.2876 291.836 28.1353C292.388 27.9124 292.615 5.40814 292.065 5.40002Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41856">
                        <rect
                          width="292.013"
                          height="28.6526"
                          fill="white"
                          transform="translate(0.566406 0.046875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="way-more-accountability">
                    Way more accountability{" "}
                  </div>
                  <div className="mark20">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg20"
                      width="287"
                      height="26"
                      viewBox="0 0 287 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41860)">
                        <path
                          d="M1.33318 24.656C10.7331 23.6929 44.0491 24.0897 53.5679 23.7449C63.0868 23.4001 103.126 23.302 113.061 23.3483C122.996 23.3946 162.44 23.3004 172.256 23.6288C182.073 23.9572 274.232 21.1461 284.227 23.3301C286.13 23.7113 286.963 1.31951 285 0.938726C275.362 -1.13519 183.798 1.5595 174.041 1.11814C164.284 0.676778 123.889 1.05863 113.715 1.12645C103.542 1.19428 63.6817 1.57256 53.5679 2.14639C43.4541 2.72023 25.2262 1.84064 1.21419 2.49543C0.678753 2.72407 0.797739 24.6594 1.33318 24.656Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41860">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.863281 0.0859375)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div23">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q21">
                <div className="div10">“ </div>
                <div className="mark-wrapper21">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg21"
                    width="287"
                    height="29"
                    viewBox="0 0 287 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41867)">
                      <path
                        d="M286.447 5.29772C276.975 6.06747 243.462 4.96118 233.88 5.10616C224.298 5.25115 184.014 4.50028 174.019 4.24287C164.024 3.98545 124.338 3.24322 114.467 2.70443C104.596 2.16563 11.7495 1.44247 1.81057 0.628906C0.94712 6.12398 0.776201 17.1635 0.683594 23.145C30.2112 24.6794 66.1457 23.6548 112.321 25.319C158.496 26.9831 162.778 26.4431 173.014 26.5907C183.251 26.7383 223.359 27.2035 233.544 26.8406C243.728 26.4778 262.053 27.7497 286.222 27.6003C286.764 27.3816 286.986 5.30569 286.447 5.29772Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41867">
                        <rect
                          width="286.455"
                          height="28.1073"
                          fill="white"
                          transform="translate(0.496094 0.046875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="a-lot-more-transparency">
                    A lot more transparency.{" "}
                  </div>
                  <div className="mark21">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg21"
                      width="286"
                      height="26"
                      viewBox="0 0 286 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41871)">
                        <path
                          d="M0.891769 24.656C10.2916 23.6929 43.6077 24.0897 53.1265 23.7449C62.6454 23.4001 102.684 23.302 112.619 23.3483C122.555 23.3946 161.999 23.3004 171.815 23.6288C181.631 23.9572 273.791 21.1461 283.785 23.3301C285.689 23.7113 286.522 1.31951 284.559 0.938726C274.921 -1.13519 183.356 1.5595 173.6 1.11814C163.843 0.676778 123.447 1.05863 113.274 1.12645C103.101 1.19428 63.2403 1.57256 53.1265 2.14639C43.0127 2.72023 24.7848 1.84064 0.772783 2.49543C0.237347 2.72407 0.356333 24.6594 0.891769 24.656Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41871">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.421875 0.0859375)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div24">” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row10">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q22">
                <div className="it">“It </div>
                <div className="mark-wrapper22">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg22"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41881)">
                      <path
                        d="M326.36 6.32324C315.576 7.19959 277.422 5.94009 266.513 6.10515C255.603 6.27021 209.74 5.41536 198.361 5.12229C186.982 4.82923 141.8 3.9842 130.562 3.37078C119.324 2.75736 13.618 1.93405 2.30258 1.00781C1.31955 7.26393 1.12496 19.8324 1.01953 26.6422C34.6365 28.3892 75.5478 27.2227 128.118 29.1173C180.689 31.0119 185.563 30.3971 197.217 30.5652C208.871 30.7332 254.535 31.2628 266.13 30.8497C277.724 30.4367 298.588 31.8847 326.103 31.7147C326.721 31.4657 326.973 6.33231 326.36 6.32324Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41881">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.804688 0.34375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="elevated-our-project-management">
                    elevated our project management{" "}
                  </div>
                  <div className="mark22">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg22"
                      width="287"
                      height="26"
                      viewBox="0 0 287 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41885)">
                        <path
                          d="M1.25896 24.9529C10.6588 23.9897 43.9749 24.3866 53.4937 24.0418C63.0126 23.697 103.051 23.5988 112.987 23.6451C122.922 23.6914 162.366 23.5973 172.182 23.9257C181.998 24.2541 274.158 21.4429 284.153 23.627C286.056 24.0082 286.889 1.61639 284.926 1.2356C275.288 -0.838313 183.724 1.85637 173.967 1.41501C164.21 0.973653 123.814 1.3555 113.641 1.42333C103.468 1.49115 63.6075 1.86943 53.4937 2.44327C43.3799 3.01711 25.152 2.13751 1.13997 2.79231C0.604534 3.02095 0.72352 24.9563 1.25896 24.9529Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41885">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.789062 0.382812)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div25">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q23">
                <div className="information">“Information </div>
                <div className="mark-wrapper23">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg23"
                    width="182"
                    height="19"
                    viewBox="0 0 182 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41892)">
                      <path
                        d="M180.706 3.65055C174.742 4.13521 153.641 3.43866 147.608 3.52994C141.575 3.62123 116.211 3.14846 109.918 2.98639C103.625 2.82431 78.6377 2.35698 72.4227 2.01774C66.2077 1.6785 7.74865 1.22318 1.49082 0.710938C0.947173 4.17079 0.839558 11.1216 0.78125 14.8877C19.3726 15.8538 41.998 15.2087 71.0713 16.2565C100.145 17.3043 102.84 16.9642 109.285 17.0572C115.73 17.1501 140.984 17.443 147.396 17.2146C153.809 16.9861 165.347 17.787 180.564 17.6929C180.905 17.5552 181.045 3.65557 180.706 3.65055Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41892">
                        <rect
                          width="180.36"
                          height="17.6971"
                          fill="white"
                          transform="translate(0.664062 0.34375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="flows-like-water">flows like water </div>
                  <div className="mark23">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg23"
                      width="183"
                      height="17"
                      viewBox="0 0 183 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41896)">
                        <path
                          d="M0.364106 16.0969C6.36929 15.4815 27.6535 15.7351 33.7347 15.5148C39.8159 15.2945 65.3949 15.2318 71.7422 15.2614C78.0894 15.291 103.288 15.2308 109.56 15.4406C115.831 15.6504 174.708 13.8545 181.093 15.2498C182.309 15.4933 182.841 1.18814 181.587 0.944877C175.43 -0.380059 116.933 1.34146 110.7 1.0595C104.467 0.77753 78.6596 1.02148 72.1603 1.06481C65.661 1.10814 40.196 1.34981 33.7347 1.71641C27.2734 2.08301 15.6284 1.52107 0.288091 1.93939C-0.0539764 2.08546 0.0220386 16.099 0.364106 16.0969Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41896">
                          <rect
                            width="182.239"
                            height="15.9459"
                            fill="white"
                            transform="translate(0.0664062 0.398438)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div26">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row11">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q24">
                <div className="div4">“ </div>
                <div className="mark-wrapper24">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg24"
                    width="223"
                    height="23"
                    viewBox="0 0 223 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41906)">
                      <path
                        d="M221.657 4.69762C214.337 5.29243 188.441 4.43756 181.036 4.5496C173.632 4.66163 142.503 4.08141 134.779 3.88249C127.055 3.68358 96.3888 3.11003 88.7612 2.69368C81.1335 2.27733 9.387 1.71851 1.70679 1.08984C1.03957 5.3361 0.907499 13.8668 0.835938 18.4889C23.6531 19.6746 51.4211 18.8829 87.1026 20.1688C122.784 21.4547 126.093 21.0375 134.003 21.1515C141.913 21.2656 172.906 21.6251 180.776 21.3447C188.646 21.0643 202.806 22.0472 221.482 21.9317C221.901 21.7627 222.073 4.70378 221.657 4.69762Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41906">
                        <rect
                          width="221.355"
                          height="21.7196"
                          fill="white"
                          transform="translate(0.691406 0.640625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="it-s-been-a-lifesaver">
                    It’s been a lifesaver{" "}
                  </div>
                  <div className="mark24">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg24"
                      width="225"
                      height="20"
                      viewBox="0 0 225 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41910)">
                        <path
                          d="M1.11146 19.3358C8.4816 18.5807 34.6036 18.8918 42.067 18.6215C49.5305 18.3511 80.9235 18.2742 88.7135 18.3105C96.5034 18.3468 127.43 18.2729 135.127 18.5304C142.823 18.788 215.082 16.5838 222.919 18.2963C224.412 18.5951 225.065 1.03845 223.525 0.739889C215.969 -0.886198 144.176 1.22662 136.526 0.880561C128.876 0.534505 97.2031 0.833901 89.2266 0.88708C81.25 0.940259 49.9969 1.23686 42.067 1.68678C34.1371 2.13671 19.8452 1.44705 1.01817 1.96045C0.598349 2.13972 0.691641 19.3385 1.11146 19.3358Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41910">
                          <rect
                            width="223.661"
                            height="19.5703"
                            fill="white"
                            transform="translate(0.742188 0.0703125)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div27">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q25">
                <div className="we-are">“We are </div>
                <div className="mark-wrapper25">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg25"
                    width="224"
                    height="23"
                    viewBox="0 0 224 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41917)">
                      <path
                        d="M223.358 4.74076C215.967 5.3414 189.817 4.47816 182.34 4.59129C174.863 4.70442 143.429 4.11851 135.63 3.91765C127.83 3.71679 96.8636 3.13762 89.1612 2.7172C81.4588 2.29677 9.00979 1.73248 1.25438 1.09766C0.580631 5.3855 0.447262 13.9997 0.375 18.6671C23.4155 19.8644 51.4555 19.0649 87.4864 20.3634C123.517 21.662 126.858 21.2406 134.846 21.3558C142.833 21.471 174.13 21.834 182.077 21.5508C190.024 21.2677 204.323 22.2602 223.182 22.1436C223.605 21.973 223.778 4.74698 223.358 4.74076Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41917">
                        <rect
                          width="223.523"
                          height="21.9323"
                          fill="white"
                          transform="translate(0.230469 0.640625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="better-coordinated">better coordinated </div>
                  <div className="mark25">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg25"
                      width="227"
                      height="21"
                      viewBox="0 0 227 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41921)">
                        <path
                          d="M0.665818 20.3326C8.10812 19.5701 34.4859 19.8842 42.0224 19.6112C49.5589 19.3383 81.2594 19.2606 89.1256 19.2972C96.9919 19.3339 128.221 19.2593 135.993 19.5193C143.765 19.7794 216.732 17.5536 224.645 19.2829C226.153 19.5847 226.812 1.85606 225.258 1.55458C217.627 -0.0874298 145.131 2.04607 137.406 1.69663C129.681 1.34718 97.6984 1.64951 89.6437 1.70321C81.5891 1.75691 50.03 2.05641 42.0224 2.51075C34.0149 2.96508 19.583 2.26867 0.571612 2.78709C0.147683 2.96812 0.24189 20.3353 0.665818 20.3326Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41921">
                          <rect
                            width="225.851"
                            height="19.7619"
                            fill="white"
                            transform="translate(0.292969 0.878906)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div28">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q26">
                <div className="div4">“ </div>
                <div className="mark-wrapper26">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg26"
                    width="142"
                    height="15"
                    viewBox="0 0 142 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41928)">
                      <path
                        d="M141.545 3.23989C136.858 3.62077 120.275 3.07337 115.534 3.14511C110.793 3.21685 90.8593 2.84531 85.9136 2.71793C80.9679 2.59056 61.3309 2.22329 56.4466 1.95669C51.5623 1.69008 5.62012 1.33225 0.702175 0.929688C0.274928 3.64874 0.190355 9.11129 0.144531 12.071C14.7552 12.8303 32.5362 12.3233 55.3845 13.1467C78.2328 13.9701 80.3514 13.7029 85.4165 13.776C90.4816 13.849 110.328 14.0792 115.367 13.8997C120.407 13.7201 129.474 14.3495 141.433 14.2756C141.702 14.1674 141.811 3.24383 141.545 3.23989Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41928">
                        <rect
                          width="141.742"
                          height="13.9079"
                          fill="white"
                          transform="translate(0.0507812 0.640625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="more-clarity">More clarity </div>
                  <div className="mark26">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg26"
                      width="145"
                      height="13"
                      viewBox="0 0 145 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41932)">
                        <path
                          d="M1.09333 12.4471C5.81273 11.9635 22.5397 12.1628 27.3188 11.9897C32.098 11.8165 52.2002 11.7673 57.1884 11.7905C62.1766 11.8138 81.9802 11.7665 86.9086 11.9314C91.8371 12.0963 138.108 10.6849 143.126 11.7814C144.081 11.9728 144.5 0.730546 143.514 0.539366C138.675 -0.501883 92.7033 0.851037 87.8047 0.629444C82.9061 0.40785 62.6247 0.599565 57.517 0.633618C52.4093 0.667671 32.3967 0.857594 27.3188 1.1457C22.241 1.43381 13.0893 0.99219 1.03359 1.32094C0.764768 1.43573 0.824507 12.4488 1.09333 12.4471Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41932">
                          <rect
                            width="143.219"
                            height="12.5317"
                            fill="white"
                            transform="translate(0.859375 0.109375)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="on-progress">on progress.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row12">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q27">
                <div className="div4">“ </div>
                <div className="mark-wrapper27">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg27"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41942)">
                      <path
                        d="M325.985 6.91699C315.201 7.79334 277.047 6.53384 266.138 6.6989C255.228 6.86396 209.365 6.00911 197.986 5.71604C186.607 5.42298 141.425 4.57795 130.187 3.96453C118.949 3.35111 13.243 2.5278 1.92758 1.60156C0.944555 7.85768 0.749964 20.4262 0.644531 27.236C34.2615 28.983 75.1728 27.8165 127.743 29.7111C180.314 31.6057 185.188 30.9909 196.842 31.1589C208.496 31.327 254.16 31.8566 265.755 31.4435C277.349 31.0304 298.213 32.4785 325.728 32.3084C326.346 32.0594 326.598 6.92606 325.985 6.91699Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41942">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.429688 0.9375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="nothing-slips-through-the-cracks">
                    Nothing slips through the cracks{" "}
                  </div>
                  <div className="mark27">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg27"
                      width="286"
                      height="26"
                      viewBox="0 0 286 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41946)">
                        <path
                          d="M0.985519 25.5466C10.3854 24.5835 43.7014 24.9803 53.2203 24.6355C62.7392 24.2907 102.778 24.1926 112.713 24.2389C122.649 24.2852 162.092 24.191 171.909 24.5194C181.725 24.8479 273.884 22.0367 283.879 24.2208C285.783 24.6019 286.616 2.21014 284.652 1.82935C275.015 -0.244563 183.45 2.45012 173.693 2.00876C163.937 1.5674 123.541 1.94925 113.368 2.01708C103.194 2.0849 63.3341 2.46318 53.2203 3.03702C43.1065 3.61086 24.8786 2.73126 0.866533 3.38606C0.331097 3.6147 0.450083 25.55 0.985519 25.5466Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41946">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.515625 0.976562)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div29">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q28">
                <div className="we-got">“We got </div>
                <div className="mark-wrapper28">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg28"
                    width="170"
                    height="18"
                    viewBox="0 0 170 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41953)">
                      <path
                        d="M169.015 4.02846C163.442 4.48139 143.722 3.83043 138.084 3.91574C132.446 4.00105 108.742 3.55923 102.861 3.40777C96.9794 3.2563 73.6278 2.81956 67.8195 2.50252C62.0113 2.18548 7.37856 1.75996 1.53032 1.28125C1.02225 4.51465 0.921679 11.0105 0.867188 14.5301C18.2417 15.433 39.3862 14.8301 66.5566 15.8093C93.7269 16.7885 96.2463 16.4707 102.269 16.5576C108.293 16.6445 131.893 16.9182 137.886 16.7047C143.879 16.4912 154.661 17.2396 168.883 17.1517C169.202 17.023 169.332 4.03315 169.015 4.02846Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41953">
                        <rect
                          width="168.555"
                          height="16.5388"
                          fill="white"
                          transform="translate(0.757812 0.9375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="peace-of-mind">peace of mind </div>
                  <div className="mark28">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg28"
                      width="171"
                      height="15"
                      viewBox="0 0 171 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41957)">
                        <path
                          d="M0.364152 14.7047C5.97628 14.1297 25.8674 14.3666 31.5506 14.1607C37.2337 13.9549 61.1386 13.8963 67.0704 13.9239C73.0022 13.9516 96.5518 13.8954 102.413 14.0914C108.273 14.2875 163.296 12.6091 169.264 13.9131C170.4 14.1407 170.898 0.771825 169.726 0.544481C163.971 -0.693735 109.303 0.915109 103.478 0.651598C97.6529 0.388087 73.535 0.616068 67.4611 0.656562C61.3872 0.697056 37.5889 0.922906 31.5506 1.26551C25.5122 1.60812 14.6293 1.08296 0.293113 1.4739C-0.0265658 1.61041 0.0444738 14.7067 0.364152 14.7047Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41957">
                          <rect
                            width="170.311"
                            height="14.9022"
                            fill="white"
                            transform="translate(0.0859375 0.0351562)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div30">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row13">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q29">
                <div className="div4">“ </div>
                <div className="mark-wrapper29">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg29"
                    width="328"
                    height="33"
                    viewBox="0 0 328 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41967)">
                      <path
                        d="M326.528 6.21386C315.744 7.09021 277.59 5.83071 266.681 5.99577C255.771 6.16084 209.908 5.30598 198.529 5.01292C187.15 4.71985 141.968 3.87482 130.73 3.26141C119.492 2.64799 13.786 1.82467 2.47055 0.898438C1.48752 7.15456 1.29293 19.723 1.1875 26.5329C34.8045 28.2798 75.7158 27.1133 128.286 29.0079C180.857 30.9025 185.731 30.2877 197.385 30.4558C209.039 30.6239 254.703 31.1535 266.298 30.7404C277.892 30.3273 298.756 31.7754 326.271 31.6053C326.889 31.3563 327.141 6.22293 326.528 6.21386Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41967">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.972656 0.234375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="things-don-t-get-left-undone">
                    Things don’t get left undone{" "}
                  </div>
                  <div className="mark29">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg29"
                      width="286"
                      height="26"
                      viewBox="0 0 286 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41971)">
                        <path
                          d="M0.774581 24.8435C10.1745 23.8804 43.4905 24.2772 53.0093 23.9324C62.5282 23.5876 102.567 23.4895 112.502 23.5358C122.438 23.5821 161.881 23.4879 171.698 23.8163C181.514 24.1447 273.673 21.3336 283.668 23.5176C285.572 23.8988 286.405 1.50701 284.442 1.12623C274.804 -0.947688 183.239 1.747 173.482 1.30564C163.726 0.864278 123.33 1.24613 113.157 1.31395C102.983 1.38178 63.1231 1.76006 53.0093 2.33389C42.8956 2.90773 24.6676 2.02814 0.655596 2.68293C0.120159 2.91157 0.239145 24.8469 0.774581 24.8435Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41971">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.304688 0.273438)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div31">.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q30">
                <div className="div4">“ </div>
                <div className="mark-wrapper30">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg30"
                    width="327"
                    height="33"
                    viewBox="0 0 327 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41978)">
                      <path
                        d="M326.028 6.21386C315.244 7.09021 277.09 5.83071 266.181 5.99577C255.271 6.16084 209.408 5.30598 198.029 5.01292C186.65 4.71985 141.468 3.87482 130.23 3.26141C118.992 2.64799 13.286 1.82467 1.97055 0.898438C0.987523 7.15456 0.792933 19.723 0.6875 26.5329C34.3045 28.2798 75.2158 27.1133 127.786 29.0079C180.357 30.9025 185.231 30.2877 196.885 30.4558C208.539 30.6239 254.203 31.1535 265.798 30.7404C277.392 30.3273 298.256 31.7754 325.771 31.6053C326.389 31.3563 326.641 6.22293 326.028 6.21386Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41978">
                        <rect
                          width="326.128"
                          height="32"
                          fill="white"
                          transform="translate(0.472656 0.234375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="no-need-for-daily-standup-meetings">
                    No need for daily standup meetings{" "}
                  </div>
                  <div className="mark30">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg30"
                      width="286"
                      height="26"
                      viewBox="0 0 286 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41982)">
                        <path
                          d="M1.12224 24.8435C10.5221 23.8804 43.8381 24.2772 53.357 23.9324C62.8759 23.5876 102.915 23.4895 112.85 23.5358C122.785 23.5821 162.229 23.4879 172.045 23.8163C181.862 24.1447 274.021 21.3336 284.016 23.5176C285.92 23.8988 286.752 1.50701 284.789 1.12623C275.151 -0.947688 183.587 1.747 173.83 1.30564C164.073 0.864278 123.678 1.24613 113.504 1.31395C103.331 1.38178 63.4708 1.76006 53.357 2.33389C43.2432 2.90773 25.0153 2.02814 1.00325 2.68293C0.467816 2.91157 0.586802 24.8469 1.12224 24.8435Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41982">
                          <rect
                            width="285.257"
                            height="24.96"
                            fill="white"
                            transform="translate(0.652344 0.273438)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div32">.” </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row14">
            <div className="filler"></div>
            <div className="blockquote">
              <div className="q31">
                <div className="div10">“ </div>
                <div className="mark-wrapper31">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg31"
                    width="143"
                    height="15"
                    viewBox="0 0 143 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_41992)">
                      <path
                        d="M142.103 3.12624C137.425 3.50642 120.873 2.96002 116.141 3.03163C111.408 3.10323 91.5116 2.73238 86.5751 2.60525C81.6385 2.47811 62.0379 2.11152 57.1626 1.84541C52.2874 1.5793 6.43029 1.22213 1.52145 0.820312C1.095 3.53433 1.01058 8.98676 0.964844 11.941C15.5485 12.6989 33.2965 12.1928 56.1025 13.0147C78.9085 13.8366 81.0232 13.5699 86.0789 13.6428C91.1346 13.7157 110.944 13.9455 115.974 13.7663C121.004 13.5871 130.055 14.2153 141.992 14.1415C142.26 14.0335 142.369 3.13017 142.103 3.12624Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_41992">
                        <rect
                          width="141.48"
                          height="13.8822"
                          fill="white"
                          transform="translate(0.871094 0.53125)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="a-clear-path">A clear path </div>
                  <div className="mark31">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg31"
                      width="144"
                      height="13"
                      viewBox="0 0 144 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_41996)">
                        <path
                          d="M0.674931 12.3384C5.38559 11.8557 22.0816 12.0546 26.8519 11.8818C31.6221 11.709 51.6871 11.6598 56.6661 11.683C61.6451 11.7062 81.412 11.659 86.3313 11.8236C91.2507 11.9882 137.435 10.5794 142.444 11.6739C143.398 11.8649 143.816 0.643516 142.832 0.45269C138.002 -0.586631 92.1153 0.763784 87.2257 0.542601C82.3362 0.321418 62.0923 0.512778 56.9941 0.546768C51.8958 0.580757 31.9203 0.770329 26.8519 1.0579C21.7834 1.34547 12.6487 0.904675 0.615303 1.23282C0.346974 1.3474 0.406603 12.3401 0.674931 12.3384Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_41996">
                          <rect
                            width="142.954"
                            height="12.5085"
                            fill="white"
                            transform="translate(0.441406 0.0234375)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="to-each-goal">to each goal.” </div>
              </div>
            </div>
            <div className="blockquote">
              <div className="q32">
                <div className="div4">“ </div>
                <div className="mark-wrapper32">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg32"
                    width="172"
                    height="18"
                    viewBox="0 0 172 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_42003)">
                      <path
                        d="M171.457 3.6678C165.799 4.1276 145.781 3.46677 140.057 3.55337C134.333 3.63998 110.269 3.19145 104.299 3.03769C98.3283 2.88392 74.6224 2.44056 68.726 2.11871C62.8296 1.79686 7.36798 1.36488 1.431 0.878906C0.915229 4.16136 0.813131 10.7558 0.757812 14.3288C18.396 15.2454 39.8613 14.6333 67.4439 15.6274C95.0265 16.6214 97.5841 16.2989 103.699 16.3871C109.813 16.4752 133.772 16.7531 139.856 16.5364C145.939 16.3196 156.886 17.0794 171.323 16.9902C171.646 16.8595 171.779 3.67256 171.457 3.6678Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_42003">
                        <rect
                          width="171.113"
                          height="16.7897"
                          fill="white"
                          transform="translate(0.644531 0.53125)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="more-effective">More effective </div>
                  <div className="mark32">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg32"
                      width="174"
                      height="16"
                      viewBox="0 0 174 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_42007)">
                        <path
                          d="M1.19259 15.294C6.88988 14.7102 27.0828 14.9507 32.8522 14.7417C38.6216 14.5327 62.8891 14.4733 68.9109 14.5013C74.9328 14.5294 98.8397 14.4723 104.789 14.6714C110.739 14.8704 166.597 13.1666 172.655 14.4903C173.809 14.7214 174.314 1.14966 173.124 0.918863C167.282 -0.33814 111.785 1.29511 105.871 1.02761C99.9575 0.760096 75.4736 0.991536 69.3076 1.03264C63.1415 1.07375 38.9822 1.30303 32.8522 1.65083C26.7222 1.99864 15.6742 1.46551 1.12047 1.86239C0.795946 2.00096 0.868063 15.296 1.19259 15.294Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_42007">
                          <rect
                            width="172.895"
                            height="15.1283"
                            fill="white"
                            transform="translate(0.910156 0.402344)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="with-much-less-effort">
                  with much less effort.”{" "}
                </div>
              </div>
            </div>
            <div className="filler"></div>
          </div>
          <div className="quote-row15">
            <div className="blockquote2">
              <div className="show-more">Show more… </div>
            </div>
            <div className="filler2"></div>
            <div className="blockquote3">
              <div className="q33">
                <div className="div4">“ </div>
                <div className="mark-wrapper33">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg33"
                    width="180"
                    height="19"
                    viewBox="0 0 180 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_42019)">
                      <path
                        d="M179.668 4.12429C173.726 4.60719 152.702 3.91317 146.69 4.00412C140.679 4.09507 115.407 3.62402 109.136 3.46253C102.866 3.30104 77.9694 2.8354 71.7768 2.49739C65.5842 2.15938 7.33673 1.7057 1.10154 1.19531C0.559854 4.64265 0.452628 11.5683 0.394531 15.3208C18.9187 16.2834 41.4622 15.6406 70.4303 16.6846C99.3984 17.7286 102.084 17.3898 108.506 17.4824C114.928 17.575 140.09 17.8669 146.479 17.6392C152.868 17.4116 164.365 18.2096 179.527 18.1158C179.867 17.9786 180.006 4.12929 179.668 4.12429Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_42019">
                        <rect
                          width="179.708"
                          height="17.6331"
                          fill="white"
                          transform="translate(0.277344 0.828125)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="more-in-control">More in control </div>
                  <div className="mark33">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg33"
                      width="183"
                      height="17"
                      viewBox="0 0 183 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_42023)">
                        <path
                          d="M0.97631 16.5832C6.95977 15.9701 28.167 16.2227 34.2262 16.0032C40.2854 15.7837 65.7719 15.7213 72.0962 15.7507C78.4205 15.7802 103.528 15.7203 109.777 15.9293C116.025 16.1384 174.689 14.3489 181.051 15.7392C182.263 15.9818 182.793 1.7284 181.544 1.48601C175.409 0.165868 117.124 1.88116 110.913 1.60021C104.702 1.31927 78.9885 1.56233 72.5127 1.60551C66.037 1.64868 40.6641 1.88947 34.2262 2.25475C27.7883 2.62002 16.1854 2.06012 0.90057 2.47693C0.55974 2.62247 0.63548 16.5853 0.97631 16.5832Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_42023">
                          <rect
                            width="181.579"
                            height="15.8882"
                            fill="white"
                            transform="translate(0.679688 0.941406)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div33">.” </div>
              </div>
            </div>
            <div className="blockquote4">
              <div className="q34">
                <div className="div4">“ </div>
                <div className="mark-wrapper34">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg34"
                    width="184"
                    height="19"
                    viewBox="0 0 184 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_42030)">
                      <path
                        d="M183.359 4.17758C177.316 4.66863 155.938 3.9629 149.825 4.05538C143.712 4.14787 118.014 3.66888 111.638 3.50466C105.262 3.34045 79.9453 2.86696 73.6483 2.52325C67.3514 2.17954 8.12175 1.71821 1.78143 1.19922C1.23061 4.70468 1.12158 11.7471 1.0625 15.5628C19.899 16.5417 42.8226 15.8881 72.2791 16.9497C101.736 18.0113 104.467 17.6668 110.997 17.761C117.527 17.8551 143.113 18.1519 149.61 17.9204C156.107 17.6889 167.797 18.5003 183.215 18.405C183.561 18.2655 183.703 4.18267 183.359 4.17758Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_42030">
                        <rect
                          width="182.738"
                          height="17.9304"
                          fill="white"
                          transform="translate(0.941406 0.828125)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="balls-don-t-drop">Balls don’t drop </div>
                  <div className="mark34">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg34"
                      width="186"
                      height="17"
                      viewBox="0 0 186 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_42034)">
                        <path
                          d="M0.692249 16.5767C6.7766 15.9533 28.3414 16.2101 34.5027 15.987C40.6641 15.7638 66.5803 15.7003 73.0112 15.7302C79.4422 15.7602 104.973 15.6992 111.327 15.9118C117.681 16.1244 177.334 14.3048 183.803 15.7185C185.036 15.9652 185.575 1.47148 184.304 1.225C178.066 -0.117398 118.798 1.62682 112.482 1.34113C106.167 1.05545 80.0198 1.30261 73.4348 1.34651C66.8499 1.39042 41.0492 1.63527 34.5027 2.0067C27.9563 2.37813 16.1577 1.80879 0.615232 2.23263C0.268655 2.38062 0.345672 16.5789 0.692249 16.5767Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_42034">
                          <rect
                            width="184.641"
                            height="16.1561"
                            fill="white"
                            transform="translate(0.390625 0.671875)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div34">.” </div>
              </div>
            </div>
            <div className="filler3"></div>
            <div className="blockquote5">
              <div className="q35">
                <div className="div4">“ </div>
                <div className="mark-wrapper35">
                  <svg
                    className="mark-top-76-e-8-ffca-77-ad-525896436827-d-1-efbf-6-cef-9-a-1-e-9-bc-0-edeb-1-a-7-a-94-daf-192-e-0484-d-svg35"
                    width="235"
                    height="24"
                    viewBox="0 0 235 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1604_42042)">
                      <path
                        d="M233.804 5.11501C226.074 5.74322 198.723 4.84036 190.903 4.95868C183.083 5.077 150.206 4.46421 142.049 4.25412C133.892 4.04404 101.503 3.43829 93.4475 2.99857C85.3916 2.55884 9.61708 1.96865 1.50569 1.30469C0.801007 5.78935 0.661516 14.799 0.585938 19.6806C24.6841 20.9329 54.0111 20.0967 91.6958 21.4548C129.381 22.8129 132.875 22.3722 141.229 22.4927C149.583 22.6132 182.317 22.9928 190.628 22.6967C198.94 22.4006 213.896 23.4386 233.62 23.3167C234.063 23.1382 234.244 5.12152 233.804 5.11501Z"
                        fill="#FFE200"
                        fillOpacity="0.3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1604_42042">
                        <rect
                          width="233.783"
                          height="22.939"
                          fill="white"
                          transform="translate(0.433594 0.828125)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="quicker-turnaround">Quicker turnaround </div>
                  <div className="mark35">
                    <svg
                      className="mark-bottom-cb-8-b-720-f-1-c-9-f-14423226-caf-08-a-1-a-385532-b-71-ea-5-bc-38-cf-295322-bf-5-aea-7065-f-3-svg35"
                      width="237"
                      height="21"
                      viewBox="0 0 237 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1604_42046)">
                        <path
                          d="M0.90541 20.5086C8.68933 19.711 36.2779 20.0396 44.1603 19.7541C52.0428 19.4686 85.1983 19.3873 93.4256 19.4256C101.653 19.464 134.316 19.386 142.445 19.658C150.573 19.9299 226.889 17.602 235.166 19.4106C236.742 19.7263 237.432 1.18392 235.806 0.8686C227.825 -0.848781 152.002 1.38265 143.923 1.01717C135.843 0.651684 102.392 0.967889 93.9676 1.02405C85.5432 1.08022 52.5354 1.39347 44.1603 1.86865C35.7852 2.34384 20.6909 1.61546 0.806879 2.15769C0.363491 2.34702 0.462022 20.5114 0.90541 20.5086Z"
                          fill="#FFE200"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1604_42046">
                          <rect
                            width="236.218"
                            height="20.6691"
                            fill="white"
                            transform="translate(0.515625 0.160156)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="div35">.” </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hightlights">
          <div className="highlights">
            <div className="we-asked-our-customers-what-changed-for-the-better-since-you-switched-to-basecamp-thousands-responded-here-s-some-of-what-they-said">
              <span>
                <span className="we-asked-our-customers-what-changed-for-the-better-since-you-switched-to-basecamp-thousands-responded-here-s-some-of-what-they-said-span">
                  We asked our customers{" "}
                </span>
                <span className="we-asked-our-customers-what-changed-for-the-better-since-you-switched-to-basecamp-thousands-responded-here-s-some-of-what-they-said-span2">
                  “What changed for the better since you switched to Basecamp?”
                </span>
                <span className="we-asked-our-customers-what-changed-for-the-better-since-you-switched-to-basecamp-thousands-responded-here-s-some-of-what-they-said-span3">
                  {" "}
                  Thousands responded, here’s some of what they said…
                </span>
              </span>{" "}
            </div>
            <div className="how-do-customers-feel-after-buying-basecamp">
              How do customers feel after buying Basecamp?{" "}
            </div>
            <div className="divider"></div>
          </div>
          <div className="highlights2">
            <div className="with-basecamp-cancellation-is-entirely-self-serve-no-questions-asked-no-retention-specialists-trying-to-talk-you-out-of-it-cancel-any-time-no-long-term-contracts-to-lock-you-in-simple-straightforward-and-fair-just-as-it-should-be">
              With Basecamp, cancellation is entirely self-serve, no questions
              asked, no retention specialists trying to talk you out of it.
              Cancel any time, no long-term contracts to lock you in. Simple,
              straightforward, and fair, just as it should be.{" "}
            </div>
            <div className="risk-free-cancel-anytime-no-long-term-lock-in">
              Risk-free, cancel anytime, no long-term lock-in{" "}
            </div>
            <div className="divider"></div>
          </div>
          <div className="highlights3">
            <div className="yes-we-offer-per-user-discounts-for-non-profits-and-entirely-free-accounts-for-teachers-and-students-including-homeschoolers-and-alternate-education-programs-please-review-the-discounts-page-for-details-and-directions">
              <span>
                <span className="yes-we-offer-per-user-discounts-for-non-profits-and-entirely-free-accounts-for-teachers-and-students-including-homeschoolers-and-alternate-education-programs-please-review-the-discounts-page-for-details-and-directions-span">
                  Yes, we offer per-user discounts for non-profits, and entirely
                  free accounts for teachers and students (including
                  homeschoolers and alternate education programs). Please review
                  the{" "}
                </span>
                <span className="yes-we-offer-per-user-discounts-for-non-profits-and-entirely-free-accounts-for-teachers-and-students-including-homeschoolers-and-alternate-education-programs-please-review-the-discounts-page-for-details-and-directions-span2">
                  discounts page
                </span>
                <span className="yes-we-offer-per-user-discounts-for-non-profits-and-entirely-free-accounts-for-teachers-and-students-including-homeschoolers-and-alternate-education-programs-please-review-the-discounts-page-for-details-and-directions-span3">
                  {" "}
                  for details and directions.
                </span>
              </span>{" "}
            </div>
            <div className="non-profit-or-educational-discounts">
              Non-profit or educational discounts?{" "}
            </div>
            <div className="divider"></div>
          </div>
          <div className="highlights4">
            <div className="we-started-our-business-without-outside-funding-and-you-probably-did-too-we-know-your-money-s-precious-and-we-want-to-help-that-s-why-basecamp-is-intentionally-affordable-for-start-ups-freelancers-and-small-businesses-just-getting-started">
              We started our business without outside funding, and you probably
              did too. We know your money’s precious, and we want to help.
              That’s why Basecamp is intentionally affordable for start-ups,
              freelancers, and small businesses just getting started.{" "}
            </div>
            <div className="a-big-boost-for-bootstrappers-small-businesses">
              A big boost for bootstrappers &amp; small businesses{" "}
            </div>
            <div className="divider"></div>
          </div>
          <div className="highlights5">
            <div className="when-you-switch-to-basecamp-you-don-t-need-to-pay-for-things-like-slack-trello-asana-or-google-docs-basecamp-replaces-all-that-stuff-it-s-easy-to-lighten-your-load-simplify-your-workflow-and-save-real-money-right-now-with-basecamp">
              When you switch to Basecamp, you don’t need to pay for things like
              Slack, Trello, Asana, or Google Docs. Basecamp replaces all that
              stuff. It’s easy to lighten your load, simplify your workflow, and
              save real money right now with Basecamp.{" "}
            </div>
            <div className="budgets-love-basecamp">Budgets love Basecamp </div>
          </div>
        </div>
        <div className="what-s-included">
          <div className="included">
            <div className="benefit">
              <div className="unlimited-projects">Unlimited projects </div>
              <div className="icon-check">
                <svg
                  className="icon-check-9-d-7-dc-87-deb-3-febbb-9-bc-43-d-0-b-384-d-97-e-8-b-4-faafc-56-b-6-cbe-0-dd-37813-db-41715427-svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_42074)">
                    <path
                      d="M6.13222 10.115L2.5357 6.6425C2.29454 6.40966 1.91387 6.40452 1.66651 6.63078L0.542244 7.65914C0.270513 7.9077 0.266676 8.33458 0.533896 8.58797L5.69684 13.4839C5.94115 13.7155 6.32384 13.7162 6.56886 13.4852L14.774 5.7516C15.0426 5.49849 15.0394 5.07051 14.7671 4.82144L13.641 3.79137C13.395 3.56638 13.0168 3.57002 12.7753 3.79968L6.13222 10.115Z"
                      fill="#1D2D35"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_42074">
                      <rect
                        width="15.232"
                        height="15.232"
                        fill="white"
                        transform="translate(0.0390625 0.853516)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="benefit2">
              <div className="loads-of-storage-space">
                Loads of storage space{" "}
              </div>
              <div className="icon-check">
                <svg
                  className="icon-check-9-d-7-dc-87-deb-3-febbb-9-bc-43-d-0-b-384-d-97-e-8-b-4-faafc-56-b-6-cbe-0-dd-37813-db-41715427-svg2"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_42079)">
                    <path
                      d="M6.46816 10.115L2.87164 6.6425C2.63048 6.40966 2.24981 6.40452 2.00245 6.63078L0.878182 7.65914C0.606451 7.9077 0.602613 8.33458 0.869833 8.58797L6.03278 13.4839C6.27708 13.7155 6.65978 13.7162 6.90479 13.4852L15.1099 5.7516C15.3785 5.49849 15.3753 5.07051 15.1031 4.82144L13.9769 3.79137C13.7309 3.56638 13.3528 3.57002 13.1112 3.79968L6.46816 10.115Z"
                      fill="#1D2D35"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_42079">
                      <rect
                        width="15.232"
                        height="15.232"
                        fill="white"
                        transform="translate(0.375 0.853516)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="benefit3">
              <div className="invite-guests-for-free">
                Invite guests for free{" "}
              </div>
              <div className="icon-check">
                <svg
                  className="icon-check-9-d-7-dc-87-deb-3-febbb-9-bc-43-d-0-b-384-d-97-e-8-b-4-faafc-56-b-6-cbe-0-dd-37813-db-41715427-svg3"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_42084)">
                    <path
                      d="M6.80409 10.115L3.20758 6.6425C2.96642 6.40966 2.58574 6.40452 2.33839 6.63078L1.21412 7.65914C0.942388 7.9077 0.938551 8.33458 1.20577 8.58797L6.36871 13.4839C6.61302 13.7155 6.99571 13.7162 7.24073 13.4852L15.4458 5.7516C15.7144 5.49849 15.7113 5.07051 15.439 4.82144L14.3128 3.79137C14.0668 3.56638 13.6887 3.57002 13.4472 3.79968L6.80409 10.115Z"
                      fill="#1D2D35"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_42084">
                      <rect
                        width="15.232"
                        height="15.232"
                        fill="white"
                        transform="translate(0.710938 0.853516)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="benefit4">
              <div className="and-tool">and tool </div>
              <div className="every-single-feature">Every single feature </div>
              <div className="icon-check">
                <svg
                  className="icon-check-9-d-7-dc-87-deb-3-febbb-9-bc-43-d-0-b-384-d-97-e-8-b-4-faafc-56-b-6-cbe-0-dd-37813-db-41715427-svg4"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_42090)">
                    <path
                      d="M6.13222 9.28687L2.5357 5.81438C2.29454 5.58153 1.91387 5.57639 1.66651 5.80265L0.542244 6.83101C0.270513 7.07958 0.266676 7.50645 0.533896 7.75985L5.69684 12.6557C5.94115 12.8874 6.32384 12.888 6.56886 12.6571L14.774 4.92347C15.0426 4.67037 15.0394 4.24239 14.7671 3.99332L13.641 2.96324C13.395 2.73825 13.0168 2.74189 12.7753 2.97156L6.13222 9.28687Z"
                      fill="#1D2D35"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_42090">
                      <rect
                        width="15.232"
                        height="15.232"
                        fill="white"
                        transform="translate(0.0390625 0.0253906)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="benefit5">
              <div className="innovative-client-access">
                <span>
                  <span className="innovative-client-access-span">
                    Innovative{" "}
                  </span>
                  <span className="innovative-client-access-span2">
                    client access
                  </span>
                </span>{" "}
              </div>
              <div className="icon-check">
                <svg
                  className="icon-check-9-d-7-dc-87-deb-3-febbb-9-bc-43-d-0-b-384-d-97-e-8-b-4-faafc-56-b-6-cbe-0-dd-37813-db-41715427-svg5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_42095)">
                    <path
                      d="M6.46816 9.28687L2.87164 5.81438C2.63048 5.58153 2.24981 5.57639 2.00245 5.80265L0.878182 6.83101C0.606451 7.07958 0.602613 7.50645 0.869833 7.75985L6.03278 12.6557C6.27708 12.8874 6.65978 12.888 6.90479 12.6571L15.1099 4.92347C15.3785 4.67037 15.3753 4.24239 15.1031 3.99332L13.9769 2.96324C13.7309 2.73825 13.3528 2.74189 13.1112 2.97156L6.46816 9.28687Z"
                      fill="#1D2D35"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_42095">
                      <rect
                        width="15.232"
                        height="15.232"
                        fill="white"
                        transform="translate(0.375 0.0253906)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="benefit6">
              <div className="rock-solid-uptime-reliability">
                Rock-solid uptime reliability{" "}
              </div>
              <div className="icon-check">
                <svg
                  className="icon-check-9-d-7-dc-87-deb-3-febbb-9-bc-43-d-0-b-384-d-97-e-8-b-4-faafc-56-b-6-cbe-0-dd-37813-db-41715427-svg6"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_42100)">
                    <path
                      d="M6.80409 9.28687L3.20758 5.81438C2.96642 5.58153 2.58574 5.57639 2.33839 5.80265L1.21412 6.83101C0.942388 7.07958 0.938551 7.50645 1.20577 7.75985L6.36871 12.6557C6.61302 12.8874 6.99571 12.888 7.24073 12.6571L15.4458 4.92347C15.7144 4.67037 15.7113 4.24239 15.439 3.99332L14.3128 2.96324C14.0668 2.73825 13.6887 2.74189 13.4472 2.97156L6.80409 9.28687Z"
                      fill="#1D2D35"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_42100">
                      <rect
                        width="15.232"
                        height="15.232"
                        fill="white"
                        transform="translate(0.710938 0.0253906)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="benefit7">
              <div className="_24-7-365-top-notch-support">
                <span>
                  <span className="_24-7-365-top-notch-support-span">
                    24/7/365{" "}
                  </span>
                  <span className="_24-7-365-top-notch-support-span2">
                    top-notch support
                  </span>
                </span>{" "}
              </div>
              <div className="icon-check">
                <svg
                  className="icon-check-9-d-7-dc-87-deb-3-febbb-9-bc-43-d-0-b-384-d-97-e-8-b-4-faafc-56-b-6-cbe-0-dd-37813-db-41715427-svg7"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_42105)">
                    <path
                      d="M6.79628 9.45874L3.19977 5.98625C2.9586 5.75341 2.57793 5.74827 2.33058 5.97453L1.20631 7.00289C0.934576 7.25145 0.930738 7.67833 1.19796 7.93172L6.3609 12.8276C6.60521 13.0593 6.9879 13.0599 7.23292 12.8289L15.438 5.09535C15.7066 4.84224 15.7034 4.41426 15.4312 4.16519L14.305 3.13512C14.059 2.91013 13.6809 2.91377 13.4393 3.14343L6.79628 9.45874Z"
                      fill="#1D2D35"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_42105">
                      <rect
                        width="15.232"
                        height="15.232"
                        fill="white"
                        transform="translate(0.703125 0.197266)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="benefit8">
              <div className="complimentary-classes">
                <span>
                  <span className="complimentary-classes-span">
                    Complimentary{" "}
                  </span>
                  <span className="complimentary-classes-span2">classes</span>
                </span>{" "}
              </div>
              <div className="icon-check">
                <svg
                  className="icon-check-9-d-7-dc-87-deb-3-febbb-9-bc-43-d-0-b-384-d-97-e-8-b-4-faafc-56-b-6-cbe-0-dd-37813-db-41715427-svg8"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1604_42110)">
                    <path
                      d="M6.13222 9.45874L2.5357 5.98625C2.29454 5.75341 1.91387 5.74827 1.66651 5.97453L0.542244 7.00289C0.270513 7.25145 0.266676 7.67833 0.533896 7.93172L5.69684 12.8276C5.94115 13.0593 6.32384 13.0599 6.56886 12.8289L14.774 5.09535C15.0426 4.84224 15.0394 4.41426 14.7671 4.16519L13.641 3.13512C13.395 2.91013 13.0168 2.91377 12.7753 3.14343L6.13222 9.45874Z"
                      fill="#1D2D35"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1604_42110">
                      <rect
                        width="15.232"
                        height="15.232"
                        fill="white"
                        transform="translate(0.0390625 0.197266)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="what-s-included-absolutely-everything">
            What’s included? Absolutely everything.{" "}
          </div>
        </div>
        <div className="pricing-details">
          <div className="standard">
            <div className="price-breakdown">
              <div className="button">
                <div className="try-for-free">Try for Free </div>
              </div>
              <div className="we-only-bill-you-for-employees-invite-clients-contractors-and-guests-for-free">
                <span>
                  <span className="we-only-bill-you-for-employees-invite-clients-contractors-and-guests-for-free-span">
                    We only bill you for employees.
                    <br />
                  </span>
                  <span className="we-only-bill-you-for-employees-invite-clients-contractors-and-guests-for-free-span2">
                    {" "}
                    Invite clients, contractors and guests for free.
                  </span>
                </span>{" "}
              </div>
              <div className="cost">
                <div className="_15-user-per-month">15/user per month </div>
                <div className="div36">$ </div>
              </div>
            </div>
            <div className="standard-features">
              <div className="benefits">
                <div className="benefit9">
                  <div className="every-feature-nothing-held-back">
                    Every feature, nothing held back{" "}
                  </div>
                  <div className="bullet"></div>
                </div>
                <div className="benefit9">
                  <div className="_500-gb-storage-for-files-documents">
                    500 GB storage for files &amp; documents{" "}
                  </div>
                  <div className="bullet"></div>
                </div>
                <div className="benefit9">
                  <div className="month-to-month-pay-as-you-go">
                    Month-to-month, pay as you go{" "}
                  </div>
                  <div className="bullet"></div>
                </div>
              </div>
              <div className="ideal-for-freelancers-startups-or-smaller-teams">
                Ideal for freelancers,
                <br /> startups, or smaller teams.{" "}
              </div>
              <div className="basecamp4">Basecamp </div>
            </div>
          </div>
          <div className="pro-unlimited">
            <div className="pro-features">
              <div className="perfect-for-growing-businesses-larger-groups-and-companies-that-want-the-best">
                Perfect for growing businesses, larger groups,
                <br /> and companies that want the best.{" "}
              </div>
              <div className="benefits2">
                <div className="column-1">
                  <div className="benefit10">
                    <div className="every-feature-we-offer-plus">
                      Every feature we offer, plus…{" "}
                    </div>
                    <div className="bullet"></div>
                  </div>
                  <div className="benefit10">
                    <div className="_10-x-file-document-storage-5-tb">
                      10x file &amp; document storage (5 TB){" "}
                    </div>
                    <div className="bullet2"></div>
                  </div>
                  <div className="benefit10">
                    <div className="first-in-line-24-7-365-priority-support">
                      First-in-line 24/7/365 Priority Support{" "}
                    </div>
                    <div className="bullet2"></div>
                  </div>
                </div>
                <div className="column-2">
                  <div className="benefit11">
                    <div className="_1-1-onboarding-tour-with-our-team">
                      1:1 onboarding tour with our team{" "}
                    </div>
                    <div className="bullet2"></div>
                  </div>
                  <div className="benefit11">
                    <div className="option-to-pay-annually-by-check">
                      Option to pay annually by check{" "}
                    </div>
                    <div className="bullet2"></div>
                  </div>
                  <div className="benefit11">
                    <div className="annual-billing-for-simplified-accounting">
                      Annual billing for simplified accounting{" "}
                    </div>
                    <div className="bullet2"></div>
                  </div>
                </div>
              </div>
              <div className="title">
                <div className="basecamp5">Basecamp </div>
                <div className="tag">
                  <div className="pro-unlimited2">Pro Unlimited </div>
                </div>
              </div>
            </div>
            <div className="price-breakdown2">
              <div className="button">
                <div className="try-for-free">Try for Free </div>
              </div>
              <div className="no-per-user-charges-your-whole-organization-for-one-fixed-price-if-you-prefer-to-pay-month-to-month-it-s-349-month">
                <span>
                  <span className="no-per-user-charges-your-whole-organization-for-one-fixed-price-if-you-prefer-to-pay-month-to-month-it-s-349-month-span">
                    No per-user charges. Your whole organization for one fixed
                    price.
                    <br />
                  </span>
                  <span className="no-per-user-charges-your-whole-organization-for-one-fixed-price-if-you-prefer-to-pay-month-to-month-it-s-349-month-span2">
                    {" "}
                    If you prefer to pay month-to-month, it’s $349/month.
                  </span>
                </span>{" "}
              </div>
              <div className="cost2">
                <div className="unlimited-users">Unlimited users </div>
                <div className="cost3">
                  <div className="just">just </div>
                  <div className="div37">$ </div>
                  <div className="_299-month-billed-annually">
                    299/month, billed annually{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="plan-sticker">
              <div className="best-value-for-larger-teams">
                Best value for larger teams{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="headline">
          <div className="another-2-272-organizations-signed-up-last-week">
            Another 2,272 organizations signed up last week.{" "}
          </div>
          <div className="two-simple-plans-each-with-a-30-day-free-trial-no-credit-card-required">
            <span>
              <span className="two-simple-plans-each-with-a-30-day-free-trial-no-credit-card-required-span">
                Two simple plans, each with a{" "}
              </span>
              <span className="two-simple-plans-each-with-a-30-day-free-trial-no-credit-card-required-span2">
                30-day free trial
              </span>
              <span className="two-simple-plans-each-with-a-30-day-free-trial-no-credit-card-required-span3">
                . No credit card required.
              </span>
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};


export default funnel;