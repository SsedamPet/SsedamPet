/** @jsxImportSource @emotion/react */
import { useState } from "react";

import PetInformation from "./pet/PetInformation";
import ProfileInformation from "./profile/ProfileInformation";
import UserInformation from "./user/UserInformation";

const Registry = () => {
    const [step, setStep] = useState(1);
    const [petInfo, setPetInfo] = useState({
        type: "", name: "", img: null, birthDate: "", gender: "male", breed: "", weight: ""
    });

    // 공통 저장 함수
    const updateInfo = (newData) => setPetInfo(prev => ({ ...prev, ...newData }));
    
    const next = () => setStep(prev => prev + 1);
    const prev = () => setStep(prev => prev - 1);

    return (
        <div> 
            {step === 1 && <PetInformation info={petInfo} update={updateInfo} next={next} />}
            {step === 2 && <ProfileInformation info={petInfo} update={updateInfo} next={next} prev={prev} />}
            {step === 3 && <UserInformation info={petInfo} update={updateInfo} prev={prev} />}
        </div>
    );
};

export default Registry;