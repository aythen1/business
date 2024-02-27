import styles from "./pricing.module.css";

import TopBar from './components/TopBar'

const pricing = ({
  setStateUpgrade
}) => {
  const handleClickUpgrade = () => {
    setStateUpgrade('pay')
  }
  return (
    <div>
      <div className={styles["index"]}>
        <div className={styles["div"]}>
          <div className={styles["frame"]}>
            <p className={styles["simple-transparent"]}>Analiza y explora tus métricas</p>
            <p className={styles["no-contracts-no-sur"]}>Sin sorpresas, así son nuestros precios</p>
            <div className={styles["group"]}>
              <div className={styles["overlap-group"]}>
                <div className={styles["rectangle"]} />
                <div className={styles["choose-plan"]}>Contacta con nosotros</div>
              </div>
            </div>
          </div>
          <div className={styles["frame-2"]}>
            <div className={styles["overlap-wrapper"]}>
              <div className={styles["overlap"]}>
                <div
                  onClick={() => handleClickUpgrade()}
                  className={styles["frame-3"]}
                >
                  <div className={styles["rectangle-2"]} />
                  <div className={styles["choose-plan-wrapper"]}>
                    <div className={styles["text-wrapper"]}>Escoger plan</div>
                  </div>
                </div>
                <div className={styles["div-wrapper"]}>
                  <div className={styles["text-wrapper-2"]}>MOST POPULAR</div>
                </div>
                <div className={styles["frame-4"]}>
                  <div className={styles["frame-5"]}>
                    <div className={styles["element"]}>149€</div>
                    <div className={styles["month"]}>/mes</div>
                    <div className={styles["pro"]}>Business</div>
                    <p className={styles["for-most-businesses"]}>
                      Empresas que necesiten de análisis contínuos según diferentes actores.
                    </p>
                  </div>
                  <div className={styles["group-2"]}>
                    <div className={styles["group-3"]}>
                      <div className={styles["path-wrapper"]}>
                        <svg className={styles["svg-success-active"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                          <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                        </svg>
                      </div>
                      <div className={styles["text-wrapper-3"]}>Usuarios ilimitados</div>
                    </div>
                    <div className={styles["group-4"]}>
                      <div className={styles["img-wrapper"]}>
                        <svg className={styles["svg-success-active"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                          <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                        </svg>
                      </div>
                      <div className={styles["text-wrapper-3"]}>Integraciones ilimitadas</div>
                    </div>
                    <div className={styles["group-5"]}>
                      <div className={styles["overlap-2"]}>
                        <svg className={styles["svg-success-active"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                          <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                        </svg>
                      </div>
                      <div className={styles["text-wrapper-4"]}>Hasta 20GBs de datos</div>
                    </div>
                    <div className={styles["group-6"]}>
                      <div className={styles["overlap-3"]}>
                        <svg className={styles["svg-success-active"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                          <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                        </svg>
                      </div>
                      <div className={styles["text-wrapper-4"]}>Hasta 10 Dashboards</div>
                    </div>
                    <div className={styles["group-7"]}>
                      <div className={styles["overlap-4"]}>
                        <svg className={styles["svg-success-active"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                          <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                        </svg>
                      </div>
                      <div className={styles["text-wrapper-4"]}>Gráficas ilimitadas</div>
                    </div>
                    <div className={styles["group-8"]}>
                      <div className={styles["overlap-5"]}>
                        <svg className={styles["svg-success-active"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                          <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                        </svg>
                      </div>
                      <div className={styles["text-wrapper-4"]}>Descargar informes</div>
                    </div>
                    <div className={styles["group-9"]}>
                      <div className={styles["overlap-6"]}>
                        <svg className={styles["svg-success-active"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                          <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                        </svg>
                      </div>
                      <div className={styles["text-wrapper-3"]}>Soporte prioritario</div>
                    </div>
                    <div className={styles["group-10"]}>
                      <div className={styles["overlap-7"]}>
                        <svg className={styles["svg-success-active"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                          <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                        </svg>
                      </div>
                      <div className={styles["text-wrapper-3"]}>Sin actualizaciones</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["frame-6"]}>
              <div className={styles["frame-7"]}>
                <div className={styles["group-11"]}>
                  <div className={styles["element-2"]}>39€</div>
                  <div className={styles["month-2"]}>/mes</div>
                  <div className={styles["base"]}>Basic</div>
                  <p className={styles["p"]}>
                    Dirigido a ideas emergentes
                    <br />
                    que quieran analizar sus KPIs para definir estrategias.
                  </p>
                </div>
                <div className={styles["frame-8"]}>
                  <div className={styles["group-12"]}>
                    <div className={styles["overlap-group-2"]}>
                      <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                        <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                      </svg>
                    </div>
                    <div className={styles["text-wrapper-5"]}>Usuarios iilimitados</div>
                  </div>
                  <div className={styles["group-12"]}>
                    <div className={styles["overlap-8"]}>
                      <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                        <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                      </svg>
                    </div>
                    <div className={styles["text-wrapper-5"]}>Integraciones ilimitadas</div>
                  </div>
                  <div className={styles["group-12"]}>
                    <div className={styles["overlap-9"]}>
                      <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                        <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                      </svg>
                    </div>
                    <div className={styles["text-wrapper-5"]}>Hasta 2GBs de datos</div>
                  </div>
                  <div className={styles["group-12"]}>
                    <div className={styles["overlap-10"]}>
                      <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                        <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                      </svg>
                    </div>
                    <div className={styles["text-wrapper-5"]}>Hasta 2 Dashboards</div>
                  </div>
                  <div className={styles["group-12"]}>
                    <div className={styles["overlap-11"]}>
                      <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                        <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                      </svg>
                    </div>
                    <div className={styles["text-wrapper-5"]}>Hasta 10 gráficas</div>
                  </div>
                  <div className={styles["group-12"]}>
                    <div className={styles["overlap-12"]}>
                      <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                        <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                      </svg>
                    </div>
                    <div className={styles["text-wrapper-5"]}>Soporte por email</div>
                  </div>
                  <div className={styles["group-13"]}>
                    <div className={styles["overlap-13"]}>
                      <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                        <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                      </svg>
                    </div>
                    <div className={styles["unlimited-users"]}>Con actualizaciones</div>
                  </div>
                </div>
              </div>
              <div className={styles["group"]}>
                <div
                  onClick={() => handleClickUpgrade()}
                  className={styles["overlap-group"]}
                >
                  <div className={styles["rectangle"]} />
                  <div className={styles["choose-plan-2"]}>Escoger plan</div>
                </div>
              </div>
            </div>
            <div className={styles["element-3"]}>349€</div>
            <div className={styles["month-3"]}>/mes</div>
            <div className={styles["enterprise"]}>Start Up</div>
            <p className={styles["for-most-businesses-2"]}>
              Para equipos de Data Science dispuestos a crear sus propios análisis a medida.
            </p>
            <div className={styles["group-14"]}>
              <div className={styles["overlap-group-3"]}>
                <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                  <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                </svg>
              </div>
              <div className={styles["text-wrapper-6"]}>Usuarios ilimitados</div>
            </div>
            <div className={styles["group-15"]}>
              <div className="overlap-group-3">
                <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                  <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                </svg>
              </div>
              <div className={styles["text-wrapper-6"]}>Integraciones ilimitadas</div>
            </div>
            <div className={styles["group-16"]}>
              <div className={styles["overlap-group-3"]}>
                <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                  <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                </svg>
              </div>
              <div className={styles["text-wrapper-6"]}>Hasta 100GBs de datos</div>
            </div>
            <div className={styles["group-17"]}>
              <div className={styles["overlap-group-3"]}>
                <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                  <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                </svg>
              </div>
              <div className={styles["text-wrapper-6"]}>Dashboards ilimitados</div>
            </div>
            <div className={styles["group-18"]}>
              <div className={styles["overlap-group-3"]}>
                <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                  <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                </svg>
              </div>
              <div className={styles["text-wrapper-6"]}>Gráficas ilimitadas</div>
            </div>
            <div className={styles["group-19"]}>
              <div className={styles["overlap-group-3"]}>
                <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                  <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                </svg>
              </div>
              <div className={styles["text-wrapper-6"]}>Descargar informes</div>
            </div>
            <div className={styles["group-20"]}>
              <div className={styles["overlap-group-3"]}>
                <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                  <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                </svg>
              </div>
              <div className={styles["text-wrapper-6"]}>Soporte personalizado</div>
            </div>
            <div className={styles["group-21"]}>
              <div className={styles["overlap-group-3"]}>
                <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                  <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                </svg>
              </div>
              <div className={styles["text-wrapper-6"]}>Con actualizaciones</div>
            </div>
            <div
              onClick={() => handleClickUpgrade()}
              className={styles["overlap-14"]}
            >
              <div className={styles["rectangle"]} />
              <div className={styles["choose-plan-3"]}>Escoger plan</div>
            </div>
            <div className={styles["element-4"]}>FREE</div>
            <div className={styles["month-4"]}>/mes</div>
            <div className={styles["intro"]}>Open Source</div>
            <p className={styles["for-most-businesses-3"]}>
              Perfecto para trabajar con análisis existentes, sin poder crear nuevos.
            </p>
            <div className={styles["frame-9"]}>
              <div className={styles["group-13"]}>
                <div className={styles["overlap-group-3"]}>
                  <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                    <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                  </svg>
                </div>
                <div className={styles["text-wrapper-6"]}>1 usuario</div>
              </div>
              <div className={styles["group-13"]}>
                <div className={styles["overlap-group-3"]}>
                  <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                    <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                  </svg>
                </div>
                <div className={styles["text-wrapper-6"]}>1 integración</div>
              </div>
              <div className={styles["group-13"]}>
                <div className={styles["overlap-group-3"]}>
                  <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                    <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                  </svg>
                </div>
                <div className={styles["text-wrapper-6"]}>1 Gráfica</div>
              </div>
              <div className={styles["group-13"]}>
                <div className={styles["overlap-group-3"]}>
                  <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                    <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                  </svg>
                </div>
                <div className={styles["text-wrapper-6"]}>MIT License</div>
              </div>
              <div className={styles["group-13"]}>
                <div className={styles["overlap-group-3"]}>
                  <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                    <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                  </svg>
                </div>
                <div className={styles["text-wrapper-6"]}>Sin soporte</div>
              </div>
              <div className={styles["group-13"]}>
                <div className={styles["overlap-group-3"]}>
                  <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                    <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                  </svg>
                </div>
                <div className={styles["text-wrapper-6"]}>Self Hosted</div>
              </div>
              <div className={styles["group-13"]}>
                <div className={styles["overlap-group-3"]}>
                  <svg className={styles["svg-success"]} xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
                    <path d="M11.2741 2.28198L5.56996 10.5304C5.43392 10.7227 5.23107 10.8488 5.00698 10.8801C4.78289 10.9115 4.55636 10.8457 4.3783 10.6973L0.304962 7.22713C-0.0544831 6.92062 -0.112686 6.36165 0.174962 5.97863C0.462611 5.59562 0.987184 5.5336 1.34663 5.84011L4.7433 8.7358L9.93246 1.2315C10.1026 0.959416 10.3993 0.808986 10.7048 0.839936C11.0103 0.870887 11.2751 1.07821 11.3941 1.37959C11.513 1.68097 11.467 2.02765 11.2741 2.28198Z" fill="currentFill" />
                  </svg>
                </div>
                <div className={styles["text-wrapper-6"]}>Sin actualizaciones</div>
              </div>
            </div>
            <div className={styles["overlap-group-wrapper"]}>
              <div
                onClick={() => handleClickUpgrade()}
                className={styles["overlap-group"]}
              >
                <div className={styles["rectangle"]} />
                <div className={styles["choose-plan-2"]}>Escoger plan</div>
              </div>
            </div>
          </div>
        </div>
      </div>






      <div className={styles["table"]}>
        <div className={styles["frame-2087328724"]}>
          <div className={styles["frame-48492"]}>
            <div className={styles["frame-48490"]}>
              <div className={styles["capacidades-y-accesos"]}>
                CAPACIDADES Y ACCESOS{" "}
              </div>
            </div>
            <div className={styles["frame-48474"]}>
              <div className={styles["frame-48479"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["usuarios"]}>Usuarios </div>
                </div>
                <div className={styles["frame-48477"]}>
                  <div className={styles["ilimitados"]}>Ilimitados </div>
                </div>
                <div className={styles["frame-48478"]}>
                  <div className={styles["ilimitados"]}>Ilimitados </div>
                </div>
                <div className={styles["frame-484792"]}>
                  <div className={styles["ilimitados"]}>Ilimitados </div>
                </div>
              </div>
              <div className={styles["frame-48480"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["importaciones"]}>Importaciones </div>
                </div>
                <div className={styles["frame-484782"]}>
                  <div className={styles["ilimitadas"]}>Ilimitadas </div>
                </div>
                <div className={styles["frame-484793"]}>
                  <div className={styles["ilimitadas"]}>Ilimitadas </div>
                </div>
                <div className={styles["frame-484802"]}>
                  <div className={styles["ilimitadas"]}>Ilimitadas </div>
                </div>
              </div>
              <div className={styles["frame-48484"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["almacenamiento"]}>Almacenamiento </div>
                </div>
                <div className={styles["frame-48481"]}>
                  <div className={styles["hasta-2-g-bs"]}>Hasta 2 GBs </div>
                </div>
                <div className={styles["frame-48482"]}>
                  <div className={styles["hasta-20-g-bs"]}>Hasta 20 GBs </div>
                </div>
                <div className={styles["frame-48483"]}>
                  <div className={styles["hasta-100-g-bs"]}>Hasta 100 GBs </div>
                </div>
              </div>
              <div className={styles["frame-484812"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["informes-de-an-lisis"]}>
                    Informes de análisis{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-484772"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46092)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46092"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46092"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46092"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484794"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46759)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46759"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46759"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46759"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484783"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46094)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46094"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46094"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46094"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484832"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["representaci-n-personalizada"]}>
                    Representación personalizada{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-484773"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46102)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46102"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46102"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46102"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484795"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46763)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46763"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46763"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46763"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484784"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46104)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46104"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46104"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46104"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484822"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["n-mero-de-gr-ficas"]}>
                    Número de Gráficas{" "}
                  </div>
                </div>
                <div className={styles["frame-484842"]}>
                  <div className={styles["_10"]}>10 </div>
                </div>
                <div className={styles["ilimitadas2"]}>Ilimitadas </div>
                <div className={styles["ilimitadas3"]}>Ilimitadas </div>
              </div>
              <div className={styles["frame-484774"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["n-mero-de-dashboards"]}>
                    Número de Dashboards{" "}
                  </div>
                </div>
                <div className={styles["frame-484775"]}></div>
                <div className={styles["frame-48485"]}>
                  <div className={styles["_2"]}>2 </div>
                </div>
                <div className={styles["frame-48486"]}>
                  <div className={styles["_10"]}>10 </div>
                </div>
                <div className={styles["ilimitados2"]}>Ilimitados </div>
              </div>
              <div className={styles["frame-484785"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["compartir-por-link"]}>
                    Compartir por link{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-484803"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46776)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46776"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46776"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46776"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484804"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46778)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46778"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46778"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46778"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484805"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46780)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46780"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46780"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46780"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-48475"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["actualizaciones"]}>
                    Actualizaciones{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-484776"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46145)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46145"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46145"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46145"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484796"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46147)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46147"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46147"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46147"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484786"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46149)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46149"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46149"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46149"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles["frame-48491"]}>
            <div className={styles["frame-48490"]}>
              <div className={styles["marca-blanca-y-marketplace"]}>
                MARCA BLANCA Y MARKETPLACE{" "}
              </div>
            </div>
            <div className={styles["frame-484777"]}>
              <div className={styles["frame-484812"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["logo-personalizado"]}>
                    Logo personalizado{" "}
                  </div>
                  <div className={styles["frame-48496"]}>
                    <div className={styles["soon"]}>soon </div>
                  </div>
                </div>
                <svg
                  className={styles["frame-484823"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46784)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46784"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46784"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46784"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["x"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
                <svg
                  className={styles["x2"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
              </div>
              <div className={styles["frame-484762"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["temas-predetermiandos"]}>
                    Temas predetermiandos{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-484833"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46832)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46832"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46832"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46832"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484824"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46834)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46834"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46834"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46834"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484825"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46836)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46836"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46836"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46836"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484797"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["temas-personalizados"]}>
                    Temas personalizados{" "}
                  </div>
                  <div className={styles["frame-48496"]}>
                    <div className={styles["soon"]}>soon </div>
                  </div>
                </div>
                <svg
                  className={styles["x3"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
                <svg
                  className={styles["frame-484826"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46822)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46822"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46822"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46822"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484834"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46838)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46838"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46838"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46838"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484806"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["compartir-con-subdominio"]}>
                    Compartir con subdominio{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-484807"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46824)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46824"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46824"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46824"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484827"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46826)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46826"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46826"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46826"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484808"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46828)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46828"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46828"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46828"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484822"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["compartir-con-dominio"]}>
                    Compartir con dominio{" "}
                  </div>
                  <div className={styles["frame-48496"]}>
                    <div className={styles["soon"]}>soon </div>
                  </div>
                </div>
                <svg
                  className={styles["frame-484809"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46215)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46215"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46215"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46215"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484813"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46217)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46217"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46217"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46217"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["x4"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
              </div>
              <div className={styles["frame-48487"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["acceso-al-langchain-devs"]}>
                    Acceso al Langchain (Devs){" "}
                  </div>
                  <div className={styles["frame-48496"]}>
                    <div className={styles["soon"]}>soon </div>
                  </div>
                </div>
                <svg
                  className={styles["frame-4848010"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46225)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46225"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46225"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46225"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484814"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46227)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46227"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46227"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46227"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["x5"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
              </div>
              <div className={styles["frame-484835"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["acceso-al-marketplace"]}>
                    Acceso al Marketplace{" "}
                  </div>
                  <div className={styles["frame-48496"]}>
                    <div className={styles["soon"]}>soon </div>
                  </div>
                </div>
                <svg
                  className={styles["frame-4848011"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46235)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46235"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46235"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46235"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484828"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46844)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46844"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46844"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46844"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484815"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46237)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46237"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46237"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46237"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-48484"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["utilizaci-n-de-prompts"]}>
                    Utilización de prompts{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-484836"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46850)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46850"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46850"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46850"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484843"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46852)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46852"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46852"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46852"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484837"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46854)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46854"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46854"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46854"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484852"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["importaci-n-de-prompts"]}>
                    Importación de prompts{" "}
                  </div>
                  <div className={styles["frame-48496"]}>
                    <div className={styles["soon"]}>soon </div>
                  </div>
                </div>
                <svg
                  className={styles["frame-484853"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46856)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46856"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46856"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46856"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484862"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46858)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46858"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46858"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46858"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["x6"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
              </div>
              <div className={styles["frame-484863"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["creaci-n-de-prompts"]}>
                    Creación de prompts{" "}
                  </div>
                  <div className={styles["frame-48496"]}>
                    <div className={styles["soon"]}>soon </div>
                  </div>
                </div>
                <svg
                  className={styles["frame-484844"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46862)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46862"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46862"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46862"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484845"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46860)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46860"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46860"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46860"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["x7"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles["frame-484902"]}>
            <div className={styles["frame-48489"]}>
              <div className={styles["informes"]}>INFORMES </div>
            </div>
            <div className={styles["frame-484787"]}>
              <div className={styles["frame-484774"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["exportar-pdf"]}>Exportar PDF </div>
                </div>
                <div className={styles["frame-484816"]}>
                  <svg
                    className={styles["frame-484854"]}
                    width="115"
                    height="19"
                    viewBox="0 0 115 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_1860_46874)">
                      <path
                        d="M50 11.2308L55.1923 17L65 2"
                        stroke="fillCurrent"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1860_46874"
                        x="48"
                        y="0.5"
                        width="19"
                        height="19"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="0.5" />
                        <feGaussianBlur stdDeviation="0.25" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1860_46874"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1860_46874"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <svg
                  className={styles["frame-484846"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46876)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46876"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46876"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46876"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484847"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1860_46872)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1860_46872"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1860_46872"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1860_46872"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484752"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["env-o-por-email"]}>
                    Envío por email{" "}
                  </div>
                </div>
                <div className={styles["frame-484855"]}>
                  <svg
                    className={styles["frame-484856"]}
                    width="115"
                    height="19"
                    viewBox="0 0 115 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_1861_42532)">
                      <path
                        d="M50 11.2308L55.1923 17L65 2"
                        stroke="fillCurrent"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1861_42532"
                        x="48"
                        y="0.5"
                        width="19"
                        height="19"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="0.5" />
                        <feGaussianBlur stdDeviation="0.25" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1861_42532"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1861_42532"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <svg
                  className={styles["frame-484864"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1861_42534)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1861_42534"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1861_42534"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1861_42534"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484872"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1861_42536)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1861_42536"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1861_42536"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1861_42536"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484798"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["compartir-por-link"]}>
                    Compartir por link{" "}
                  </div>
                </div>
                <div className={styles["frame-484778"]}>
                  <svg
                    className={styles["frame-484779"]}
                    width="115"
                    height="19"
                    viewBox="0 0 115 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_1859_46312)">
                      <path
                        d="M50 11.2308L55.1923 17L65 2"
                        stroke="fillCurrent"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1859_46312"
                        x="48"
                        y="0.5"
                        width="19"
                        height="19"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="0.5" />
                        <feGaussianBlur stdDeviation="0.25" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1859_46312"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1859_46312"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className={styles["frame-484782"]}>
                  <div className={styles["frame-4847710"]}>
                    <svg
                      className={styles["frame-4847711"]}
                      width="115"
                      height="19"
                      viewBox="0 0 115 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_1859_46316)">
                        <path
                          d="M50 11.2308L55.1923 17L65 2"
                          stroke="fillCurrent"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_1859_46316"
                          x="48"
                          y="0.5"
                          width="19"
                          height="19"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="0.5" />
                          <feGaussianBlur stdDeviation="0.25" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1859_46316"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1859_46316"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
                <svg
                  className={styles["frame-48488"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1861_42538)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1861_42538"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1861_42538"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1861_42538"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles["frame-484873"]}>
            <div className={styles["frame-484882"]}>
              <div className={styles["soporte"]}>SOPORTE </div>
            </div>
            <div className={styles["frame-484799"]}>
              <div className={styles["frame-48475"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["soporte-por-email"]}>
                    Soporte por email{" "}
                  </div>
                </div>
                <div className={styles["frame-484775"]}></div>
                <svg
                  className={styles["frame-484788"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46329)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46329"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46329"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46329"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-484789"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1861_42552)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1861_42552"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1861_42552"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1861_42552"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-4847810"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1861_42554)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1861_42554"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1861_42554"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1861_42554"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles["frame-484763"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["soporte-prioritario"]}>
                    Soporte prioritario{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-4847811"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46339)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46339"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46339"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46339"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["frame-4847910"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1861_42550)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1861_42550"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1861_42550"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1861_42550"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["x8"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
              </div>
              <div className={styles["frame-484774"]}>
                <div className={styles["frame-48476"]}>
                  <div className={styles["ayuda-one-to-one"]}>
                    Ayuda one-to-one{" "}
                  </div>
                </div>
                <svg
                  className={styles["frame-4847812"]}
                  width="115"
                  height="19"
                  viewBox="0 0 115 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1859_46351)">
                    <path
                      d="M50 11.2308L55.1923 17L65 2"
                      stroke="fillCurrent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1859_46351"
                      x="48"
                      y="0.5"
                      width="19"
                      height="19"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.5" />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1859_46351"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1859_46351"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <svg
                  className={styles["x9"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
                <svg
                  className={styles["x10"]}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.807 20.947C23.0535 21.1935 23.1921 21.528 23.1921 21.8767C23.1921 22.2254 23.0535 22.5598 22.807 22.8063C22.5604 23.0529 22.226 23.1914 21.8773 23.1914C21.5286 23.1914 21.1942 23.0529 20.9476 22.8063L14.0034 15.8599L7.05696 22.8042C6.8104 23.0507 6.47598 23.1892 6.12728 23.1892C5.77858 23.1892 5.44416 23.0507 5.19759 22.8042C4.95102 22.5576 4.8125 22.2232 4.8125 21.8745C4.8125 21.5258 4.95102 21.1913 5.19759 20.9448L12.144 14.0006L5.19978 7.05415C4.95321 6.80758 4.81469 6.47316 4.81469 6.12446C4.81469 5.77576 4.95321 5.44135 5.19978 5.19478C5.44634 4.94821 5.78076 4.80969 6.12946 4.80969C6.47816 4.80969 6.81258 4.94821 7.05915 5.19478L14.0034 12.1412L20.9498 5.19368C21.1963 4.94711 21.5308 4.80859 21.8795 4.80859C22.2282 4.80859 22.5626 4.94711 22.8092 5.19368C23.0557 5.44025 23.1942 5.77467 23.1942 6.12337C23.1942 6.47207 23.0557 6.80649 22.8092 7.05306L15.8627 14.0006L22.807 20.947Z"
                    fill="#343330"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default pricing;






