import { useRouter } from "next/router";
import { AdminLayout } from "../../../components/Layout";
const Product = () => {
  const router = useRouter()
  const { id } = router.query    
  return (
    <AdminLayout>
      <h1>{id}</h1>
    </AdminLayout>
  );
};

export default Product;