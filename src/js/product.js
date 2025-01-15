import ProductData    from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams }  from "./utils.mjs";

const dataSource = new ProductData("tents");
const product    = new ProductDetails({ productId: getParams("product"), dataSource });

product.init()
