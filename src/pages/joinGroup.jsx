import React from 'react';
import  { useState } from 'react';
import DefaultLayout from '../layouts/default';
import JoinGroup from '../components/joinGroup-modal/joinGroup';
import PersonalName from '../components/joinGroup-modal/personalName';

export default function JoinGroupPage() {
    const [isPersonalNameModalOpen, setPersonalNameModalOpen] = useState(true);

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
