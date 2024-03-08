import { configureStore} from "@reduxjs/toolkit";
import addAllData from "./reducers/AllDataSlice";

import allComponentsSlice from "./reducers/AllComponentsSlice";

 const myStore=configureStore({
    reducer:{
        allData:addAllData.reducer,
        allComponents:allComponentsSlice.reducer

    }
})

export default myStore