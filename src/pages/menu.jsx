import React, { useEffect } from 'react';
import DefaultLayout from '../layouts/default';
import MenuModal from '../components/menu-modal/menu';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function MenuPage(props) {

    const [foodCategoryList, setFoodCategoryList] = useState([
        { category: 1, name: '족발/보쌈', img: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDlfMTY2/MDAxNjE1Mjc4ODM1MzE2.gU2G4VuMz1R3l1LeaPLp1FOyv1qaxWajcIDLQk-ssIkg.64DsxNh_iLVPx9Qxu9MmQ8QmAycAiy04usisytJ9gDkg.JPEG.kgir4mucs/1.jpg?type=w800', score: null },
        { category: 2, name: '돈까스', img: 'https://i.namu.wiki/i/NriT1zAMhpoUtH06vL6Hr4wbes3SrIMhg_Nx8Vug-fAmbPi92x_aAwPmcfFJNlbFeRYXkziNQl1bvRXozEXxTdLm_1D_cy9z1mICZwhf8vkPhnGjkoLVNu3YFUNmAd-1v1oWVLVre-y12AvVwEJmeg.webp', score: null },
        { category: 3, name: '회', img: '', score: null },
        { category: 4, name: '일식', img: '', score: null },
        { category: 5, name: '고기/구이', img: '', score: null },
        { category: 6, name: '피자', img: '', score: null },
        { category: 7, name: '찜/탕/찌개', img: '', score: null },
        { category: 8, name: '양식', img: '', score: null },
        { category: 9, name: '중식', img: '', score: null },
        { category: 10, name: '아시안', img: '', score: null },
        { category: 11, name: '치킨', img: '', score: null },
        { category: 12, name: '백반', img: '', score: null },
        { category: 13, name: '죽', img: '', score: null },
        { category: 14, name: '국수', img: '', score: null },
        { category: 15, name: '버거', img: '', score: null },
        { category: 16, name: '분식', img: '', score: null },
        { category: 17, name: '국밥', img: '', score: null }
    ]);


    const navigate = useNavigate();
    const baseURL = useSelector((state) => state.baseURL);
    const token = useSelector((state) => state.auth);



    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    async function submitServey() {
        try {
            console.log('foodCategoryList: ', foodCategoryList);
            const response = await axios.post(`${baseURL}/user/survey`, {
                survey: foodCategoryList.map((item) => ({
                    'category': item.category,
                    'score': item.score,
                })),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                const result = response.data;
                console.log('submitSurvey: ', result);
                navigate(-1);


            } else {
                console.error('API 호출 실패');
            }
        } catch (error) {
            console.error('API 호출 중 오류:', error);
        }
    }
    //다음 모달로 넘어가는 함수
    const handleNextModal = () => {

        //마지막 메뉴에서 이 함수를 호출했을때
        if (currentCategoryIndex === foodCategoryList.length - 1) {

            submitServey();
            //여기서 서버에 선호메뉴만 넘겨주는것도 해야될듯
        }
        else
            setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    };

    //category의 score를 변경하는 함수
    const setCategoryScore = (number) => {
        setFoodCategoryList((prevList) => {
            const newList = [...prevList];
            console.log(newList[currentCategoryIndex]);
            newList[currentCategoryIndex].score = number;
            console.log(newList[currentCategoryIndex]);
            return newList;
        });

    };

    useEffect(() => {
        if (foodCategoryList[currentCategoryIndex].score !== null) {
            console.log('유스이펙트 실행됨');
            handleNextModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foodCategoryList]);

    const handleGoodButtonClick = () => {
        setCategoryScore(1); // 기다립니다.
    };


    const handleNormalButtonClick = () => {
        setCategoryScore(0);
    };

    const handleBadButtonClick = () => {
        setCategoryScore(-1);
    };

    return (
        <DefaultLayout>

            <MenuModal
                category={foodCategoryList[currentCategoryIndex]}
                onGoodButtonClick={handleGoodButtonClick}
                onNormalButtonClick={handleNormalButtonClick}
                onBadButtonClick={handleBadButtonClick}
            />
        </DefaultLayout>
    );
}
