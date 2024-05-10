const PopUpWindow = ({ content, handleClosePopUp }) => {
    return (
        <div className='overlay' onClick={handleClosePopUp}>
            <div className='popUpWindow'>
                <p><button onClick={handleClosePopUp} className='countryDetailBackButton'>&#8592;Back</button></p>
                {content}
            </div>
        </div>
    )
}

export default PopUpWindow