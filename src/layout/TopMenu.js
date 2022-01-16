import React, { useLayoutEffect } from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { TopMenuStyle } from './style';

const TopMenu = () => {
  const { path } = useRouteMatch();

  useLayoutEffect(() => {
    const active = document.querySelector('.strikingDash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  const addParentActive = event => {
    document.querySelectorAll('.parent').forEach(element => {
      element.classList.remove('active');
    });

    const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
    const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
    if (!megaMenu) {
      event.currentTarget.closest('ul').previousSibling.classList.add('active');
      if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
    } else {
      event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
    }
  };
  return (
    <TopMenuStyle>
      <div className="strikingDash-top-menu">
        <ul>
          <ul>
            <li>
              <NavLink to={`${path}/social`} onClick={addParentActive}>
                Dashboard
              </NavLink>
            </li>
            <li className="has-subMenu">
              <Link to="#" className="parent">
                Users
              </Link>
              <ul className="subMenu">
                <li>
                  <NavLink to={`${path}/registration`} onClick={addParentActive}>
                    User Registration
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/permission`} onClick={addParentActive}>
                    User Permission
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="has-subMenu">
              <Link to="#" className="parent">
                Masters
              </Link>
              <ul className="subMenu">
                <li>
                  <NavLink to={`${path}/articles`} onClick={addParentActive}>
                    Articles
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/places`} onClick={addParentActive}>
                    Places
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/branches`} onClick={addParentActive}>
                    Branches
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/customers`} onClick={addParentActive}>
                    Customers
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/drivers`} onClick={addParentActive}>
                    Drivers
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/employees`} onClick={addParentActive}>
                    Employees
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/vehicles`} onClick={addParentActive}>
                    Vehicles
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/vehiclesType`} onClick={addParentActive}>
                    Vehicles Type
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/supplier`} onClick={addParentActive}>
                    Supplier
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/bankList`} onClick={addParentActive}>
                    Bank List
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/bankAccountList`} onClick={addParentActive}>
                    Bank Account List
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="has-subMenu">
              <Link to="#" className="parent">
                Transaction
              </Link>

              <ul className="subMenu">
                <li>
                  <NavLink to={`${path}/lorryReceipt`} onClick={addParentActive}>
                    Lorry Receipt
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/loadingShipList`} onClick={addParentActive}>
                    Loading Ship List
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/acknowledgement`} onClick={addParentActive}>
                    Acknowledgement
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/localMemoList`} onClick={addParentActive}>
                    Local Memo List
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/billList`} onClick={addParentActive}>
                    Bill List
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/cashMemoList`} onClick={addParentActive}>
                    Cash Memo List
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/paymentCollection`} onClick={addParentActive}>
                    Payment Collection
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/paymentAdvice`} onClick={addParentActive}>
                    Payment Advice
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/moneyTransfer`} onClick={addParentActive}>
                    Money Transfer
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/pettyCashHistory`} onClick={addParentActive}>
                    Petty Cash History
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="has-subMenu">
              <Link to="#" className="parent">
                Reports
              </Link>

              <ul className="subMenu">
                <li>
                  <NavLink to={`${path}/lorryReceipt`} onClick={addParentActive}>
                    Lorry Receipt Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/loadingShipList`} onClick={addParentActive}>
                    Loading Trip Sheet
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/acknowledgement`} onClick={addParentActive}>
                    Bill Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/localMemoList`} onClick={addParentActive}>
                    Billed LR Status
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/billList`} onClick={addParentActive}>
                    Payment Collection Report
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/cashMemoList`} onClick={addParentActive}>
                    Cash Memo List
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/paymentCollection`} onClick={addParentActive}>
                    Payment Collection
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/paymentAdvice`} onClick={addParentActive}>
                    Payment Advice
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/moneyTransfer`} onClick={addParentActive}>
                    Money Transfer
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${path}/pettyCashHistory`} onClick={addParentActive}>
                    Petty Cash History
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </ul>
      </div>
    </TopMenuStyle>
  );
};

export default TopMenu;
