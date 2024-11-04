import { useEffect, useRef } from 'react';

const Observer = ({ onLoadMore }) => {
    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) onLoadMore();
            });
        });

        const currentRef = observerRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [onLoadMore]);

    return <div ref={observerRef} className="observer" />;
};

export default Observer;


