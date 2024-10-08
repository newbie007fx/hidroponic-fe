import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";
import EventBus from "../../common/EventBus";
import { Navigate } from 'react-router-dom';
import deviceStateService from "../../services/device-state.service";
import useWebSocket from "react-use-websocket";

const Navbar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const dataType = "deviceState";
  const [deviceState, setDeviceState] = useState(0);

  const { lastJsonMessage } = useWebSocket("ws://localhost:8183/ws", {
    queryParams: { type: dataType },
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: (attemptNumber) => {
      return Math.min(Math.pow(2, attemptNumber + 1) * 1000, 60000);
    },
  });

  useEffect(() => {
    deviceStateService.getDeviceState().then(
      (response) => {
        if (response.data.data) {
          setDeviceState(response.data.data.state);
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }, [lastJsonMessage]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a className="nav-item nav-link px-0 me-xl-4" href="#/">
          <i className="bx bx-menu bx-sm"></i>
        </a>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center">
            { (deviceState === 3 || lastJsonMessage?.state === 3 ) && (
              <div className="d-flex automation-status">
                <div className="spinner-border me-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Automation is running</span>
              </div>
            )}
          </div>
        </div>

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="#/"
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-online">
                <img
                  src="../assets/img/avatars/1.png"
                  alt=""
                  className="w-px-40 h-auto rounded-circle"
                ></img>
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#/">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src="../assets/img/avatars/1.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-medium d-block">{currentUser.user.name}</span>
                      <small className="text-muted">{currentUser.user.username}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="/login" onClick={logOut}>
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
