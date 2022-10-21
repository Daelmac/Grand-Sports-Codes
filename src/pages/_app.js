import { Fragment } from "react";
import App from "next/app";
import Head from "next/head";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import fetchProducts from "../redux/actions/productActions";
import "../assets/scss/styles.scss";
import Preloader from "../components/Preloader";
import AOS from 'aos';
import 'aos/dist/aos.css';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
    
  }
  componentDidMount() {
    AOS.init();
    AOS.init({
      duration: 1500,
      delay: 100,
      once: true,
      offset: 280
    })
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Fragment>
        <Head>
          <title>Grand_Sprorts| ECommerce site</title>
          <link rel="icon" href={process.env.PUBLIC_URL + "/favicon.ico"} />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          ></link>
          
         {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          /> */}
        </Head>
        <ToastProvider placement="bottom-left">
          <Provider store={reduxStore}>
            <PersistGate loading={<Preloader />} persistor={this.persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ToastProvider>
      </Fragment>
    );
  }
}

export default withReduxStore(MyApp);
