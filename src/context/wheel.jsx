import { createContext, useState, useEffect } from 'react';

import { getWheelHistory, getWheelSettings } from '../utils/firebase.js';
import { useUser } from './user.jsx'

export const WheelContext = createContext({
  wheelHistory: [],
  isAbleToSpin: false,
  setCurrentWheel: () => null
})

export const WheelContext = ({children}) => {
  const {currentUser} = useUser();
  const [wheelId, setWheelId] = useState("")
  const [wheelSettings, setWheelSettings] = useState(null);
  const [isAbleToSpin, setIsAbleToSpin] = useState(false);
  const [wheelHistory, setWheelHistory] = useState([]);

  useEffect(() => {
    const fetchHistoryAndSettings = async () => {
      const wheelSettingsResponse = await getWheelSettings(wheelId);
      const wheelHistoryResponse = await getWheelHistory(currentUser, wheelId)
      if(wheelHistoryResponse.length === 0) {
        setIsAbleToSpin(true);
      }
      if(wheelHistoryResponse[0].spinnedAt > )
    }
  }, [wheelId])

  useEffect(() => {
    const fetchWheelSettings = async () => {
      const wheelSettingsResponse = await getWheelParams(wheelId);
    }
  }, [isAbleToSpin])

  const value = {setWheelId, wheelSettings, isAbleToSpin}
  return (
    <WheelContext.Provider value={value}>
      {children}
    </WheelContext.Provider>
  );
}
