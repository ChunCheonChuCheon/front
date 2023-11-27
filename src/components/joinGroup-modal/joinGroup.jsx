import React from 'react';
import { useForm } from 'react-hook-form';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import { useNavigate } from 'react-router-dom';
export default function JoinGroup() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        
    };



    return (
        <div>
            <WhiteBox class='w-full'>
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
            </WhiteBox>
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