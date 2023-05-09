import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head >
        {/* <script src="https://js.instamojo.com/v1/checkout.js" ></script> */}
          {/* <script src="https://checkout.razorpay.com/v1/checkout.js" async></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        
      </Html>
    );
  }
}
