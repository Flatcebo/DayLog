import React, {useEffect, useRef} from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

const LogContext: any = createContext({});

export function LogContextProvider({children}: any) {
  const initialLogsRef: any = useRef(null);
  const [logs, setLogs]: any = useState([]);

  const onCreate = ({title, body, date}: any) => {
    const log: any = {
      id: uuidv4({}),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  const onModify = (modified: any) => {
    const nextLogs: any = logs.map(
      (log: any) => (log.id === modified.id ? modified : log), // 2 번째 id 값이 없음
    );
    setLogs(nextLogs);
  };

  const onRemove = (id: any) => {
    const nextLogs = logs.filter((log: any) => log.id !== id);
    setLogs(nextLogs);
  };

  useEffect(() => {
    // useEffect 내에서 async 함수를 만들고 바로 호출
    // IIFE 패턴
    async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    };
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, []);

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
