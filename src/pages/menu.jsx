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
        { category: 2, name: '돈까스', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160602_298%2Fjjun2311_1464835442266VzKe9_JPEG%2FIMG_0900.jpg&type=sc960_832', score: null },
        { category: 3, name: '회', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTdfMjE4%2FMDAxNzAwMTc4OTE3OTgz.7C9A6mfAfLZMp5BTYAtBQfRAS8vPCP-aOgnwemyJWaAg.00diQdOFsEt0Nedf7kHvvF3vIjmyEzmka2o46eratzEg.JPEG.710naju%2F1699963078760.jpg&type=sc960_832', score: null },
        { category: 4, name: '일식', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTNfMTIz%2FMDAxNjk5ODUxMzI2MzE1.50_W5dN-woaTQi_BUzi13oqgy-fs1W4m8EW3h2yB1oUg.tkQkl2O6VfUN1ur6IzV060pcueKWKF_-n8T-JeLfHLEg.JPEG.zoaworns12%2FIMG_4250.jpg&type=sc960_832', score: null },
        { category: 5, name: '고기/구이', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTVfMjk3%2FMDAxNzAwMDM2NTYzMjk5.mUuhjFG9GksnfrgLs0QQWRucvGSRVn9TPDqOHzEV1qsg.aZa6SK153r-cmF3_2g9bxB627BTD2uIxqsgHVNX4Oq8g.JPEG.kittyprety%2F20231113%25A3%25DF200745.jpg&type=sc960_832', score: null },
        { category: 6, name: '피자', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2023_11_07_840%2Fd031c6d5-7d51-11ee-9125-d4f5ef590144_01.jpg&type=sc960_832', score: null },
        { category: 7, name: '찜/탕/찌개', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTZfMTQw%2FMDAxNzAwMTIyNjE3NzE0.xkAaucD8M02O96un3f5qtZGaJIrdY4nlU3n5cx00s6Qg.64j5S3uaOdzOBbzlQgczB6RS30gMXRYF1An21P8iUVQg.JPEG.jeffrey0728%2FIMG_7163.JPG&type=sc960_832', score: null },
        { category: 8, name: '양식', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTZfMTk4%2FMDAxNzAwMTMyMDY0OTI5.kPdLlp-ln2GSG0tBcsX8zXtWSHovT4k-mVGhgDPHVtAg.BoO4v4a55MmEEYny-nLb7Z9Gxi5N2br1HsVcXp2ye2Ig.JPEG.fedayee%2F%25B6%25AF%25C3%25CA%25C5%25A9%25B8%25B2%25C6%25C4%25BD%25BA%25C5%25B8.jpg&type=sc960_832', score: null },
        { category: 9, name: '중식', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjFfNzQg%2FMDAxNjk3ODcwOTc1MTQ1.lSOLDQcyeJrvdYynWvXGzl83-a_wKAjQISRopGFdMXAg.luC30jVa7Tjzsp2fuN1sy-ufroSAypbComAd_DEZOIog.JPEG.skysee8217%2F1697870258549.jpg&type=sc960_832', score: null },
        { category: 10, name: '아시안', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMDlfMTEg%2FMDAxNjk5NTA4OTI2ODQy.CxaAhEyKx5x-Lo5ChIRZxywblSTGdEDpr7HqAqoJBOUg.3nqK3PX8f3E2Uriz1pFWOnFnRxMV1QJ49-7HRDIkjWsg.JPEG.myunsikbum%2F23.jpg&type=sc960_832', score: null },
        { category: 11, name: '치킨', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTdfMTI1%2FMDAxNzAwMjA0Mjc2MjQ1.WVrj0XGtJoCwKjJF6p9PgZbWaiIRWYBQJx_8xJktZLYg.eO4LFvTZxywZLAkYC9yEeuAiXFtrVgzrOYUvA92pnecg.PNG.kki1391%2Fimage.png&type=sc960_832', score: null },
        { category: 12, name: '백반', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMDNfMjcg%2FMDAxNjk4OTk3ODk1Mzcw.LjlG11IatrSxp4CeepAj56soigxx3-mmzKMFgy9NRoUg.2mNCMYEWFSBa2JG7F0JhQkOgs3-Ii6B83IrziXK-sfwg.JPEG.yeondu_111%2FIMG_1250.jpg&type=a340', score: null },
        { category: 13, name: '죽', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20231124_125%2F1700825530484vxlx0_JPEG%2F11719210801368224_604211440.jpg&type=a340', score: null },
        { category: 14, name: '국수', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTFfMjM2%2FMDAxNjk5Njc0MTA3MzU4.j-9CJ_LUgEAHeGAedHtjwhTQUnaHotT1SAUAlMKxi8Qg.vQtfIr3AUut9uUm41MEGV9bOihVNCykqT6U_sBXgMpUg.JPEG.sunhay1004%2F20231111%25A3%25DF120232.jpg&type=sc960_832', score: null },
        { category: 15, name: '버거', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTRfMTc1%2FMDAxNjk5OTM1OTEwNjc0.hfW9p4ygYs0TOCV9jiQ-n0r4lWdRvlWveqpKAgFvbZwg.RNKLNZDnNJFGA5lNruVdS945lwLAhfOzMmUWP2eRa8Yg.PNG.sm821127%2F%25BD%25BA%25C5%25A9%25B8%25B0%25BC%25A6_2023-11-14_132424.png&type=a340', score: null },
        { category: 16, name: '분식', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MTZfNzkg%2FMDAxNjk0ODU4NzcwNDAz.tpa2d5OReV4DlK8EMMHOMq7AzuC3HjKIL57mgPLiY8Mg.UVtcIvLtTjtNOOqT_2VJ26V2w0FZ5sAQksGOwylQfN0g.JPEG.songsoul22%2FIMG_9967.jpg&type=sc960_832', score: null },
        { category: 17, name: '국밥', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTVfMjQy%2FMDAxNzAwMDIxOTAyNzgx.IKNzUAq6NYNvBIbKH_nsHBVb-4ldtifRo6vUUWAKpcUg.3Cot1PFYHmLfppY3QvFbePL_nLVVL__d2MCsBacqsrsg.JPEG.jlfoodltd%2F6.jpg&type=sc960_832', score: null }
    ]);

    const [isLastButtonClick,setIsLastButtonClick] = useState(false);
    const navigate = useNavigate();
    const baseURL = useSelector((state) => state.baseURL);
    const token = localStorage.getItem('token');



    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    async function submitServey() {
        try {
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

        if(!isLastButtonClick)
        {   
        
                //마지막 메뉴에서 이 함수를 호출했을때
            if (currentCategoryIndex === foodCategoryList.length - 1) {
                setIsLastButtonClick(true);
                submitServey();
            }
            else
                setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
        }
        
    };

    //category의 score를 변경하는 함수
    const setCategoryScore = (number) => {
        setFoodCategoryList((prevList) => {
            const newList = [...prevList];
            newList[currentCategoryIndex].score = number;
            return newList;
        });

    };

    useEffect(() => {
        if (foodCategoryList[currentCategoryIndex].score !== null) {
            handleNextModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foodCategoryList]);

    const handleGoodButtonClick = () => {
        setCategoryScore(1);
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
