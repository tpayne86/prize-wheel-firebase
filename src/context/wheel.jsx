import { createContext, useState, useEffect, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { getWheelSettings } from '../utils/firebase.js';
import { useUser } from './user.jsx'

export const WheelContext = createContext({
  wheelSettings: {}
})

export const WheelProvider = ({children}) => {
  const location = useLocation();
  const { wheelId:id } = useParams();
  const {currentUser} = useUser();
  const [wheelId, setWheelId] = useState("")
  const [wheelSettings, setWheelSettings] = useState(null);
  const [isAbleToSpin, setIsAbleToSpin] = useState(false);
  const [wheelHistory, setWheelHistory] = useState([]);

  useEffect(() => {
    if(location.pathname.includes('spin')) {
      setWheelId(id);
    }
  }, [])

  useEffect(() => {
    if(wheelId) {
      const fetchWheelSettings = async () => {
        const settings = await getWheelSettings(wheelId);
        console.log(settings);
        setWheelSettings(settings);
      }
      fetchWheelSettings()
    }
  }, [wheelId])

  const value = {wheelSettings}
  return (
    <WheelContext.Provider value={value}>
      {children}
    </WheelContext.Provider>
  );
}

export const useWheel = () => useContext(WheelContext);
