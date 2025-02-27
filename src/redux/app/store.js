import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlices";
import adminReducer from "../features/slices/adminSlice";

import supplierReducer from "../features/slices/supplierSlice";
import supplierCompanyReducer from "../features/slices/supplierCompanySlice";



import dashSidebarReducer from "../features/slices/dashSidebarSlice";

const store = configureStore({
  reducer: {
    dashSidebar: dashSidebarReducer,
    auth: authReducer,
    admin: adminReducer,
    suppliers: supplierReducer,

    supplierCompanies: supplierCompanyReducer,



  },
});

export default store;
