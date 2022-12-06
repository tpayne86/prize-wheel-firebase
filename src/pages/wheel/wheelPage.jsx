import React from 'react';
import { useWheel } from '../../context/wheel.jsx'
import { WheelComponent } from '../../components/wheelComponent.jsx';

export const Wheel = () => {
  const {wheelSettings} = useWheel();
  const prizes = wheelSettings?.segments?.map(segment => segment.display);

  const segColors = wheelSettings?.segments.map(segment => `#${segment.color}`);

  const onFinished = (winner) => {
    console.log(winner)
  }

  return (
    <div>
      { wheelSettings &&
    <WheelComponent
      segments={prizes}
      segColors={segColors}
      onFinished={(winner) => onFinished(winner)}
      primaryColor='black'
      contrastColor='white'
      buttonText='Spin'
      isOnlyOnce={true}
      upDuration={400}
      downDuration={600}
      size={165}
    /> }
    </div>
  )
}
