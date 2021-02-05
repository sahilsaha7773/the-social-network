import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './Stories.css';

function Stories({stories}) {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
    })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return (
        <div className="story__menu">
            {isDesktopOrLaptop || isBigScreen &&
            (
                <p>You are a desktop or laptop</p>
            )}
            {isTabletOrMobile && <p>You are sized like a tablet or mobile phone though</p>}
        
            {/* <img className="story__dp" src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-512.png"/>             */}
        </div>
    )
}

export default Stories
