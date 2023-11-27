import React from 'react';
import DefaultLayout from '../layouts/default';
import MenuModal from '../components/menu-modal/menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function MenuPage(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const recommendedMenu = location.state?.recommendedMenu || [];

    const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
    const [favoriteMenuList, setFavoriteMenuList] = useState([]);  //유저가 선호버튼 누른 메뉴의 인덱스 담김.

    


    const handleNextModal = () => {

        console.log(currentMenuIndex);
        //마지막 메뉴에서 이 함수를 호출했을때
        if(currentMenuIndex === recommendedMenu.length-1) {
                       
            //일딘 그룹페이지로 이동하자
            navigate('/group');
            //여기서 서버에 선호메뉴만 넘겨주는것도 해야될듯
            console.log(favoriteMenuList);
        }
        else
          setCurrentMenuIndex((prevIndex) => prevIndex + 1);
    };

    const handleFavoriteButtonClick = () => {
        // 선호 메뉴 리스트에 현재 메뉴의 인덱스를 추가
        setFavoriteMenuList((prevList) => [...prevList, currentMenuIndex]);
        // 다음 모달로 이동
        handleNextModal();
    };

    return (
        <DefaultLayout>
            <MenuModal
                menu={recommendedMenu[currentMenuIndex]}
                onNextModal={handleNextModal}
                onFavoriteButtonClick={handleFavoriteButtonClick}
            />
        </DefaultLayout>
    );
}
