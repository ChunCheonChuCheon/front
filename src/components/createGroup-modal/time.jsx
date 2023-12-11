import React, { useState } from 'react';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import arrowImage1 from '../../assets/icons/arrow-button-black.svg';
import arrowImage2 from '../../assets/icons/arrow-button.svg';

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

  const CustomInput = ({ value, onClick }) => (
    <input
      value={value}
      onClick={onClick}
      readOnly // readOnly 속성 추가
    />
  );
  return (
    <WhiteBox>
      <div class='mb-3 flex justify-between items-center '>
        <div className='flex flex-col items-center '>
          <button  onClick={() => { props.handleStep(-1) }}>
            <img src={arrowImage1} alt='arrow' class='w-6 h-6 ' />
          </button>
        </div>
        <TextBold>
          <div>모임 시간 정하기</div>
        </TextBold>
        <button   onClick={() => { 
          const combinedDateTime = combineDateAndTime(selectedDate, selectedTime);
          props.setValue('date', `${combinedDateTime.getFullYear()}-${(combinedDateTime.getMonth() + 1).toString().padStart(2, '0')}-${combinedDateTime.getDate().toString().padStart(2, '0')} ${combinedDateTime.getHours().toString().padStart(2, '0')}:${combinedDateTime.getMinutes().toString().padStart(2, '0')}:${combinedDateTime.getSeconds().toString().padStart(2, '0')}`);
          console.log("시간: " + combinedDateTime);         
          props.handleStep(1);
        }}>
          <img src={arrowImage2} alt='arrow' class='w-10 h-10' />
        </button>
      </div>
      <TextNormal>모임 시간을 입력해 주세요</TextNormal>



      <label className="border border-solid border-gray-300 p-4 rounded-md my-4">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        dateFormat="yyyy년 MM월 dd일"
        closeOnScroll={true}
        customInput={<CustomInput />}
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
        customInput={<CustomInput />}
      />
      </label>

     
  
    </WhiteBox>
  );
}
