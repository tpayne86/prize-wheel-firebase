import React from 'react';
import { WheelComponent } from './wheelComponent';

import { useCustomer } from '../context/customer';

export const Wheel = () => {
  const {formData, setFormData} = useCustomer();

  const prizes = [
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher'
  ];

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
    setFormData({
      ...formData,
      coupon: winner
    })
    console.log(winner)
  }

  return (
    <div>
    {formData.coupon}
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
    />
    </div>
  )
}