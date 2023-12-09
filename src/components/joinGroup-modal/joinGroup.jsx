import React from 'react';
import { useForm } from 'react-hook-form';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function JoinGroup() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [baseURL] = useState(useSelector((state) => state.baseURL));
    const [token] = useState(useSelector((state) => state.auth));
    

    async function onSubmit(data) {
        try {

            const response = await axios.get(`${baseURL}/group?pin=${data.pinNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const result = response.data;
                
                navigate(`/group/${data.pinNumber}`,{state:result});


            } else {
                
                console.error('API 호출 실패');
            }
        } catch (error) {
            console.error('API 호출 중 오류(joinGroup: Onsubmit):', error);
            alert('핀번호가 존재하지 않습니다.');
        }
    }

 

    const JoinGroupWhiteBox = ({ children }) => {
        return (
            <div class='w-full  h-auto p-5 bg-white rounded-2xl shadow-xl flex flex-col'>
                {children}
            </div>
        );
    };

    return (
        
        <div class='w-4/5 max-w-[400px]'> 
            <JoinGroupWhiteBox>
                <TextBold>
                    <div class='mb-7'>그룹 참가하기</div>
                </TextBold>
                <TextNormal>공유받은 핀 번호를 입력해주세요</TextNormal>

                <form class='flex flex-col mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register('pinNumber', { required: true })}
                        class='border-b-2 border-[#369fff] focus:outline-none focus:border-[#0077e1] p-2'
                        type='text'
                        placeholder='핀 번호'
                    />
                    <button
                        class='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white font-bold'
                        type='submit'
                    >
                        참가하기
                    </button>
                </form>
            </JoinGroupWhiteBox>
            <div class='flex justify-center items-center mt-5'>
                <div class='border-b-2 border-[#000000] w-2/5 mr-2'></div>
                <TextNormal>아니면..</TextNormal>
                < div class='border-b-2 border-[#000000] w-2/5  ml-2'></div>
            </div>
                <div class='flex flex-col mt-5'>
                   
                    <button
                        class='bg-[#369fff] hover:bg-[#0077e1] rounded-lg  p-2 text-white font-bold'
                        onClick={() => { navigate('/new') }}
                    >
                        <TextBold>새로운 그룹 만들기</TextBold>
                    </button>
                </div>
        </div>

    );
}