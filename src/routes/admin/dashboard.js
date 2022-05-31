import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = lazy(() => import('../../container/dashboard'));
const Registration = lazy(() => import('../../container/registration/Registration'));
const Permission = lazy(() => import('../../container/registration/Permission'));
const Articles = lazy(() => import('../../container/masters/articles/Articles'));
const Places = lazy(() => import('../../container/masters/places/Places'));
const Branches = lazy(() => import('../../container/masters/branches/Branches'));
const Customers = lazy(() => import('../../container/masters/customers/Customers'));
const SaveCustomers = lazy(() => import('../../container/masters/customers/SaveCustomers'));
const UpdateCustomers = lazy(() => import('../../container/masters/customers/EditCustomer'));
const Drivers = lazy(() => import('../../container/masters/drivers/Drivers'));
const SaveDrivers = lazy(() => import('../../container/masters/drivers/SaveDrivers'));
const UpdateDrivers = lazy(() => import('../../container/masters/drivers/EditDrivers'));
const Employees = lazy(() => import('../../container/masters/Employee/Employee'));
const SaveEmployees = lazy(() => import('../../container/masters/Employee/SaveEmployee'));
const EditEmployee = lazy(() => import('../../container/masters/Employee/EditEmployee'));

const Vehicles = lazy(() => import('../../container/masters/vehicles/Vehicles'));
const SaveVehicles = lazy(() => import('../../container/masters/vehicles/SaveVehicles'));
const VehiclesType = lazy(() => import('../../container/masters/vehicleType/VehicleType'));
const Supplier = lazy(() => import('../../container/masters/supplier/Supplier'));
const SaveSupplier = lazy(() => import('../../container/masters/supplier/SaveSupplier'));
const Bank = lazy(() => import('../../container/masters/bank/Bank'));
const BankAccount = lazy(() => import('../../container/masters/bankAccount/Accounts'));

const LorryReceipt = lazy(() => import('../../container/transactions/lr/LR'));
const SaveLorry = lazy(() => import('../../container/transactions/lr/SaveLR'));
const LoadingShipList = lazy(() => import('../../container/transactions/slip_list/LSL'));
const SaveShipList = lazy(() => import('../../container/transactions/slip_list/SaveLSL'));
const Acknowledgement = lazy(() => import('../../container/transactions/Acknowledgement/Aknowledge'));
const LocalMemoList = lazy(() => import('../../container/transactions/LM_list/LML'));
const SaveMemoList = lazy(() => import('../../container/transactions/LM_list/SaveLML'));
const BillList = lazy(() => import('../../container/transactions/Bill_list/Bill_list'));
const SaveBill = lazy(() => import('../../container/transactions/Bill_list/SaveBill'));
const CashMemoList = lazy(() => import('../../container/transactions/CM_list/CML'));
const SaveCashMemoList = lazy(() => import('../../container/transactions/CM_list/SaveCML'));
const PaymentCollection = lazy(() => import('../../container/transactions/Payment_Collection/PaymentCollection'));
const PaymentAdvice = lazy(() => import('../../container/transactions/Payment_Advice/PaymentAdvice'));
const MoneyTransfer = lazy(() => import('../../container/transactions/Money_Transfer/MoneyTransfer'));
const SaveMT = lazy(() => import('../../container/transactions/Money_Transfer/SaveMT'));
const PettyCashHistory = lazy(() => import('../../container/transactions/ptHistory/PettyCashHistory'));
const SavePCH = lazy(() => import('../../container/transactions/ptHistory/SavePCH'));

const LorryReceiptRegister = lazy(() => import('../../container/Reports/LR_register/LR_register'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={`${path}/social`} component={Dashboard} />
      <Route path={`${path}/registration`} component={Registration} />
      <Route path={`${path}/permission`} component={Permission} />
      <Route path={`${path}/articles`} component={Articles} />
      <Route path={`${path}/places`} component={Places} />
      <Route path={`${path}/branches`} component={Branches} />
      <Route path={`${path}/customers`} component={Customers} />
      <Route path={`${path}/save-customers`} component={SaveCustomers} />
      <Route path={`${path}/save-customers`} component={SaveCustomers} />
      <Route path={`${path}/update-customers/:id`} component={UpdateCustomers} />
      <Route path={`${path}/drivers`} component={Drivers} />
      <Route path={`${path}/save-drivers`} component={SaveDrivers} />
      <Route path={`${path}/update-driver/:id`} component={UpdateDrivers} />
      <Route path={`${path}/employees`} component={Employees} />
      <Route path={`${path}/save-employees`} component={SaveEmployees} />
      <Route path={`${path}/edit-employee/:id`} component={EditEmployee} />
      <Route path={`${path}/vehicles`} component={Vehicles} />
      <Route path={`${path}/save-vehicle`} component={SaveVehicles} />
      <Route path={`${path}/vehiclesType`} component={VehiclesType} />
      <Route path={`${path}/supplier`} component={Supplier} />
      <Route path={`${path}/save-supplier`} component={SaveSupplier} />
      <Route path={`${path}/bankList`} component={Bank} />
      <Route path={`${path}/bankAccountList`} component={BankAccount} />

      <Route path={`${path}/lorryReceipt`} component={LorryReceipt} />
      <Route path={`${path}/save-lr`} component={SaveLorry} />
      <Route path={`${path}/loadingSlipList`} component={LoadingShipList} />
      <Route path={`${path}/save-lsl`} component={SaveShipList} />
      <Route path={`${path}/acknowledgement`} component={Acknowledgement} />
      <Route path={`${path}/localMemoList`} component={LocalMemoList} />
      <Route path={`${path}/save-lml`} component={SaveMemoList} />
      <Route path={`${path}/billList`} component={BillList} />
      <Route path={`${path}/save-bill`} component={SaveBill} />
      <Route path={`${path}/cashMemoList`} component={CashMemoList} />
      <Route path={`${path}/save-cml`} component={SaveCashMemoList} />
      <Route path={`${path}/paymentCollection`} component={PaymentCollection} />
      <Route path={`${path}/paymentAdvice`} component={PaymentAdvice} />
      <Route path={`${path}/moneyTransfer`} component={MoneyTransfer} />
      <Route path={`${path}/save-mt`} component={SaveMT} />
      <Route path={`${path}/pettyCashHistory`} component={PettyCashHistory} />
      <Route path={`${path}/save-pch`} component={SavePCH} />

      <Route path={`${path}/lorryReceiptRegister`} component={LorryReceiptRegister} />
    </Switch>
  );
};

export default DashboardRoutes;
