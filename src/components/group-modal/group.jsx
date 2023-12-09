import React, { useEffect } from 'react'
import { useState } from 'react';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import Map from './Map';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import BarChart from './graph2';
import { FaRegCopy } from "react-icons/fa";
import PullToRefresh from 'react-simple-pull-to-refresh';

export default function Group() {
    const navigate = useNavigate();
    const location = useLocation();
    const [baseURL] = useState(useSelector((state) => state.baseURL));
    // const [token] = useState(useSelector((state) => state.auth));
    const token = localStorage.getItem('token');
    const { pin } = useParams();

    const WhiteBox2 = ({ children }) =>
        <div class='w-full h-full py-5 px-2.5 bg-white rounded-xl shadow-xl flex flex-col '>
            {children}
        </div>




    const [groupInfo, setGroupInfo] = useState({
        name: '',
        location: [37.86877, 127.73804],
        date: '11월 21일 13:00',
        range: '가깝게',
    });

    const [surveyInfo, setSurveyInfo] = useState({
        "top3Category": [
            {
                "category": "족발/보쌈",
                "score": 0
            },
            {
                "category": "돈까스",
                "score": 0
            },
            {
                "category": "회",
                "score": 0
            }
        ],
        "groupSize": 2,
        "noResponseNumber": 5
    });

    const [recommendedRestaurant, setRecommendedRestaurant] = useState([
        {
            "id": 5,
            "name": "맘스터치 강대효자점",
            "img": "temp",
            "locationX": "37.8729267",
            "locationY": "127.7457318",
            "openTime": "10:00",
            "closeTime": "18:00",
            "address": "강원특별자치도 춘천시 서부대성로 247 2층 (우)24287",
            "category": "버거"
        },
    ]);


    const formatDate = (isoDateTime) => {
        const [datePart, timePart] = isoDateTime.split('T');
        const [, month, day] = datePart.split('-');
        const [hour, minute] = timePart.replace(/\.\d+Z$/, '').split(':');

        return `${month}월 ${day}일 ${hour}:${minute}`;
    };

    function formatRange(value) {
        if (value === 3) {
            return "가깝게";
        } else if (value === 6) {
            return "멀리";
        } else if (value === -1) {
            return "전체";
        } else {
            // 예외 처리: 3, 6, -1 이외의 값이 들어올 경우
            return "알 수 없음";
        }
    }




    async function getSurveyInfo() {
        try {

            const response = await axios.get(`${baseURL}/group/survey?pin=${pin}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {

                const result = response.data;
                setSurveyInfo({
                    "top3Category": result.top3Category,
                    "groupSize": result.groupSize,
                    "noResponseNumber": result.noResponseNumber,
                });

            } else {
                console.error('API 호출 실패');
            }
        } catch (error) {
            console.error('API 호출 중 오류(getSurveyInfo):', error);

        }
    }

    async function getRecommendedRestaurant() {
        try {
            const response = await axios.get(`${baseURL}/group/recommendation?pin=${pin}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const result = response.data;

                const recommendedRestaurantsPromises = result.recommendation.map(async (restaurant) => {
                    try {
                        const response2 = await axios.get(`${baseURL}/restaurant?id=${restaurant.id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        if (response2.status === 200) {
                            const result2 = response2.data;
                            return {
                                id: restaurant.id,
                                distance: restaurant.distance,
                                name: result2.name,
                                img: result2.img,
                                locationX: result2.locationX,
                                locationY: result2.locationY,
                                openTime: result2.openTime,
                                closeTime: result2.closeTime,
                                address: result2.address,
                                category: result2.category,
                            };
                        }
                    } catch (error) {
                        console.error('API 호출 중 오류(getRestaurant 안쪽):', error);
                    }
                });

                const recommendedRestaurants = await Promise.all(recommendedRestaurantsPromises);

                setRecommendedRestaurant(recommendedRestaurants);
            } else {
                console.error('API 호출 실패');
            }
        } catch (error) {
            console.error('API 호출 중 오류(getRestaurant):', error);
        }
    }

    const UpdateInfo = () => {
        console.log("UpdateInfo 실행");
        console.log("baseURL: " + baseURL);
        console.log("Token: " + token);
        console.log("PIN: " + pin);
        getSurveyInfo();
        getRecommendedRestaurant();
    }

    const getGroupInfo = () => {

        const result = { ...location.state };
        console.log('getgroupinfo들어옴 result: ',result)
        //joinGroup을 통해 참여
        if(location.state){ 
            console.log('전 페이지에서 state보낸게 있다고 판정됨')
            setGroupInfo({
                name: result.name,
                location: [result.locationX, result.locationY],
                date: formatDate(result.date),
                range: formatRange(result.range),
            });
    
        }
        else
        {
            async function _getGroupInfo() {
                try {

                    const response = await axios.get(`${baseURL}/group?pin=${pin}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.status === 200) {
                        const result = response.data;
                        setGroupInfo({
                            name: result.name,
                            location: [result.locationX, result.locationY],
                            date: formatDate(result.date),
                            range: formatRange(result.range),
                        });
        
                    } else {
                        console.error('API 호출 실패');
                    }
                } catch (error) {
                    console.error('API 호출 중 오류(getGroupInfo):', error);
                }
                
            }
            _getGroupInfo();

        }
        

    }



    useEffect(() => {
        getGroupInfo();
        UpdateInfo();
        // console.log('token', token);
        // console.log('url', baseURL);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // const menuList = recommendedMenu.map((menu) =>
    //     <img src={menu.img} style={{ maxWidth:'80px', maxHeight:'80px', width: '15vw', height: '15vw' }} class=" m-1 rounded-xl shadow-xl border-2 border-solid border-black"></img>
    // );





    const restaurantList = recommendedRestaurant.map((restaurant) =>
        <div key={restaurant.name} class='mb-5 '>
            <WhiteBox2>
                <TextBold><div class='mb-4'>{restaurant.name}</div></TextBold>
                <div class="grid grid-cols-5 gap-4    ">
                    <div class="col-span-2 ...">
                        <img src={restaurant.img} alt='restuarant'
                            style={{ maxWidth: '140px', maxHeight: '140px', width: '25vw', height: '16vh' }}
                            class=" rounded-xl shadow-xl border-2 border-solid border-gray"></img>
                    </div>
                    <div class="  col-span-3 h-4/5 w-full...">
                        <Map location={[restaurant.locationX, restaurant.locationY]} height='16vh'></Map>
                    </div>
                    <div class="col-span-2 ...">
                        <TextNormal><div class='mb-4 text-center'>#{restaurant.category}</div></TextNormal>
                    </div>
                    <div class="  col-span-3 ...">
                        <TextNormal><div class='mb-4'>{restaurant.address}</div></TextNormal>
                    </div>

                </div>
            </WhiteBox2>
        </div>

    );


    const handleCopyClick = () => {
        const tempInput = document.createElement('input');
        tempInput.value = pin;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('핀 번호가 복사되었습니다.');
    };



    const handleRefresh = async () => {
        UpdateInfo();
    };


    return (

        <div class=' w-4/5 max-w-[400px]  '>
            <PullToRefresh onRefresh={handleRefresh}>


                <div className='w-full h-auto px-2.5 my-4 bg-white rounded-xl shadow-xl flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <TextBold>
                            <div className='my-3 pr-5'>{groupInfo.name}</div>
                        </TextBold>
                        <div className='flex justify-center items-center'>
                            <TextNormal>
                                PIN:
                            </TextNormal>
                            <TextNormal>
                                <u className='cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-300' onClick={handleCopyClick}>{pin}
                                </u>
                            </TextNormal>
                            <FaRegCopy className='text-blue-500 hover:text-blue-700 transition-colors duration-300' />

                            <div className='flex' >
                            </div>
                        </div>
                    </div>
                </div>


                <div class="grid grid-cols-3  gap-4  ">
                    <div class="row-span-2 col-span-2 ... ">
                        <WhiteBox2>
                            <TextBold>
                                <div class='mb-4 '>모임 장소</div>
                            </TextBold>

                            <Map location={groupInfo.location} height='23vh'></Map>
                        </WhiteBox2></div>
                    <div class="row-span-1 col-span-1 ...">
                        <WhiteBox2>
                            <div class='item-center'>
                                <TextBold>
                                    <div class='mb-4 '>모임 일시</div>
                                </TextBold>
                                <TextNormal>
                                    <div>{groupInfo.date}</div>
                                </TextNormal>
                            </div>
                        </WhiteBox2></div>
                    <div class="...">
                        <WhiteBox2>
                            <TextBold>
                                <div class='mb-3'>탐색 범위</div>
                            </TextBold>
                            <TextNormal>
                                <div>{groupInfo.range}</div>
                            </TextNormal>
                        </WhiteBox2></div>
                    {/* <div class="border-2 border-solid border-blue-500 col-span-3  ... "> */}

                    {/* </div> */}
                </div>
                <div class='mt-5'>
                    <WhiteBox2>
                        <div class='flex flex-col justify-between'>

                            <TextBold>
                                <div class='mb-3'>선호 음식 카테고리</div>
                            </TextBold>

                            {/* {menuList} */}
                            {/* <Graph data={surveyInfo}></Graph> */}
                            <BarChart data={surveyInfo}></BarChart>
                            <div class='flex justify-center items-center'>

                                <button style={{ maxWidth: '80px', maxHeight: '80px', width: '15vw', height: '15vw' }}
                                    class=" m-1 justify-center items-center rounded-xl shadow-xl border-2 border-solid border-gray"
                                    onClick={() => { navigate('/menu'); }}
                                ><TextBold>+</TextBold></button>
                            </div>

                        </div>

                    </WhiteBox2>
                </div>




                <div class='flex justify-center items-center my-7'>
                    <div class='border-b-2 border-[#000000] w-1/3 mr-3'></div>
                    <TextBold>추천 식당</TextBold>
                    < div class='border-b-2 border-[#000000] w-1/3  ml-3'></div>
                </div>
                <div class=''>
                    {restaurantList}
                </div>
            </PullToRefresh>

        </div>

    );


}


