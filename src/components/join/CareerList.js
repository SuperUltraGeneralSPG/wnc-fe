const CareerList = ({ careerList, deleteCareer }) => {

    return (
        <div>
            {careerList.map((career, idx) =>
                <div key={idx + 1}>
                    <span>{idx + 1}.</span>
                    <span>{career}</span>
                    <button onClick={() => deleteCareer(idx)}>삭제</button>
                </div>
            )
            }
        </div >
    )
}

export default CareerList;