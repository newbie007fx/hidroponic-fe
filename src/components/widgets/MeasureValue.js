import useWebSocket, { ReadyState } from 'react-use-websocket';

const MeasureValue = ({dataType, image, alt, label, unit}) => {
  const { lastJsonMessage, readyState } = useWebSocket('ws://localhost:8183/ws', {
    queryParams: {"type": dataType},
    onOpen: () => console.log('opened'),
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: (attemptNumber) => {
      return Math.min(Math.pow(2, attemptNumber+1) * 1000, 60000);
    },
    filter: (message) => {
      const obj = JSON.parse(message.data);

      return obj.data_type === dataType;
    },
  });
  
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Disconnect',
    [ReadyState.CLOSED]: 'Error',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title d-flex align-items-start justify-content-between">
          <div className="avatar flex-shrink-0">
            <img
              src={`../assets/img/icons/unicons/${image}`}
              alt={alt}
              className="rounded"
            />
          </div>
        </div>
        <span className="fw-medium d-block mb-1">{ readyState !== ReadyState.OPEN ? connectionStatus : label}</span>
        <h3 className="card-title mb-2">{ lastJsonMessage?.value ?? 0 } { unit }</h3>
        <small className="text-success fw-medium">
          {/* <i className="bx bx-up-arrow-alt"></i> +28.14% */}
        </small>
      </div>
    </div>
  );
};

export default MeasureValue;
