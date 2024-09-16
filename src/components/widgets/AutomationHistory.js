import { useEffect, useState } from "react";
import automationService from "../../services/automation.service";
import moment from "moment";
import useWebSocket from "react-use-websocket";

const AutomationHistory = ({ activePlant }) => {
  const dataType = "automation";
  const [automations, setAutomations] = useState([]);

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
    if (activePlant === null) {
      return;
    }

    let params = {
      limit: 8,
      plant_id: activePlant?.plant_id
    }
    automationService.getAllAutomation(params).then(
      (response) => {
        if (response.data.data) {
          setAutomations(response.data.data);
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }, [activePlant, lastJsonMessage]);

  return (
    <div className="card h-100">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="card-title m-0 me-2">Automation History</h5>
      </div>
      <div className="card-body">
        <ul className="p-0 m-0">
          {automations &&
            automations.map((automation, index) => (
              <li className="d-flex mb-4 pb-1" key={index}>
                <div className="avatar flex-shrink-0 me-3">
                  <a href={"automations/" + automation.id}>
                    <img
                      src="../assets/img/icons/unicons/auto.png"
                      alt="User"
                      className="rounded"
                    />
                  </a>
                </div>
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div className="me-2">
                    <small className="text-muted d-block mb-1">{moment(automation.triggered_at).format("DD-MMMM-YYYY HH:mm:ss")}</small>
                    <h6 className="mb-0">{"Automation running " + automation.duration + " seconds"}</h6>
                  </div>
                  <div className="user-progress d-flex align-items-center gap-1">
                    <h6 className="mb-0">{automation.accuration}</h6>
                    <span className="text-muted">%</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AutomationHistory;
