import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Category from "./admin/category/category";
//import BranchInterface from "./admin/branch/branchinterface";
//import DisplayBranch from "./admin/branch/DisplayBranch";
import BranchLogin from "./admin/branch/BranchLogin";
import BranchDashboard from "./admin/branch/BranchDashboard";
import Branch from "./admin/branch/branch";
import FoodItems from "./admin/fooditem/FoodIems";
import DisplayFoodItem from "./admin/fooditem/DisplayFoodItem";
// import BatchInterface from "./admin/batch/batchInterface";
// import DisplayBatch from "./admin/batch/DisplayBatch";
// import SectionInterface from "./admin/section/SectionInterface";
// import DisplaySection from "./admin/section/DisplaySection";
import StudentInterface from "./admin/students/StudentInterface"
import DisplayStudent from "./admin/students/DisplayStudent";
import EmployeeInterface from "./admin/employee/EmployeeInterface"
import DisplayEmployee from "./admin/employee/DisplayEmployee";
import AdminLogin from "./admin/adminLogin/AdminLogin";
import AdminDashboard from "./admin/adminLogin/AdminDashboard";
import DeliveryBoyInterface from "./admin/deliveryboy/DeliveryBoyInterface";
import DisplayDelivery from "./admin/deliveryboy/DisplayDeliveryboy";
import Batch from "./admin/batch/batch";
import Section from "./admin/section/Section"
function App() {
  return (
    <div style={{ fontFamily: 'Quicksand' }}>
      {/* <CategoryInterface/>    */}
      {/* <BranchInterface/> */}
      <Router>
        <Routes>

          <Route element={<Branch />} path="/branch" />
          <Route element={<BranchLogin />} path="/branchlogin" />
          <Route element={<BranchDashboard />} path="/branchdashboard/*" />
          <Route element={<FoodItems />} path="/fooditem" />
          <Route element={<DisplayFoodItem />} path="/displayfooditem" />
          {/* <Route element={<BatchInterface />} path="/batch" />
          <Route element={<DisplayBatch />} path="/displaybatch" /> */}
          {/* <Route element={<SectionInterface />} path="/section" />
          <Route element={<DisplaySection />} path="/displaysection" /> */}
          <Route element={<StudentInterface />} path="/student" />
          <Route element={<DisplayStudent />} path="/displaystudent" />
          <Route element={<EmployeeInterface />} path="/employee" />
          <Route element={<DisplayEmployee />} path="/displayemployee" />
          <Route element={<AdminDashboard />} path="/admindashboard/*" />
          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<DeliveryBoyInterface />} path="/delivery" />
          <Route element={<DisplayDelivery />} path="/displaydelivery" />
          <Route element={<Batch />} path="/batch" />
          <Route element={<Section />} path="/section" />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
