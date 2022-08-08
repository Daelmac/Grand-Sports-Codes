
import { AdminLayout } from "../../components/Layout";
// import authCheck  from '../../auth'

const Dashboard = ({userDetails}) => {
  // const authenticated = isAdminAuthenticated()
  return (
    <AdminLayout title="Dashboard">
      <div className="container">
       <div className="row">
       <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-blue">99</span></h2>
                    <h6 className="text-header">Total orders</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-yellow">12</span></h2>
                    <h6 className="text-header">Orders Pending</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-green">87</span></h2>
                    <h6 className="text-header">Orders Delivered</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-red">237</span></h2>
                    <h6 className="text-header">Total Products</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-dark-green">766</span></h2>
                    <h6 className="text-header">Total Customers</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-pink">12</span></h2>
                    <h6 className="text-header">Total Categories</h6>
                </div>
            </div>
        </div>    
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-purple">12</span></h2>
                    <h6 className="text-header">Total Featured Products</h6>
                </div>
            </div>
        </div> 
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-orange">15</span></h2>
                    <h6 className="text-header">Total Best Selling Products</h6>
                </div>
            </div>
        </div>   
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text">21</span></h2>
                    <h6 className="text-header">Total New Products</h6>
                </div>
            </div>
        </div>  
	</div>
</div>
   </AdminLayout>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
export default Dashboard; 