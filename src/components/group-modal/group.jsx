import React from 'react'
import { useState } from 'react';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import Map from './Map';
import { useNavigate } from 'react-router-dom';
export default function Group() {
    const navigate = useNavigate();


    const WhiteBox2 = ({ children }) =>
        <div class='w-full h-full py-5 px-2.5 bg-white rounded-xl shadow-xl flex flex-col '>
            {children}
        </div>


    const [groupInfo, setGroupInfo] = useState({
        name: '',
        location: [37.86877, 127.73804],
        time: '11월 21일 13:00',
        range: '가깝게',
    });

    const [recommendedMenu, setRecommendedMenu] = useState([
        { name: '제육볶음', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjExMjZfMjgy%2FMDAxNjY5NDUwODU1OTE3.YzDUwXDD1N2Wc1fSeM3Nts6woN5X1YjJLMPLNLPd_Isg.Ntyvi7XW-X7KWGjwkyy7hpIKXVELf7TZSaP2LyNpNVgg.JPEG.love8672312%2F20221125%25A3%25DF123939.jpg&type=sc960_832' },
        { name: '삼겹살', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjhfNTUg%2FMDAxNjk4NDk2MTQ5MjMx.CKGJoA-Uu3m1tMlJtThT07m0DSM-DaJsw6YyCxIVH7Qg.CCENK-VzMOSqmf8bOq9Bmiu1c5cvBo7bwN7rPLoSIz4g.JPEG.grideoox%2F2_2.jpg&type=sc960_832' },
        { name: '오겹살', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjhfNTUg%2FMDAxNjk4NDk2MTQ5MjMx.CKGJoA-Uu3m1tMlJtThT07m0DSM-DaJsw6YyCxIVH7Qg.CCENK-VzMOSqmf8bOq9Bmiu1c5cvBo7bwN7rPLoSIz4g.JPEG.grideoox%2F2_2.jpg&type=sc960_832' },
        { name: '오겹살', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjhfNTUg%2FMDAxNjk4NDk2MTQ5MjMx.CKGJoA-Uu3m1tMlJtThT07m0DSM-DaJsw6YyCxIVH7Qg.CCENK-VzMOSqmf8bOq9Bmiu1c5cvBo7bwN7rPLoSIz4g.JPEG.grideoox%2F2_2.jpg&type=sc960_832' },
        { name: '오겹살', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjhfNTUg%2FMDAxNjk4NDk2MTQ5MjMx.CKGJoA-Uu3m1tMlJtThT07m0DSM-DaJsw6YyCxIVH7Qg.CCENK-VzMOSqmf8bOq9Bmiu1c5cvBo7bwN7rPLoSIz4g.JPEG.grideoox%2F2_2.jpg&type=sc960_832' },
        { name: '오겹살', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjhfNTUg%2FMDAxNjk4NDk2MTQ5MjMx.CKGJoA-Uu3m1tMlJtThT07m0DSM-DaJsw6YyCxIVH7Qg.CCENK-VzMOSqmf8bOq9Bmiu1c5cvBo7bwN7rPLoSIz4g.JPEG.grideoox%2F2_2.jpg&type=sc960_832' },

    ]);


    const menuList = recommendedMenu.map((menu) =>
        <img src={menu.img} style={{ maxWidth:'80px', maxHeight:'80px', width: '15vw', height: '15vw' }} class=" m-1 rounded-xl shadow-xl border-2 border-solid border-black"></img>
    );


    const [recommendedRestaurant, setRecommendedRestaurant] = useState([
        { name: '식당1', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjExMjZfMjgy%2FMDAxNjY5NDUwODU1OTE3.YzDUwXDD1N2Wc1fSeM3Nts6woN5X1YjJLMPLNLPd_Isg.Ntyvi7XW-X7KWGjwkyy7hpIKXVELf7TZSaP2LyNpNVgg.JPEG.love8672312%2F20221125%25A3%25DF123939.jpg&type=sc960_832', location: [37.86877, 127.73804] },
        { name: '식당2', img: 'restaurant2.jpg', location: [37.86877, 127.73804] },
        { name: '식당3', img: 'restaurant3.jpg', location: [37.86877, 127.73804] },

    ]);

    const restaurantList = recommendedRestaurant.map((restaurant) =>
        <div class='mb-5 border border-solid border-black'>
            <WhiteBox2>
                <TextBold><div class='mb-4'>{restaurant.name}</div></TextBold>
                <div class="grid grid-cols-5 gap-4    ">
                    <div class="col-span-2 ...">
                        <img src={restaurant.img}
                         style={{ maxWidth:'120px', maxHeight:'120px', width: '25vw', height: '14vh' }}
                          class=" rounded-xl shadow-xl border-2 border-solid border-gray"></img>
                    </div>
                    <div class="  col-span-3 h-4/5 w-full...">
                        <Map location={restaurant.location} height='14vh'></Map>
                    </div>
                </div>
            </WhiteBox2>
        </div>

    );


  

    return (
        <div class='mt-5 w-4/5 max-w-[400px]  '>
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
                            <div>{groupInfo.time}</div>
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
                    <div class='flex flex-col'>

                        <TextBold>
                            <div class='mb-3'>그룹 추천 메뉴</div>
                        </TextBold>
                        <div class='flex flex-wrap  items-center '>
                            {menuList}
                             <button style={{ maxWidth:'80px', maxHeight:'80px', width: '15vw', height: '15vw' }} 
                            class=" m-1 justify-center items-center rounded-xl shadow-xl border-2 border-solid border-gray" 
                                onClick={()=>{navigate('/menu', { state: { recommendedMenu } });}}><TextBold>+</TextBold></button> 
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
        </div>
  );

    
}


