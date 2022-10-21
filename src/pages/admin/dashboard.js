
import { AdminLayout } from "../../components/Layout";
import { useState, useEffect} from "react";
import {get_dashboard_data} from '../../api/dashboardApi'

const Dashboard = () => {
  const [dashbordData, setDashbordData] = useState([]);

  //get dashbord Data
  useEffect(async () => {
    let dashboard_data = await get_dashboard_data()
    if(dashboard_data) setDashbordData(dashboard_data)
  },[]);
  return (
    <AdminLayout title="Dashboard">
      <div className="container">
       <div className="row">
       <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-blue">{dashbordData.total_orders}</span></h2>
                    <h6 className="text-header">Total orders</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-yellow">{dashbordData.in_progress_orders}</span></h2>
                    <h6 className="text-header">Orders In Progress</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-green">{dashbordData.delivered_orders}</span></h2>
                    <h6 className="text-header">Orders Delivered</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-pink">{dashbordData.total_receipts}</span></h2>
                    <h6 className="text-header">Total Receipts</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-red">{dashbordData.total_products}</span></h2>
                    <h6 className="text-header">Total Products</h6>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-dark-green">{dashbordData.total_customers}</span></h2>
                    <h6 className="text-header">Total Customers</h6>
                </div>
            </div>
        </div>    
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-purple">{dashbordData.total_featured_product}</span></h2>
                    <h6 className="text-header">Total Featured Products</h6>
                </div>
            </div>
        </div> 
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text t-orange">{dashbordData.total_best_selling_product}</span></h2>
                    <h6 className="text-header">Total Best Selling Products</h6>
                </div>
            </div>
        </div>   
        <div className="col-md-4 col-xl-4">
            <div className="card  order-card">
                <div className="card-block">
                    <h2 className="text-center"><span className="number-text">{dashbordData.total_new_product}</span></h2>
                    <h6 className="text-header">Total New Products</h6>
                </div>
            </div>
        </div>  
	</div>
</div>
   </AdminLayout>
  );
};

export default Dashboard; 