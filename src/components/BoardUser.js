import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Formik, Field, Form } from "formik";

const BoardUser = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const initialValues = {
    message: "",
  };

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8183/ws', {
    onOpen: () => console.log('opened'),
    shouldReconnect: (closeEvent) => true,
    filter: (message) => {
      return true
    },
  });

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickSendMessage = (formValue) => {
    sendMessage(formValue.message)
    formValue.message = '';
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <Formik onSubmit={handleClickSendMessage} initialValues={initialValues} >
          <Form>
          <div className="form-group">
              <label htmlFor="message">Message</label>
              <Field name="message" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={readyState !== ReadyState.OPEN}>
                <span>Send Message</span>
              </button>
            </div>
          </Form>
        </Formik>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};

export default BoardUser;