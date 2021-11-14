import { useState } from "react";
import Button from "../common/Button";

const CareerList = ({ careerList, deleteCareer, modifyCareer }) => {
    return (
        <ol>
            {careerList.map((career, idx) =>
                <CareerItem key={idx} career={career} idx={idx} deleteCareer={deleteCareer} modifyCareer={modifyCareer} />
            )}
        </ol >
    )
}

const CareerItem = ({ career, idx, deleteCareer, modifyCareer }) => {
    const [modify, setModify] = useState(false);
    const [careerText, setCareerText] = useState(career);

    const clickModify = () => {
        setModify(true);
    }

    const cancelModify = () => {
        setModify(false);
    }

    const changeCareerInput = (e) => {
        setCareerText(e.target.value);
    }

    const confirmModify = () => {
        modifyCareer(careerText, idx);
        setModify(false);
    }

    return modify ?
        (<li class="careerItem">
            <input type="text" value={careerText} onChange={changeCareerInput} />
            <Button onClick={confirmModify}>확인</Button>
            <Button onClick={cancelModify}>취소</Button>
        </li>) :
        (<li class="orderList careerItem">
            <span>{career}</span>
            <Button onClick={clickModify}>수정</Button>
            <Button onClick={() => deleteCareer(idx)}>삭제</Button>
        </li>)
}

export default CareerList;