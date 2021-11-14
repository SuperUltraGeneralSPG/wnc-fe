import { useState } from "react"

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
        (<li>
            <input type="text" value={careerText} onChange={changeCareerInput} />
            <button onClick={confirmModify}>확인</button>
            <button onClick={cancelModify}>취소</button>
        </li>) :
        (<li>
            <span>{career}</span>
            <button onClick={clickModify}>수정</button>
            <button onClick={() => deleteCareer(idx)}>삭제</button>
        </li>)
}

export default CareerList;