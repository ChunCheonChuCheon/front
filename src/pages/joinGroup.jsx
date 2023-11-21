import React from 'react';
import  { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../layouts/default';
import JoinGroup from '../components/joinGroup-modal/joinGroup';
import PersonalName from '../components/joinGroup-modal/personalName';

export default function JoinGroupPage() {
    const location = useLocation();
    const [isPersonalNameModalOpen, setPersonalNameModalOpen] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const isModalOpenParam = searchParams.get('isModalOpen');

        // Check if the query parameter is present and set the state accordingly
        if (isModalOpenParam === 'false') {
            setPersonalNameModalOpen(false);
        }
    }, [location.search]);

    const handleCloseModal = () => {
        console.log('close');
        setPersonalNameModalOpen(false);
    };


    return (
        <DefaultLayout>
            {isPersonalNameModalOpen && <PersonalName onClose={handleCloseModal} />}
            {!isPersonalNameModalOpen && <JoinGroup/>}
        </DefaultLayout>
    );
}
