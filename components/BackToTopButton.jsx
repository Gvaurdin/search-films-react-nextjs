import { memo } from 'react';

const BackToTopButton = memo(({ onClick }) => {
    console.log("Render BackToTopButton");
    return (
        <button id="backToTop" onClick={onClick}>
            Вернуться вверх
        </button>
    );
});

export default BackToTopButton;