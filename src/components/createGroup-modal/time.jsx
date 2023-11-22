import React, { useState } from 'react';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Time(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const combineDateAndTime = (date, time) => {
    const combinedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );
    return combinedDateTime;
  };
  return (
    <WhiteBox>
      <div className='flex justify-between items-center'>
        <button className='font-bold text-2xl mb-5' onClick={() => { props.handleStep(-1) }}>
          ←
        </button>
        <TextNormal>3/4</TextNormal>
      </div>
      <TextBold>
        <div className='mb-7'>모임 시간 정하기</div>
      </TextBold>
      <TextNormal>모임 시간을 입력해주세요</TextNormal>



      <label className="border border-solid border-gray-300 p-4 rounded-md mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="yyyy년 MM월 dd일"
          closeOnScroll={true}
        />
      </label>

      <label className="border border-solid border-gray-300 p-4 rounded-md mb-4">
        <DatePicker
          selected={selectedTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="시간"
          dateFormat="aa h시 mm분"
          closeOnScroll={true}
        />
      </label>

      {/* 다음 버튼 */}
      <button
        className='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white'
        onClick={() => { 
          const combinedDateTime = combineDateAndTime(selectedDate, selectedTime);
          props.setValue('time', combinedDateTime);
          props.handleStep(1);
        }}
      ><TextNormal>다음</TextNormal>
      </button>
  
    </WhiteBox>
  );
}
