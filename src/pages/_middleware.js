import { connect } from "react-redux";
import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

export default function middleware(req) {
    const url = req.url
    alert("FRef")
    console.log("FEfefwf",adminDetails,url)
    return NextResponse.next()
}
// const mapStateToProps = (state) => {
//     return {
//       adminDetails: state.currentUserData,
//     };
//   };
// export default connect(mapStateToProps,null)(middleware);