import React from 'react';
import { useWheel } from '../context/wheel.jsx'
import { WheelComponent } from './wheelComponent';

export const Wheel = () => {
  const {wheelSettings} = useWheel();
  const prizes = wheelSettings?.segments?.map(segment => segment.display);


  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ];

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
